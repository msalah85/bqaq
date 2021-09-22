import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TabsBar() {
    const router = useRouter();
    return (
        <div className='navTabs'>
            <div className="general-container">
                <div className="navTabs__body">
                    <Link href='/who-we-are' ><a className={`navTabs__body__item  ${router.pathname.includes('who-we-are') && 'activeTab'}`}>من نحن</a></Link>
                    <Link href='/our-projects' ><a className={`navTabs__body__item ${router.pathname.includes('our-projects') && 'activeTab'}`}>مشاريع الجمعية</a></Link>
                    <Link href='/lessons' ><a className={`navTabs__body__item ${router.pathname.includes('lessons') && 'activeTab'}`}>الدروس</a></Link>
                    <Link href='/el-galiat' ><a className={`navTabs__body__item ${router.pathname.includes('el-galiat') && 'activeTab'}`}>الجاليات</a></Link>
                    <Link href='/videos' ><a className={`navTabs__body__item ${router.pathname.includes('videos') && (!router.pathname.includes('el-galiat')) && (!router.pathname.includes('anti-terrorism/informational-center')) && 'activeTab'}`}>المرئيات</a></Link>
                    <Link href='/bookstore' ><a className={`navTabs__body__item ${router.pathname.includes('bookstore') && 'activeTab'}`}>المكتبة</a></Link>
                    <Link href='/women-section' ><a className={`navTabs__body__item ${router.pathname.includes('women-section') && 'activeTab'}`}>القسم النسائي</a></Link>
                    <Link href='/media-center' ><a className={`navTabs__body__item ${router.pathname.includes('media-center') && 'activeTab'}`}>المركز الاعلامي</a></Link>
                    <Link href='/anti-terrorism' ><a className={`navTabs__body__item ${router.pathname.includes('anti-terrorism') && 'activeTab'}`}>مركز مكافحة الإرهاب</a></Link>
                    <Link href='/contact-us' ><a className={`navTabs__body__item ${router.pathname.includes('contact-us') && 'activeTab'}`}>تواصل معانا</a></Link>
                </div>
            </div>
        </div>


    )
}
