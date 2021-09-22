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
import { Failed, Success } from "../../../alertPopup/AlertPopup";
import requester from '../../../../../requester/requester';
import Spinner from '../../../../../reusable/spinner/Spinner';
import ReactPlayer from 'react-player/lazy';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function VideosDashboard() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    var newVideo = null;

    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);

    useEffect(() => {

        setShowLoadPanel(true);
        fetchTableData();

    }, []);

    const runLoadPanel = () => {
        setShowLoadPanel(true)
    }

    const fetchTableData = () => {
        runLoadPanel();
        requester.get("/terrorism/videos/listing")
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
        let newVideoFormData = new FormData();
        e.data.sheikhName && newVideoFormData.append("SheikhName", e.data.sheikhName);
        e.data.title && newVideoFormData.append("Title", e.data.title);
        e.data.type && newVideoFormData.append("Type", e.data.type);
        e.data.category && newVideoFormData.append("Category", e.data.category);
        e.data.mediaUrl && newVideoFormData.append("MediaUrl", e.data.mediaUrl);
        newVideo && newVideoFormData.append("MediaFile", newVideo, newVideo?.name);

        requester.post('/terrorism/videos/create-new-media-article', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                newVideo = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newVideo = null;
                Failed();
                fetchTableData();
            })
    }

    const onRowUpdated = (e) => {

        runLoadPanel();
        let newVideoFormData = new FormData();
        newVideoFormData.append("Id", e.data.id);
        e.data.sheikhName && newVideoFormData.append("SheikhName", e.data.sheikhName);
        e.data.title && newVideoFormData.append("Title", e.data.title);
        e.data.type && newVideoFormData.append("Type", e.data.type);
        e.data.category && newVideoFormData.append("Category", e.data.category);
        !newVideo && e.data.mediaUrl && newVideoFormData.append("MediaUrl", e.data.mediaUrl);
        newVideo && newVideoFormData.append("MediaFile", newVideo, newVideo?.name);

        requester.put('/terrorism/videos/update-media-article', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                newVideo = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newVideo = null;
                Failed();
                fetchTableData();
            })


    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/terrorism/videos/delete-media-article?mediaArticleId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
    }

    const UpdateFile = (e) => {
        console.log('event', e);
        try {
            const [videoSrc, setVideoSrc] = useState(null);

            const onFileChange = (event) => {
                if (event.target.files[0]) {
                    newVideo = event.target.files[0];
                    e.data.setValue(newVideo);
                    setVideoSrc(URL.createObjectURL(event.target.files[0]))
                }
            }

            return <div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <label htmlFor='input-file-upload' className='add-new-file' style={{ marginTop: '3rem' }}>اضافة  فيديو</label>
                </div>

                <input
                    id={"input-file-upload"}
                    type="file"
                    onChange={(e) => { FileSizeValidator(e, onFileChange) }}
                    hidden
                    accept="video/*"
                />

                {
                    (videoSrc || e.data?.data?.mediaUrl) && (
                        <ReactPlayer
                            url={videoSrc || e.data?.data?.mediaUrl}
                            controls={true}
                            volume={1}
                            muted={false}
                            width='500px'
                            height='400px'
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        />
                    )
                }

            </div>
        }
        catch {
            console.log('error');
        }
    }

    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>المرئيات</div>

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
                            addRow: 'اضف جديد',

                        }}
                    >
                        <Popup title="اضف قسم جديد" position='center' showTitle={true} width={'90%'} height={'90%'} maxHeight={'90%'} maxWidth={'90%'} rtlEnabled />

                        <Form labelLocation={"top"} >

                            <Item dataField="title">
                                <RequiredRule message="الاسم مطلوب" />
                            </Item>

                            <Item dataField="sheikhName">
                                <RequiredRule message="اسم الشيخ مطلوب" />
                            </Item>


                            <Item dataField="category">
                                <RequiredRule message=" نوع الفيديو مطلوب" />
                            </Item>

                            <Item colSpan={2} dataField="mediaUrl" />

                            <Item colSpan={2} dataField="fileUpload" />

                        </Form>

                    </Editing>


                    <Column dataField="title" alignment="center" caption='عنوان الفيديو' />

                    <Column dataField="sheikhName" caption='أسم الشيخ' alignment="center" />

                    <Column dataField="category" alignment="center" caption='تصنيف الفيديو' />

                    <Column dataField="mediaUrl" alignment="center" caption='رابط الفيديو' visible={false} />

                    <Column dataField="fileUpload" caption='فيديو' visible={false} editCellComponent={UpdateFile} />

                </DataGrid>
            </div >

        </div >
    )
}