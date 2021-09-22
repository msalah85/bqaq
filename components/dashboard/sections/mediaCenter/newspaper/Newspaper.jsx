import React, { useEffect, useState } from 'react'
import DataGrid, {
    Column,
    Editing,
    Pager,
    Paging,
    Grouping,
    GroupPanel,
    SearchPanel,
    HeaderFilter,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Failed, Success } from "../../../alertPopup/AlertPopup";
import requester from '../../../../../requester/requester';
import Spinner from '../../../../../reusable/spinner/Spinner';
import AddPost from '../news/AddPost';
import UpdatePost from '../news/UpdatePost';
import ReactImageFallback from 'react-image-fallback';


export default function NewspaperDashboard() {

    const [records, setRecords] = useState([]);
    const [caseToShow, setCaseToShow] = useState('');
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    const [selectedPost, setSelectedPost] = useState({});

    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);

    useEffect(() => {
        fetchTableData();
    }, []);

    const runLoadPanel = () => {
        setShowLoadPanel(true);
    }

    const fetchTableData = () => {
        runLoadPanel();
        requester.get("/content/pages/media-center", {}).then((response) => {
            setDataStatus(null);
            setRecords(response.data.model?.containers?.reports);
        }).catch(() => {
            setRecords([]);
            setDataStatus('فشل الاتصال');
        })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/projects/delete-project?projectId=${e.data.postId}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData() })
    }

    const onToolbarPreparing = (e) => {
        let toolbarItems = e.toolbarOptions.items;
        // Adds a new item
        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                icon: 'add',
                onClick: function () {
                    setCaseToShow('add')
                }
            },
            location: 'after'
        });
    }

    const ImageView = (rowData) => {
        return <div className={"dashboard-img-cont"}>
            <ReactImageFallback
                src={rowData.data?.coverUrl}
                fallbackImage={'/assets/fallbacks/Admin Avatar.svg'}
                alt={rowData.data?.name}
                className="dashboard-img"
            />
        </div>
    }


    return (
        <div className='ourProjectsBody'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className='section-title'>أقوال الصحف</div>

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

            {
                caseToShow == 'add' ? <AddPost fetchTableData={fetchTableData} setCaseToShow={setCaseToShow} postType={2} />
                    :
                    caseToShow == 'update' ? <UpdatePost fetchTableData={fetchTableData} setCaseToShow={setCaseToShow} selectedPost={selectedPost} postType={2} />
                        :
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
                                onRowRemoved={onRowRemoved}
                                onToolbarPreparing={onToolbarPreparing}
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
                                    allowDeleting={false}
                                    useIcons={true}
                                    texts={{
                                        confirmDeleteMessage: 'هل انت متاكد انك تريد مسح هذا النص؟',
                                        saveRowChanges: "حفظ",
                                        cancelRowChanges: "إلغاء",
                                        deleteRow: "مسح",
                                        editRow: "تعديل",
                                        addRow: 'اضف جديد',
                                    }}
                                />

                                <Column
                                    dataField="coverUrl"
                                    caption='غلاف الخبر'
                                    alignment={"center"}
                                    width={'100'}
                                    allowSorting={false}
                                    cellRender={ImageView}

                                />

                                <Column dataField="title" alignment={"center"} caption='عنوان الموضوع' />

                                <Column type="buttons" width={110}
                                    buttons={[{
                                        hint: 'تعديل',
                                        icon: 'edit',
                                        visible: true,
                                        onClick: (e) => { setCaseToShow('update'); setSelectedPost(e.row.data); console.log(e.row.data); },
                                    }, 'delete']}
                                />
                            </DataGrid>
                        </div >

            }

        </div>
    )
}
