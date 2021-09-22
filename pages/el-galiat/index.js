import React from 'react'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import ElgaliatPage from '../../components/el-galiat/ElgaliatPage'
import PageHeader from '../../seo/PageHeader'

export default function Elgaliat() {
    return (
        <>
            <PageHeader index='elgaliat' />
            <div style={{ minminHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <ElgaliatPage />
                </div>
            </div>
        </>
    )
}
