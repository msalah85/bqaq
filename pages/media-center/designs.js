import React from 'react'
import DesignsPage from '../../components/mediaCenter/designs/DesignsPage'
import MediaCenterSidebar from '../../components/mediaCenter/MediaCenterSidebar'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'

export default function Designs() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <div className='lessons general-container'>
                    <MediaCenterSidebar showLangs={true} breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }]} />
                    <div className='lessons__body'>
                        <DesignsPage />
                    </div>
                </div>
            </div>
        </div>
    )
}

