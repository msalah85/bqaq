import React from 'react'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'
import DonnationDetails from '.Details'
import DonnationSidebar from './DonnationSidebar'

export default function DonnationPage(props) {
    return (
        <div className='lessons general-container'>
            <DonnationSidebar breadcrumbs={[{ name: 'التبرع', url: '/donnation' }]} />
            <div className='lessons__body'>
                <DonnationDetails />
            </div>
        </div>
    )
}
