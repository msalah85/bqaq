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
import { Failed, Success } from "../../../alertPopup/AlertPopup";
import requester from '../../../../../requester/requester';
import Spinner from '../../../../../reusable/spinner/Spinner';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';
import ReactPlayer from 'react-player/lazy';

export default function AudiosDashboard() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    var newAudio = null;

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
        requester.get("/terrorism/audio/listing")
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
        let newAudioFormData = new FormData();
        e.data.sheikhName && newAudioFormData.append("SheikhName", e.data.sheikhName);
        e.data.title && newAudioFormData.append("Title", e.data.title);
        e.data.type && newAudioFormData.append("Type", e.data.type);
        e.data.category && newAudioFormData.append("Category", e.data.category);
        e.data.mediaUrl && newAudioFormData.append("MediaUrl", e.data.mediaUrl);
        newAudio && newAudioFormData.append("MediaFile", newAudio, newAudio?.name);

        requester.post('/terrorism/audio/create-new-media-article', newAudioFormData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                newAudio = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newAudio = null;
                Failed();
                fetchTableData();
            })
    }

    const onRowUpdated = (e) => {

        runLoadPanel();
        let newAudioFormData = new FormData();
        newAudioFormData.append("Id", e.data.id);
        e.data.sheikhName && newAudioFormData.append("SheikhName", e.data.sheikhName);
        e.data.title && newAudioFormData.append("Title", e.data.title);
        e.data.type && newAudioFormData.append("Type", e.data.type);
        e.data.category && newAudioFormData.append("Category", e.data.category);
        !newAudio && e.data.mediaUrl && newAudioFormData.append("MediaUrl", e.data.mediaUrl);
        newAudio && newAudioFormData.append("MediaFile", newAudio, newAudio?.name);

        requester.put('/terrorism/audio/update-media-article', newAudioFormData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                newAudio = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newAudio = null;
                Failed();
                fetchTableData();
            })


    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/terrorism/audio/delete-media-article?mediaArticleId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
    }

    const UpdateFile = (e) => {
        console.log('event', e);
        try {
            const [audioSrc, setAudioSrc] = useState(null);

            const onFileChange = (event) => {
                if (event.target.files[0]) {
                    newAudio = event.target.files[0];
                    e.data.setValue(newAudio);
                    setAudioSrc(URL.createObjectURL(event.target.files[0]))
                }
            }

            return <div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <label htmlFor='input-file-upload' className='add-new-file' style={{ marginTop: '3rem' }}>اضافة  ملف الصوتي</label>
                </div>

                <input
                    id={"input-file-upload"}
                    type="file"
                    onChange={(e) => { FileSizeValidator(e, onFileChange) }}
                    hidden
                    accept="audio/*"
                />

                {
                    (audioSrc || e.data?.data?.mediaUrl) && (
                        <ReactPlayer
                            url={audioSrc || e.data?.data?.mediaUrl}
                            controls={true}
                            volume={1}
                            muted={false}
                            width='50rem'
                            height='4rem'
                            style={{ margin: 'auto' }}
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
            <div className='section-title'>الصوتيات</div>

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
                                <RequiredRule message=" نوع الملف مطلوب" />
                            </Item>

                            <Item colSpan={2} dataField="mediaUrl" />

                            <Item colSpan={2} dataField="fileUpload" />

                        </Form>

                    </Editing>


                    <Column dataField="title" alignment="center" caption='عنوان الملف' />

                    <Column dataField="sheikhName" caption='أسم الشيخ' alignment="center" />

                    <Column dataField="category" alignment="center" caption='تصنيف الملف' />

                    <Column dataField="mediaUrl" alignment="center" caption='رابط الملف' visible={false} />

                    <Column dataField="fileUpload" caption='الملف الصوتي' visible={false} editCellComponent={UpdateFile} />

                </DataGrid>
            </div >

        </div >
    )
}