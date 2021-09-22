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
import axios from 'axios';
import ReactPlayer from 'react-player/lazy';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';

export default function VideosDashboard() {
    const [records, setRecords] = useState([]);
    const [sheikhs, setSheikhs] = useState([]);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState('loading');
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    var newVideo = null;

    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);

    useEffect(() => {

        setShowLoadPanel(true);
        let requestsArray = [];

        requestsArray.push(
            requester.get('/lessons/languages/get')
        );

        requestsArray.push(
            requester.get('/lessons/tags/get')
        );

        requestsArray.push(
            requester.get('/lessons/sheikh/get')
        );

        requestsArray.push(
            requester.get("/videos/get")
        );

        axios.all([...requestsArray]).then(axios.spread((...responses) => {
            setLanguages(responses[0].data.model);
            setTags(responses[1].data.model);
            setSheikhs(responses[2].data.model);
            setRecords(responses[3].data.model?.filter(video => !(video.showInGaliat)));
        }))

    }, []);

    const runLoadPanel = () => {
        setShowLoadPanel(true)
    }

    const fetchTableData = () => {
        runLoadPanel();
        requester.get("/videos/get")
            .then((response) => {
                setDataStatus(null);
                setRecords(response.data.model?.filter(video => !(video.showInGaliat)));
            }).catch(() => {
                setRecords([]);
                setDataStatus('فشل الاتصال')
            })
    }

    const onRowInserted = (e) => {
        runLoadPanel();
        if (newVideo) {

            let newVideoFormData = new FormData();
            newVideoFormData.append("Source", '3');
            newVideoFormData.append("Type", '2');
            newVideoFormData.append("File", newVideo, newVideo.name);

            requester.patch('/content/albums/upload', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    newVideo = null;
                    requester.post('/videos/create',
                        {
                            ...e.data,
                            languageId: e.data.languageName?.id,
                            sheikhId: e.data.sheikhName?.id,
                            tagId: e.data.tagName?.id,
                            url: response.data?.model?.url,
                            languageName: undefined,
                            sheikhName: undefined,
                            tagName: undefined,
                            showInGaliat: false,

                        }
                    )
                        .then((res) => {
                            Success();
                            fetchTableData();
                        }).catch(() => {

                            Failed();
                            fetchTableData();
                        })
                }).catch(() => {
                    newVideo = null
                    Failed();
                    fetchTableData();
                })

        }
        else {
            requester.post('/videos/create',
                {
                    ...e.data,
                    languageId: e.data.languageName?.id,
                    sheikhId: e.data.sheikhName?.id,
                    tagId: e.data.tagName?.id,
                    languageName: undefined,
                    sheikhName: undefined,
                    tagName: undefined,
                    showInGaliat: false
                }
            )
                .then((res) => {
                    Success();
                    fetchTableData();

                }).catch(() => {
                    Failed();
                    fetchTableData();
                })
        }
    }

    const onRowUpdated = (e) => {

        runLoadPanel();

        if (newVideo) {

            let newVideoFormData = new FormData();
            newVideoFormData.append("Source", '3');
            newVideoFormData.append("Type", '2');
            newVideoFormData.append("File", newVideo, newVideo.name);

            requester.patch('/content/albums/upload', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    newVideo = null;
                    requester.put('/videos/update',
                        {
                            ...e.data,
                            languageId: e.data.languageName?.id || e.data.languageId,
                            sheikhId: e.data.sheikhName?.id || e.data.sheikhId,
                            tagId: e.data.tagName?.id || e.data.tagId,
                            url: response.data?.model?.url,
                            languageName: undefined,
                            sheikhName: undefined,
                            tagName: undefined,
                            fileUpload: undefined,
                            showInGaliat: false
                        }
                    )
                        .then((res) => {
                            Success();
                            fetchTableData();
                        }).catch(() => {

                            Failed();
                            fetchTableData();
                        })
                }).catch(() => {
                    newVideo = null
                    Failed();
                    fetchTableData();
                })

        }
        else {
            requester.put('/videos/update',
                {
                    ...e.data,
                    languageId: e.data.languageName?.id || e.data.languageId,
                    sheikhId: e.data.sheikhName?.id || e.data.sheikhId,
                    tagId: e.data.tagName?.id || e.data.tagId,
                    languageName: undefined,
                    sheikhName: undefined,
                    tagName: undefined,
                    showInGaliat: false
                }
            )
                .then((res) => {
                    Success();
                    fetchTableData();
                }).catch(() => {

                    Failed();
                    fetchTableData();
                })
        }


    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/videos/delete?videoId=${e.data.id}`).then(() => {
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
                    (videoSrc || e.data?.data?.url) && (
                        <ReactPlayer
                            url={videoSrc || e.data?.data?.url}
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

    const onEditorPreparing = (e) => {
        console.log(e);
        if (e.dataField === "languageName" && e.parentType === "dataRow") {
            e.editorOptions.placeholder = "اختر لغة الفيديو";
        } else if (e.dataField === "tagName" && e.parentType === "dataRow") {
            e.editorOptions.placeholder = "اختر تصنيف الفيديو";
        } else if (e.dataField === "sheikhName" && e.parentType === "dataRow") {
            e.editorOptions.placeholder = "اختر أسم الشيخ";
        }
    }

    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>المرئيات</div>

            <div className='table-container' style={{ width: '100%', position: 'relative' }}>
                {(showLoadPanel || languages == 'loading') && <Spinner />}
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
                        <Popup title="اضف قسم جديد" position='center' showTitle={true} width={'90%'} height={'90%'} maxHeight={'90%'} maxWidth={'90%'} rtlEnabled />

                        <Form labelLocation={"top"} >

                            <Item dataField="title">
                                <RequiredRule message="الاسم مطلوب" />
                            </Item>

                            <Item dataField="languageName">
                                <RequiredRule message="اللغه مطلوبه " />
                            </Item>

                            <Item dataField="sheikhName">
                                <RequiredRule message="اسم الشيخ مطلوب" />
                            </Item>

                            <Item dataField="tagName">
                                <RequiredRule message=" تصنيف الفيديو مطلوب" />
                            </Item>

                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="category">
                                    <RequiredRule message=" نوع الفيديو مطلوب" />
                                </Item>
                            </Item>

                            <Item colSpan={2} dataField="url" />

                            <Item colSpan={2} dataField="fileUpload" />

                        </Form>

                    </Editing>


                    <Column dataField="title" alignment={"center"} caption='عنوان الفيديو' />

                    <Column dataField="languageName" caption='لغة الفيديو' alignment="center">
                        <Lookup dataSource={languages} displayExpr="name" />
                    </Column>

                    <Column dataField="sheikhName" caption='أسم الشيخ' alignment="center">
                        <Lookup dataSource={sheikhs} displayExpr="name" />
                    </Column>

                    <Column dataField="tagName" caption='تصنيف الفيديو' alignment="center">
                        <Lookup dataSource={tags} displayExpr="name" />
                    </Column>

                    <Column dataField="category" alignment={"center"} caption='نوع الفيديو' />

                    <Column dataField="url" alignment={"center"} caption='رابط الفيديو' visible={false} />

                    <Column dataField="fileUpload" caption='فيديو' visible={false} editCellComponent={UpdateFile} />

                </DataGrid>
            </div >

        </div >
    )
}
