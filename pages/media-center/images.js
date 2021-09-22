import React from 'react'
import ImagesPage from '../../components/mediaCenter/images/ImagesPage'
import MediaCenterSidebar from '../../components/mediaCenter/MediaCenterSidebar'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'

export default function Images() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <div className='lessons general-container'>
                    <MediaCenterSidebar showLangs={true} breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }]} />
                    <div className='lessons__body'>
                        <ImagesPage />
                    </div>
                </div>
            </div>
        </div>
    )
}
