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
import { Failed, Success } from "../../alertPopup/AlertPopup";
import requester from '../../../../requester/requester';
import Spinner from '../../../../reusable/spinner/Spinner';
import AddLesson from './AddLesson';
import UpdateLesson from './UpdateLesson';



export default function Lessons() {

    const [records, setRecords] = useState([]);
    const [caseToShow, setCaseToShow] = useState('');
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState({});

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
        requester.get("/lessons/get").then((response) => {

            setDataStatus(null);
            setRecords(response.data.model?.filter(lesson => !(lesson.galyaName)) || []);
        }).catch(() => {
            setRecords([]);
            setDataStatus('فشل الاتصال')
        })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/lessons/delete?lessonId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
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

    return (
        <div className='ourProjectsBody'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className='section-title'>الدروس</div>

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
                caseToShow == 'add' ? <AddLesson fetchTableData={fetchTableData} setCaseToShow={setCaseToShow} />
                    :
                    caseToShow == 'update' ? <UpdateLesson fetchTableData={fetchTableData} setCaseToShow={setCaseToShow} selectedLesson={selectedLesson} />
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
                                    allowDeleting
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

                                <Column dataField="title" alignment={"center"} caption='عنوان الدرس' />
                                <Column dataField="sheikhName" alignment={"center"} caption='الشيخ' />
                                <Column dataField="parts" alignment={"center"} caption='عدد الأجزاء' />
                                <Column dataField="languageName" alignment={"center"} caption='لغة الدرس' />
                                <Column dataField="tagName" alignment={"center"} caption='تصنيف الدرس' />
                                <Column type="buttons" width={110}
                                    buttons={[{
                                        hint: 'تعديل',
                                        icon: 'edit',
                                        visible: true,
                                        onClick: (e) => { setCaseToShow('update'); setSelectedLesson(e.row.data); },
                                    }, 'delete']}
                                />
                            </DataGrid>
                        </div >

            }

        </div>
    )
}
