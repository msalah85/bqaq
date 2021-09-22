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
import { Failed, Success } from "../alertPopup/AlertPopup";
import requester from '../../../requester/requester';
import Spinner from '../../../reusable/spinner/Spinner';

export default function Donations() {


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
        requester.get("/projects/donate/get-all-donates")
            .then((response) => {
                setDataStatus(null);
                setRecords(response.data.model);
            }).catch(() => {
                setRecords([]);
                setDataStatus('فشل الاتصال')
            })
    }




    return (
        <div className='whoWeAreBody'>
            <div className='section-title'>التبرعات</div>

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


                    <Column dataField="name" alignment={"center"} caption='الاسم' />

                    <Column dataField="donationName" alignment={"center"} caption='نوع التبرع' />

                    <Column dataField="projectName" alignment={"center"} caption='اسم المشروع' />

                    <Column dataField="donateValue" alignment={"center"} caption='قيمة التبرع' />

                    <Column dataField="mobile" alignment={"center"} caption='رقم الهاتف' />

                    <Column dataField="email" alignment={"center"} caption='البريد الالكتروني' />

                    <Column dataField="isAnonymous" alignment={"center"} caption='فاعل خير' dataType='boolean' />

                </DataGrid>
            </div >

        </div >
    )
}
