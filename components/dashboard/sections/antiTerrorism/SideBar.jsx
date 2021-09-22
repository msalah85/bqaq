import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function SideBar() {
    return (
        <div className='sidebarContainer'>

            <div className='sidebarContainer__title'>الفهرس</div>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/anti-terrorism'>
                <a className='sidebarContainer__item'>جهود الجمعية</a>
            </ActiveLink>


            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/anti-terrorism/videos'>
                <a className='sidebarContainer__item'>المرئيات</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/anti-terrorism/audios'>
                <a className='sidebarContainer__item'>الصوتيات</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/anti-terrorism/suspicions-responses'>
                <a className='sidebarContainer__item'>شبهات و ردود</a>
            </ActiveLink>

            <ActiveLink activeClassName='activeSideBarItem' href='/dashboard/sections/anti-terrorism/researches'>
                <a className='sidebarContainer__item'>بحوث تأصيلية</a>
            </ActiveLink>


        </div>
    )
}
