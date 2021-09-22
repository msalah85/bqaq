import React from 'react'
import LessonDetailsPage from '../../components/lessonDetails/LessonDetailsPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'

export default function LessonDetails() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <LessonDetailsPage />
            </div>
        </div>
    )
}
