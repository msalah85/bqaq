import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import Link from 'next/link'

export default function ElgaliatDetails(props) {

    return (
        <div className='lessonsDetails fade-in'>

            <div className='lessonsDetails__navbar'>
                <div className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: null }) }}>الكل</div>

                {
                    Array.isArray(props?.lessonsData?.tags) && props?.lessonsData?.tags.map((tag, index) => {
                        return <div key={index} className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == tag.id && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: tag.id }) }}>{tag.name}</div>
                    })
                }
            </div>

            <DataGrid
                dataSource={props.lessonsData?.lessons || []}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showRowLines={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={false}
                // rowAlternationEnabled={true}
                rtlEnabled
                columnHidingEnabled={true}
                noDataText={'لا توجد بيانات'}
            >

                <Column dataField="title" caption='عنوان الدرس' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/lessons/[id]',
                        query: { id: e.data.id },
                    }}>
                        {e.data.title}
                    </Link>
                }} />

                <Column dataField="galyaName" caption='الجالية' alignment='right' width='250' />

                {/* <Column dataField="name" caption='الجالية' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/el-galiat/[id]',
                        query: { id: '1' },
                    }}>
                        {e.data.name}
                    </Link>
                }}

                /> */}

                <Column dataField="parts" caption='الأجزاء' alignment='center' />

                {/* <Column caption='قراءة' alignment='center' cellRender={() => {
                    return <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 14.png'} />
                }} /> */}

                <Column caption='استماع' alignment='center' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/lessons/[id]',
                        query: { id: e.data.id },
                    }}>
                        <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 15.png'} />
                    </Link>

                }} />

                <Column caption='تحميل' alignment='center' cellRender={(e) => {
                    return <a href={e.data.documentUrl} target='_blank'>
                        <img style={{ cursor: 'pointer', marginLeft: '1rem' }} src={'/assets/Mask Group 16.png'} />
                        {/* <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 17.png'} /> */}
                    </a>
                }} />


            </DataGrid>

        </div>
    )
}
