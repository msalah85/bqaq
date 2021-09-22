import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import Link from 'next/link'

export default function LessonsDetails(props) {

    console.log(props);
    return (
        <div className='lessonsDetails fade-in'>

            <div className='lessonsDetails__navbar'>
                <div className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: null }) }}>الكل</div>

                {
                    Array.isArray(props?.lessonsData?.containers?.tags) && props?.lessonsData?.containers?.tags.map((tag, index) => {
                        return <div key={index} className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == tag.id && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: tag.id }) }}>{tag.name}</div>
                    })
                }

            </div>

            <DataGrid
                dataSource={props?.lessonsData?.containers?.lessons}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showRowLines={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={false}
                // rowAlternationEnabled={true}
                noDataText={'لا توجد بيانات'}
                rtlEnabled
                columnHidingEnabled={true}
            >

                <Column dataField="title" caption='عنوان الدرس' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/lessons/[id]',
                        query: { id: e.data.id },
                    }}>
                        {e.data.title}
                    </Link>
                }} />

                <Column dataField="name" caption='الشيخ' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/sheikh/[id]',
                        query: { id: e.data.sheikhId },
                    }}>
                        {e.data.sheikhName}
                    </Link>
                }}

                />

                <Column dataField="parts" caption='الأجزاء' alignment='center' />

                <Column caption='قراءة' alignment='center' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/lessons/[id]',
                        query: { id: e.data.id },
                    }}>
                        <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 14.png'} />
                    </Link>
                }} />

                <Column caption='استماع' alignment='center' cellRender={() => {
                    return <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 15.png'} />
                }} />

                <Column caption='تحميل' alignment='center' cellRender={(e) => {
                    return <a href='' >
                        <img style={{ cursor: 'pointer', marginLeft: '1rem' }} src={'/assets/Mask Group 16.png'} />
                    </a>
                }} />

            </DataGrid>

        </div>
    )
}
