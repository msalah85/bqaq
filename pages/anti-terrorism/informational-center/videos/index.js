import React from 'react'
import VideoInfoCenterPage from '../../../../components/anti-terrorism/informationalCenter/videos/VideoInfoCenterPage'
import LogoBar from '../../../../reusable/navbars/LogoBar'
import NavBar from '../../../../reusable/navbars/NavBar'
import TabsBar from '../../../../reusable/navbars/TabsBar'

export default function Index() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <VideoInfoCenterPage />
            </div>
        </div>
    )
}
