import React, { useEffect } from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'
import ActiveLink from '../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../public/assets/Search.svg'

export default function DonnationSidebar(props) {

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>أنواع التبرع</div>

                <ActiveLink activeClassName="activeItem" href='/donnation/7'>
                    <a className='sidebar__contents__item' > نوع التبرع </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/donnation/71'>
                    <a className='sidebar__contents__item' > نوع التبرع </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/donnation/72'>
                    <a className='sidebar__contents__item' > نوع التبرع </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/donnation/73'>
                    <a className='sidebar__contents__item' > نوع التبرع </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/donnation/74'>
                    <a className='sidebar__contents__item' > نوع التبرع </a>
                </ActiveLink>





            </div>


        </div>


    )
}
