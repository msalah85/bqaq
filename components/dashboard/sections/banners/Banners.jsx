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
    Lookup,

} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';

import { Item } from 'devextreme-react/form';

import { Failed, Success } from "../../alertPopup/AlertPopup";
import requester from '../../../../requester/requester';
import Spinner from '../../../../reusable/spinner/Spinner';
import ReactImageFallback from 'react-image-fallback';
import axios from 'axios';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';

export default function BannersDashboard() {

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
        requester.get("/content/banners/get-banners")
            .then((response) => {
                setDataStatus(null);
                setRecords(response.data.model);
            }).catch(() => {
                setRecords([]);
                setDataStatus('فشل الاتصال')
            })
    }

    const onRowInserted = (e) => {
        runLoadPanel();

        if (newImage) {
            let fileType = newImage.type || '';
            let image = new FormData();
            if (fileType.includes('image')) {
                image.append("MediaType", 1);
            } else if (fileType.includes('video')) {
                image.append("MediaType", 2);

            }
            image.append("Image", newImage, newImage.name);
            image.append("TargetUrl", 'N/A');
            image.append("BannerDescription", e.data?.bannerDescription);
            image.append("BannerName", e.data?.bannerName);

            requester.post('/content/banners/create-new-banner', image, { headers: { "Content-Type": "multipart/form-data" } })
                .then(() => {
                    newImage = null;
                    Success();
                    fetchTableData();

                }).catch(() => {
                    newImage = null;
                    Failed();
                    fetchTableData();

                })
        }
    }

    const onRowUpdated = (e) => {
        runLoadPanel();

        requester.put('/content/banners/update-banner',
            {
                bannerId: e.data.id,
                bannerName: e.data.bannerName,
                bannerDescription: e.data.bannerDescription,
                targetUrl: e.data.targetUrl
            })
            .then((res) => {
                if (newImage) {

                    let image = new FormData();
                    image.append("Cover", newImage, newImage.name);
                    image.append("Id", res.data?.model?.id);
                    requester.patch('/content/banners/change-banner', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                            fetchTableData();
                        }).catch(() => {
                            newImage = null;
                            Failed();
                            fetchTableData();
                        })

                } else {
                    Success();
                    fetchTableData();
                }
            }).catch(() => {

                Failed();
                fetchTableData();
            })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/content/banners/delete-banner?bannerId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
    }

    const ImageView = (rowData) => {
        return <div className={"dashboard-img-cont"}>
            <ReactImageFallback
                src={rowData.data?.bannerUrl}
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
                <label htmlFor='dashboard-img-upload' className={"dashboard-edit-img-cont"} style={{ width: '80rem', height: '40rem' }}>
                    <div className={"dashboard-img-cont-overlay"} >اضف</div>
                    <ReactImageFallback
                        src={e.data?.value}
                        fallbackImage={'/assets/fallbacks/Admin Avatar.svg'}
                        className="dashboard-img"
                        id={"dashboard-img-update"}
                    />
                </label>
                <form hidden>
                    <input id={"dashboard-img-upload"}
                        type="file"
                        accept="image/*"
                        onChange={(e) => { FileSizeValidator(e, onImageChange) }}
                    />
                </form></>
        }
        catch {
            console.log('error');
        }
    }

    const UpdateFile = (e) => {
        try {

            const onFileChange = (event) => {
                if (event.target.files[0]) {
                    bookFile = event.target.files[0];
                    e.data.setValue(bookFile);
                }
            }

            return <div>
                <label htmlFor='input-file-upload' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='add-new-file' style={{ marginTop: '3rem' }}>اضافة ملف للكتاب</div>
                </label>
                <input
                    id={"input-file-upload"}
                    type="file"
                    onChange={(e) => { FileSizeValidator(e, onFileChange) }}
                    hidden
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf"
                />
            </div>
        }
        catch {
            console.log('error');
        }
    }

    const onEditorPreparing = (e) => {
        console.log(e);
        if (e.dataField === "languageName" && e.parentType === "dataRow") {
            e.editorOptions.placeholder = "اختر لغة الكتاب";
        }
    }

    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>الصفحة الرئيسية</div>

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
                    onEditorPreparing={onEditorPreparing}
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
                        <Popup title="اضف قسم جديد" showTitle={true} width={1100} height={1000} maxHeight={'95%'} rtlEnabled />

                        <Form labelLocation={"top"} >

                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="bannerName">
                                    <RequiredRule message="الاسم مطلوب" />
                                </Item>
                            </Item>

                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="bannerDescription" editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                    <RequiredRule message="الوصف مطلوب" />
                                </Item>
                            </Item>

                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="bannerUrl" />
                            </Item>

                        </Form>

                    </Editing>

                    <Column
                        dataField="bannerUrl"
                        caption='الصوره'
                        alignment={"center"}
                        width={'100'}
                        allowSorting={false}
                        cellRender={ImageView}
                        editCellComponent={UpdateImage}
                    />

                    <Column dataField="bannerDescription" alignment={"center"} caption='الوصف' />

                    <Column dataField="bannerName" alignment={"center"} caption='العنوان' />

                </DataGrid>
            </div >

        </div >
    )
}
