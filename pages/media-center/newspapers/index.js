import React from 'react'
import MediaCenterSidebar from '../../../components/mediaCenter/MediaCenterSidebar'
import NewspapersPage from '../../../components/mediaCenter/newspapers/NewspapersPage'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'

export default function Newspapers() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <div className='lessons general-container'>
                    <MediaCenterSidebar showLangs={true} breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }]} />
                    <div className='lessons__body'>
                        <NewspapersPage />
                    </div>
                </div>
            </div>
        </div>

    )
}
