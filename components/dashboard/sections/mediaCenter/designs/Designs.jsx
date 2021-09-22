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
import ReactImageFallback from 'react-image-fallback';
import moment from 'moment';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function DesignsDashboard() {

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
        requester.get("media-center/images/get")
            .then((response) => {
                setDataStatus(null);
                setRecords(response.data.model?.filter(design => ((design.imageTarget == "MediaCenter") && (design.imageType == "Normal"))));
            }).catch(() => {
                setRecords([]);
                setDataStatus('فشل الاتصال')
            })
    }

    const onRowInserted = (e) => {
        runLoadPanel();
        let image = new FormData();
        image.append("Image", newImage, newImage.name);
        image.append("Title", e.data.title);
        image.append("ImageType", 1);
        image.append("Target", 2);

        requester.patch('/media-center/images/create', image)
            .then((res) => {
                newImage = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newImage = null;
                Failed();
                fetchTableData();
            })

    }

    const onRowUpdated = (e) => {
        runLoadPanel();
        let image = new FormData();
        newImage && image.append("Image", newImage, newImage.name);
        image.append("Title", e.data.title);
        image.append("Id", e.data.imageId);
        image.append("ImageType", 1);
        image.append("Target", 2);

        requester.patch('/media-center/images/update', image)
            .then((res) => {
                newImage = null;
                Success();
                fetchTableData();
            }).catch(() => {
                newImage = null;
                Failed();
                fetchTableData();
            })
    }

    const onRowRemoved = (e) => {
        runLoadPanel();
        requester.delete(`/media-center/images/delete?imageId=${e.data.imageId}`).then(() => {
            Success();
            fetchTableData();
        }).catch(() => { Failed(); fetchTableData(); })
    }

    const ImageView = (rowData) => {
        return <div className={"dashboard-img-cont"}>
            <ReactImageFallback
                src={rowData.data?.imageUrl}
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

            <div className='section-title'>التصاميم الدعوية</div>

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
                        <Popup title="اضف قسم جديد" showTitle={true} width={900} height={800} maxHeight={'80%'} rtlEnabled />

                        <Form labelLocation={"top"} >

                            <Item itemType="group" colCount={2} colSpan={2}  >

                                <Item dataField="title">
                                    <RequiredRule message="الاسم مطلوب" />
                                </Item>

                            </Item>

                            <Item dataField="imageUrl" />

                        </Form>

                    </Editing>

                    <Column
                        dataField="imageUrl"
                        caption='صورة التصميم'
                        alignment={"center"}
                        width={'100'}
                        allowSorting={false}
                        cellRender={ImageView}
                        editCellComponent={UpdateImage}
                    />

                    <Column dataField="title" alignment={"center"} caption='عنوان التصميم' />

                    <Column dataField="date" alignment={"center"} caption='التاريخ' cellRender={(e) => <div>{moment(e.data?.date).format('YYYY / MM / DD')}</div>} />

                    <Column dataField="dateInHijri" alignment={"center"} caption='التاريخ الهجري' cellRender={(e) => <div>{moment(e.data?.dateInHijri).format('YYYY / MM / DD')}</div>} />

                </DataGrid>

            </div >

        </div >
    )
}
