import React, { useEffect, useState } from 'react'
import DataGrid, {
    Column,
    Editing,
    Popup,
    Form,
    Pager,
    Paging,
    Grouping,
    GroupPanel,
    SearchPanel,
    HeaderFilter,
    RequiredRule,

} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

import { Item } from 'devextreme-react/form';

import { Failed, Success } from "../../alertPopup/AlertPopup";
import requester from '../../../../requester/requester';
import Spinner from '../../../../reusable/spinner/Spinner';
import ReactImageFallback from 'react-image-fallback';
import CustomStore from 'devextreme/data/custom_store';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';
import UpdateShiekhs from './UpdateShiekhs'

export default function ShiekhsDashboard() {

    const [caseToShow, setCaseToShow] = useState('');
    const [selectedShiekh, setSelectedShiekh] = useState({});
    const [dataStatus, setDataStatus] = useState(null);
    var newImage = null;

    const dataSource = new CustomStore({
        key: 'id',
        load: (loadOptions) => {
            console.log(fetchTableData());
            return fetchTableData();
        },
        insert: async (values) => {
            console.log(values);
            await onRowInserted(values);
        },
        update: async (key, values) => {
            console.log(key, values);
            await onRowUpdated(key, values)
        },
        remove: async (key) => {
            await onRowRemoved(key);
        },
        byKey: (key) => {
            console.log('byKey', key);
            return fetchSheikhDetails(key);
        }
    });


    async function fetchTableData() {
        return await requester.get("/lessons/sheikh/get")
            .then((response) => {
                setDataStatus(null);
                return response.data.model;
            }).catch(() => {
                setDataStatus('فشل الاتصال')
            })
    }

    const onRowInserted = async (values) => {
        await requester.post('/lessons/sheikh/create', { ...values, avatarUrl: undefined })
            .then(async (res) => {
                if (newImage) {

                    let image = new FormData();
                    image.append("Image", newImage, newImage.name);
                    image.append("Id", res.data?.model?.id);

                    await requester.patch('/lessons/sheikh/upload-avatar', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                        }).catch(() => {
                            newImage = null;
                            Failed();
                        })

                } else {
                    Success();
                }

            }).catch(() => {
                Failed();
            })

    }

    const onRowUpdated = async (key, values) => {

        await requester.put('/lessons/sheikh/update', { ...values, id: key })
            .then(async (res) => {
                if (newImage) {

                    let image = new FormData();
                    image.append("Image", newImage, newImage.name);
                    image.append("Id", key);

                    await requester.patch('/lessons/sheikh/upload-avatar', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                            // fetchTableData();
                        }).catch(() => {
                            newImage = null;
                            Failed();
                            // fetchTableData();
                        })

                } else {
                    Success();
                    // fetchTableData();
                }
            }).catch(() => {

                Failed();
                // fetchTableData();
            })
    }

    const onRowRemoved = async (key) => {
        await requester.delete(`/lessons/sheikh/delete?sheikhId=${key}`).then(() => {
            Success();
        }).catch(() => { Failed(); })
    }

    const ImageView = (rowData) => {
        return <div className={"dashboard-img-cont"}>
            <ReactImageFallback
                src={rowData.data?.avatarUrl}
                fallbackImage={'/assets/fallbacks/Admin Avatar.svg'}
                alt={rowData.data?.name}
                className="dashboard-img"
            />
        </div>
    }

    const UpdateImage = (e) => {
        try {
            const onImageChange = (event) => {
                console.log('event', event);
                if (event.target.files[0]) {
                    let imgSrc = URL.createObjectURL(event.target.files[0]);
                    document.getElementById("dashboard-img-update") && (document.getElementById("dashboard-img-update").src = imgSrc)
                    newImage = event.target.files[0];
                    e.data.setValue(imgSrc)
                }
            }
            return <>
                <label htmlFor='dashboard-img-upload' className={"dashboard-edit-img-cont"}>
                    <div className={"dashboard-img-cont-overlay"} >اضف</div>
                    <ReactImageFallback
                        src={e.data?.value}
                        fallbackImage={'/assets/fallbacks/Admin Avatar.svg'}
                        className="dashboard-img"
                        id={"dashboard-img-update"}
                    />
                </label>
                <form hidden>
                    <input id={"dashboard-img-upload"} type="file" accept="image/*"
                        onChange={(e) => { FileSizeValidator(e, onImageChange) }} />
                </form></>
        }
        catch {
            console.log('error');
        }
    }

    async function fetchSheikhDetails(key) {
        return await requester.get("/lessons/sheikh/get-single?sheikhId=" + key)
            .then((response) => {
                return response.data.model;
            })
    }


    return (

        <div className='whoWeAreBody'>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div className='section-title'>المشايخ و العلماء</div>

                {
                    caseToShow != '' && <div
                        className='add-new-file'
                        style={{ marginTop: '0', padding: '1rem' }}
                        onClick={() => { setCaseToShow('') }}
                    >
                        الغاء
                    </div>
                }

            </div>

            <div className='table-container' style={{ width: '100%', position: 'relative' }}>
                {
                    caseToShow == 'update' ? <UpdateShiekhs setCaseToShow={setCaseToShow} selectedShiekh={selectedShiekh} />
                        :
                        <DataGrid
                            noDataText={dataStatus || 'لا توجد بيانات'}
                            dataSource={dataSource}
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            showBorders={true}
                            showRowLines={true}
                            cellHintEnabled={true}
                            wordWrapEnabled={true}
                            rowAlternationEnabled={true}
                            rtlEnabled
                            // onRowUpdated={onRowUpdated}
                            // onRowInserted={onRowInserted}
                            // onRowRemoved={onRowRemoved}

                            // onEditingStart={async (e) => {
                            //     console.log('onEditingStart', e);

                            //     await dataSource.byKey(e.data.id).then(
                            //         (dataItem) => { console.log(dataItem); e.data = dataItem; sheikhDetails = dataItem },
                            //         (error) => { /* Handle the "error" here */ }
                            //     );

                            // }}

                            // onEditorPreparing={async (e) => {
                            //     console.log('onEditorPreparing', e);
                            //     e.dataField && e.setValue(e.dataField, sheikhDetails.[e.dataField])
                            //     // await dataSource.byKey(e.data.id).then(
                            //     //     (dataItem) => { console.log(dataItem); e.data = dataItem; editingRowIndex = e.component.getRowIndexByKey(e.data.id); },
                            //     //     (error) => { /* Handle the "error" here */ }
                            //     // );

                            // }}

                            width='100%'
                        >

                            <HeaderFilter visible={true} />
                            <GroupPanel visible={true} emptyPanelText='اسحب عنوان لهنا' />
                            <SearchPanel visible={true} all placeholder='بحث...' />
                            <Grouping autoExpandAll={true} />
                            <Paging defaultPageSize={10} />
                            <Pager
                                showPageSizeSelector={true}
                                allowedPageSizes={[5, 10, 20]}
                                showInfo={true}
                                showNavigationButtons={true}
                            />

                            <Editing
                                mode="popup"
                                allowUpdating
                                allowDeleting
                                allowAdding
                                useIcons={true}
                                texts={{
                                    confirmDeleteMessage: 'هل انت متاكد انك تريد مسح هذا النص؟',
                                    saveRowChanges: "حفظ",
                                    cancelRowChanges: "إلغاء",
                                    deleteRow: "مسح",
                                    editRow: "تعديل",
                                    addRow: 'اضف جديد',

                                }}
                            >
                                <Popup onShown={(e) => {
                                    console.log(e);
                                }} title="اضف قسم جديد" showTitle={true} width={900} height={800} maxHeight={'80%'} rtlEnabled />

                                <Form labelLocation={"top"} >

                                    <Item dataField="name">
                                        <RequiredRule message="الاسم مطلوب" />
                                    </Item>

                                    <Item dataField="avatarUrl" />

                                    <Item dataField="working" caption='اعماله' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                    <Item dataField="about" caption='ملامح من صفاته' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                    <Item dataField="teachers" caption='شيوخه' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                    <Item dataField="students" caption='طلابه' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                    <Item dataField="history" caption='اعماله و نشاطه العلمي' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                    <Item dataField="bio" caption='أسمه و مولده' editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                        <RequiredRule message=" مطلوب" />
                                    </Item>

                                </Form>

                            </Editing>

                            <Column
                                dataField="avatarUrl"
                                caption='صورة الشيخ'
                                alignment={"center"}
                                width={'120'}
                                allowSorting={false}
                                cellRender={ImageView}
                                editCellComponent={UpdateImage}
                            />

                            <Column dataField="name" alignment={"center"} caption='اسم الشيخ' />

                            <Column dataField="working" caption='اعماله' visible={false} />
                            <Column dataField="about" caption='ملامح من صفاته' visible={false} />
                            <Column dataField="teachers" caption='شيوخه' visible={false} />
                            <Column dataField="students" caption='طلابه' visible={false} />
                            <Column dataField="history" caption='اعماله و نشاطه العلمي' visible={false} />
                            <Column dataField="bio" caption='أسمه و مولده' visible={false} />

                            <Column type="buttons" width={110}
                                buttons={[{
                                    hint: 'تعديل',
                                    icon: 'edit',
                                    visible: true,
                                    onClick: (e) => { setCaseToShow('update'); setSelectedShiekh(e.row.data); },
                                }, 'delete']}
                            />
                        </DataGrid>
                }
            </div >

        </div >
    )
}
