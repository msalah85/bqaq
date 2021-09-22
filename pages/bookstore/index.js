import React from 'react'
import BookstorePage from '../../components/bookstore/BookstorePage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import PageHeader from '../../seo/PageHeader'

export default function Bookstore() {
    return (
        <>
            <PageHeader index='bookstore' />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <BookstorePage />
                </div>
            </div>
        </>
    )
}
