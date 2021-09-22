import React from 'react'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'
import ElgaliaDetails from './ElgaliaDetails'
import ElgaliaDetailsSidebar from './ElgaliaDetailsSidebar'


export default function ElgaliaDetailsPage() {
    return (
        <div className='lessons general-container'>
            <ElgaliaDetailsSidebar breadcrumbs={[{ name: 'الجاليات', url: '/el-galiat' }, { name: 'أسم الجاليه', url: '/el-galiat/1' }]} />
            <div className='lessons__body'>
                <ElgaliaDetails />
            </div>
        </div>
    )
}
