import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import Link from 'next/link'

export default function SheikhTutorialsDetails() {
    let data = [
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },
        {
            title: 'لوريم ايبسوم دولار سيت أميت',
            name: 'أسم الشيخ او العالم او الداعية',
            parts: '(01)'
        },

    ]
    return (
        <div className='lessonsDetails fade-in'>

            <div className='lessonsDetails__navbar'>
                <div className='lessonsDetails__navbar__item activeItem'>الدروس</div>
                <div className='lessonsDetails__navbar__item'>المتون</div>
                <div className='lessonsDetails__navbar__item'>المحاضرات</div>
                <div className='lessonsDetails__navbar__item'>الخطب</div>
                <div className='lessonsDetails__navbar__item'>الرسائل</div>
                <div className='lessonsDetails__navbar__item'>المرئيات</div>
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
                }}
                />

                <Column dataField="name" caption='الشيخ' alignment='right' width='250' cellRender={(e) => {
                    return <Link href={{
                        pathname: '/sheikh/[id]',
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
                    return <div >
                        <img style={{ cursor: 'pointer', marginLeft: '1rem' }} src={'/assets/Mask Group 16.png'} />
                        <img style={{ cursor: 'pointer' }} src={'/assets/Mask Group 17.png'} />
                    </div>
                }} />


            </DataGrid>

        </div>
    )
}
