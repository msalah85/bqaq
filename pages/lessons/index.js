import React from 'react'
import LessonsPage from '../../components/lessons/LessonsPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import PageHeader from '../../seo/PageHeader'

export default function Lessons() {
    return (
        <>
            <PageHeader index='lessons' />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <LessonsPage />
                </div>
            </div>
        </>

    )
}
