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
    EmailRule

} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

import { Item } from 'devextreme-react/form';

import { Failed, Success } from "../../../alertPopup/AlertPopup";
import requester from '../../../../../requester/requester';
import Spinner from '../../../../../reusable/spinner/Spinner';
import ReactImageFallback from 'react-image-fallback';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function ManagementStructureDashBaord() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    var newImage = null;

    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);

    useEffect(() => {
        fetchTableData();
    }, []);

    const runLoadPanel = () => {
        setShowLoadPanel(true)
    }

    const fetchTableData = () => {
        runLoadPanel();
        requester.get("/content/administrative-structure/get-employees")
            .then((response) => {
                setDataStatus(null);
                setRecords(response.data.model?.reverse());
            }).catch(() => {
                setRecords([]);
                setDataStatus('فشل الاتصال')
            })
    }

    const onRowInserted = (e) => {
        console.log('new', e, newImage);
        requester.post('/content/administrative-structure/add-new-employee', { ...e.data })
            .then((res) => {
                if (newImage) {
                    let image = new FormData();
                    image.append("File", newImage, newImage.name);
                    image.append("Id", res.data?.model?.id);
                    requester.patch('/content/administrative-structure/upload-employee-avatar', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                            fetchTableData();
                        })
                } else {
                    newImage = null;
                    Success();
                    fetchTableData();
                }

            }).catch(() => {
                newImage = null
                Failed();
                fetchTableData();
            })

    }

    const onRowUpdated = (e) => {
        runLoadPanel();

        requester.put('/content/administrative-structure/update-employee', { ...e.data })
            .then((res) => {
                if (newImage) {
                    let image = new FormData();
                    image.append("File", newImage, newImage.name);
                    image.append("Id", res.data?.model?.id);
                    requester.patch('/content/administrative-structure/upload-employee-avatar', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                            fetchTableData();
                        })
                } else {
                    Success();
                    fetchTableData();
                }
            }).catch((e) => {
                Failed();
                fetchTableData();
            })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/content/administrative-structure/delete-employee?employeeId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
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
            console.log(e);
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


    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>الهيكل الاداري</div>

            <div className='table-container' style={{ width: '100%', position: 'relative' }}>
                {showLoadPanel && <Spinner />}
                <DataGrid
                    noDataText={dataStatus || 'لا توجد بيانات'}
                    dataSource={records}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    showBorders={true}
                    showRowLines={true}
                    cellHintEnabled={true}
                    wordWrapEnabled={true}
                    rowAlternationEnabled={true}
                    rtlEnabled
                    onRowUpdated={onRowUpdated}
                    onRowInserted={onRowInserted}
                    onRowRemoved={onRowRemoved}
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
                            addRow: 'اضف جديد'
                        }}
                    >
                        <Popup title="اضف قسم جديد" showTitle={true} width={900} height={800} maxHeight={'80%'} rtlEnabled />

                        <Form labelLocation={"top"} >
                            <Item dataField="name">
                                <RequiredRule message="الاسم مطلوب" />
                            </Item>
                            <Item dataField="jobTile">
                                <RequiredRule message="هالوظيفه مطلوب" />
                            </Item>
                            <Item dataField="mobile">
                                <RequiredRule message="الجوال مطلوب" />
                            </Item>
                            <Item dataField="email">
                                <RequiredRule message="البريد الاكتروني مطلوب" />
                                <EmailRule message='هذا البريد غير صالح' />
                            </Item>
                            <Item dataField="avatarUrl" />

                        </Form>

                    </Editing>

                    <Column
                        dataField="avatarUrl"
                        caption='الصوره'
                        alignment={"center"}
                        width={'100'}
                        allowSorting={false}
                        cellRender={ImageView}
                        editCellComponent={UpdateImage}
                    />
                    <Column dataField="name" alignment={"center"} caption='الاسم' />
                    <Column dataField="jobTile" alignment={"center"} caption='الوظيفه' />
                    <Column dataField="mobile" alignment={"center"} caption='رقم الجوال' />
                    <Column dataField="email" alignment={"center"} caption='البريد الالكتروني' />

                </DataGrid>
            </div >

        </div >
    )
}
