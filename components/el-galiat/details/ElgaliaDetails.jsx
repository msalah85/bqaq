import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import Link from 'next/link'

export default function ElgaliatDetails() {
    let data = [
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الجالية',
            parts: '(01)'
        },


    ]
    return (
        <div className='lessonsDetails fade-in'>
            <div className='title-bg-green' style={{ marginBottom: '3rem' }}>أسم الجالية</div>
            <div className='lessonsDetails__navbar'>
                <div className='lessonsDetails__navbar__item activeItem'>الكل</div>
                <div className='lessonsDetails__navbar__item'>تفسير</div>
                <div className='lessonsDetails__navbar__item'>عقيدة</div>
                <div className='lessonsDetails__navbar__item'>حديث</div>
                <div className='lessonsDetails__navbar__item'>فقه</div>
                <div className='lessonsDetails__navbar__item'>تاريخ و سير</div>
                <div className='lessonsDetails__navbar__item'>لغة</div>
            </div>

            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showRowLines={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={false}
                // rowAlternationEnabled={true}
                rtlEnabled
                columnHidingEnabled={true}

            >

                <Column dataField="title" caption='عنوان الدرس' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/lessons/[id]',
                        query: { id: '1' },
                    }}>
                        {e.data.title}
                    </Link>
                }} />

                <Column dataField="name" caption='الجالية' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/el-galiat/[id]',
                        query: { id: '1' },
                    }}>
                        {e.data.name}
                    </Link>
                }}

                />

                <Column dataField="parts" caption='الأجزاء' alignment='center' />

                <Column caption='قراءة' alignment='center' cellRender={() => {
                    return <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 14.png'} />
                }} />

                <Column caption='استماع' alignment='center' cellRender={() => {
                    return <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 15.png'} />
                }} />

                <Column caption='تحميل' alignment='center' cellRender={() => {
                    return <div>
                        <img style={{ cursor: 'pointer', marginLeft: '1rem' }} src={'/assets/Mask Group 16.png'} />
                        <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 17.png'} />
                    </div>
                }} />


            </DataGrid>

        </div>
    )
}
