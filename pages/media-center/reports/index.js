import React from 'react'
import MediaCenterSidebar from '../../../components/mediaCenter/MediaCenterSidebar'
import ReportsPage from '../../../components/mediaCenter/reports/ReportsPage'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'

export default function Reports() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <div className='lessons general-container'>
                    <MediaCenterSidebar showLangs={true} breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }]} />
                    <div className='lessons__body'>
                        <ReportsPage />
                    </div>
                </div>
            </div>
        </div>
    )
}
