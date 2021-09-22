import React from 'react'
import VideosPage from '../../components/videos/VideosPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import PageHeader from '../../seo/PageHeader'

export default function Videos() {
    return (
        <>
            <PageHeader index='videos' />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <VideosPage />
                </div>
            </div>
        </>
    )
}
