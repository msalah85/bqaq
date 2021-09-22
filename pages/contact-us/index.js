import React from 'react'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import ContactUsPage from '../../components/contactUs/ContactUsPage'

export default function ContactUs() {
    return (
        <>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <ContactUsPage />
        </>
    )
}
