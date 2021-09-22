import React from 'react'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'
import WhoWeAreSidebar from '../whoWeAreSidebar/WhoWeAreSidebar'
import ManagementStructureDetails from './ManagementStructureDetails'

export default function ManagementStructure() {
    return (
        <div className='whoWeAre general-container'>
            <div >
                <WhoWeAreSidebar breadcrumbs={[{ name: 'الهيكل الأداري', url: '/management-structure' }]} />
            </div>

            <div className='whoWeAre__body'>
                <ManagementStructureDetails />
            </div>
        </div>
    )
}
