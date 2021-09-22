import React, { useEffect } from 'react'
import Breadcrumbs from '../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'
import ActiveLink from '../../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../../public/assets/Search.svg'

export default function ElgaliaDetailsSidebar(props) {

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                <ActiveLink href='/el-galiat/1' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الدروس
                    </a>
                </ActiveLink>

                <ActiveLink href='/el-galiat/designs' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        التصاميم الدعوية
                    </a>
                </ActiveLink>

                <ActiveLink href='/el-galiat/videos' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        المرئيات
                    </a>
                </ActiveLink>

            </div>


        </div>


    )
}
