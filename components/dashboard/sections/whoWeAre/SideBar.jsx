import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function SideBar() {
    return (
        <div className='sidebarContainer'>

            <div className='sidebarContainer__title'>الفهرس</div>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/who-we-are'>
                <a className='sidebarContainer__item'>من نحن</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/who-we-are/scientist-praise'>
                <a className='sidebarContainer__item'>ثناء العلماء</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/who-we-are/goals'>
                <a className='sidebarContainer__item'>الأهداف العامة</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/who-we-are/management-structure'>
                <a className='sidebarContainer__item'>الهيكل الأداري</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/who-we-are/services'>
                <a className='sidebarContainer__item'>الخدمات التي يقدمها الموقع</a>
            </ActiveLink>




        </div>
    )
}
