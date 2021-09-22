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

export default function SuspicionsDashboard() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);

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
        requester.get("/terrorism/suspicion/listing").then((response) => {
            setDataStatus(null);
            setRecords(response.data.model);
        }).catch(() => {
            setRecords([]);
            setDataStatus('فشل الاتصال');
        })
    }

    const onRowInserted = (e) => {

        requester.post('/terrorism/suspicion/create-new-article', { ...e.data }).then((res) => {
            Success();
            fetchTableData();
        }).catch(() => {
            Failed();
            fetchTableData();
        })

    }

    const onRowUpdated = (e) => {
        runLoadPanel();
        requester.put('/terrorism/suspicion/update-article', { ...e.data }).then(() => {
            Success();
            fetchTableData();
        }).catch(() => {
            Failed();
            fetchTableData();
        })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/terrorism/suspicion/delete-article?articleId=${e.data.id}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
    }

    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>شبهات و ردود</div>

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

                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="title">
                                    <RequiredRule message="العنوان مطلوب" />
                                </Item>
                            </Item>

                            <Item dataField="description" editorType="dxTextArea" colSpan={2} editorOptions={{ height: 200 }} >
                                <RequiredRule message="الوصف مطلوب" />
                            </Item>

                        </Form>

                    </Editing>

                    <Column dataField="title" alignment={"center"} width={'139'} caption='العنوان' />
                    <Column dataField="description" alignment={"center"} caption='الوصف' />

                </DataGrid>
            </div >

        </div >
    )
}
