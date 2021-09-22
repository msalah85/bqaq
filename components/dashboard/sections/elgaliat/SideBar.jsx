import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function SideBar() {
    return (
        <div className='sidebarContainer'>

            <div className='sidebarContainer__title'>الفهرس</div>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/el-galiat'>
                <a className='sidebarContainer__item'>الدروس</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/el-galiat/designs'>
                <a className='sidebarContainer__item'>التصاميم الدعوية</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/el-galiat/videos'>
                <a className='sidebarContainer__item'>المرئيات</a>
            </ActiveLink>

        </div>
    )
}
