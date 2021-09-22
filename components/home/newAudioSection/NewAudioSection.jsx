import React from 'react'
import DataGrid, { Column, GroupPanel, Pager, Paging, SearchPanel, } from 'devextreme-react/data-grid';
import Link from 'next/link';
export default function newAudioSection() {
    let data = [

        {
            title: 'السيرة النبوية دروس وعبر المجلس الثالث',
            name: 'الشيخ عزيز بن فرحان العنزي',
            parts: '(01)',
            shId: '928898ff-68aa-4793-9a55-6c7d7ff724ef',
            id: '1935c89d-163a-4f68-9b15-90ad6960f129'
        },
        {
            title: 'أركان الدعوة الى الله',
            name: 'الشيخ عزيز بن فرحان العنزي',
            parts: '(01)',
            shId: '928898ff-68aa-4793-9a55-6c7d7ff724ef',
            id: '876c85f2-c07c-4a22-821c-b11ead285675'
        },

    ]
    return (
        <div className='general-container newAudioSection'>
            <div className='newAudioSection__title'>
                <div>جديد الصوتيات</div>
                <Link href='/lessons'>
                    <a className='newAudioSection__title__moreBtn'>
                        المزيد
                    </a>
                </Link>
            </div>
            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showRowLines={true}
                wordWrapEnabled={true}
                showBorders={true}
                showColumnLines={false}
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
                        query: { id: e.data.shId },
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
