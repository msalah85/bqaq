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

export default function CategoriesDashboard() {


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
        requester.get("/media-center/categories/get")
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

        requester.post('/media-center/categories/create', { ...e.data, isDeleted: undefined })
            .then((res) => {

                Success();
                fetchTableData();


            }).catch(() => {
                Failed();
                fetchTableData();
            })

    }


    const onRowUpdated = (e) => {
        runLoadPanel();
        requester.put('/media-center/categories/update', { ...e.data, isDeleted: undefined })
            .then((res) => {
                requester.put('/media-center/categories/delete-or-restore', { categoryId: e.data.id }).then(() => {
                    Success();
                    fetchTableData();
                }).catch(() => {
                    Failed();
                    fetchTableData();
                })
            }).catch(() => {
                Failed();
                fetchTableData();
            })

    }

    const toggleActivation = (id) => {
        runLoadPanel();
        requester.delete('/media-center/categories/delete-or-restore?categoryId=' + id).then(() => {
            Success();
            fetchTableData();
        }).catch(() => {
            Failed();
            fetchTableData();
        })
    }

    const isDeleted = (e) => {
        return e.row.data?.isDeleted
    }



    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>انواع المواضيع</div>

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
                    onRowRemoved={(e) => toggleActivation(e.data?.id)}
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
                        allowAdding
                        allowDeleting={(e) => (!isDeleted(e))}
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
                        <Popup title="اضف قسم جديد" showTitle={true} width={900} height={800} maxHeight={'80%'} rtlEnabled />

                        <Form labelLocation={"top"} >

                            <Item dataField="categoryName">
                                <RequiredRule message="الاسم مطلوب" />
                            </Item>

                            <Item dataField="isDeleted" />

                        </Form>

                    </Editing>

                    <Column dataField="categoryName" alignment={"center"} caption='الاسم' />

                    <Column dataField="isDeleted" alignment={"center"} caption='معطل' dataType='boolean' />

                    <Column type="buttons" width={110}
                        buttons={['edit', 'delete', {
                            hint: 'تفعيل',
                            icon: 'repeat',
                            visible: isDeleted,
                            onClick: (e) => { toggleActivation(e.row.data?.id) },
                        }]}
                    />
                </DataGrid>
            </div >

        </div >
    )
}
