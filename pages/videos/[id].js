import React from 'react';
import SheikhVideosPage from '../../components/videos/sheikhVideos/SheikhVideosPage';
import LogoBar from '../../reusable/navbars/LogoBar';
import NavBar from '../../reusable/navbars/NavBar';
import TabsBar from '../../reusable/navbars/TabsBar';

export default function SheikhVideos() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <SheikhVideosPage />
            </div>
        </div>
    )
}
