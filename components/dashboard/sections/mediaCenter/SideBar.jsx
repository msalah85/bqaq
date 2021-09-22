import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function SideBar() {
    return (
        <div className='sidebarContainer'>

            <div className='sidebarContainer__title'>الفهرس</div>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/media-center'>
                <a className='sidebarContainer__item'>الأخبار</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/media-center/images'>
                <a className='sidebarContainer__item'>الصور</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/media-center/designs'>
                <a className='sidebarContainer__item'>التصاميم الدعوية</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/media-center/reports'>
                <a className='sidebarContainer__item'>تقارير و انجازات</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/media-center/newspaper'>
                <a className='sidebarContainer__item'>أقوال الصحف</a>
            </ActiveLink>




        </div>
    )
}
