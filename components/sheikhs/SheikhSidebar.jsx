import React from 'react'
import ActiveLink from '../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'
import { useRouter } from 'next/router'
import SearchSVG from '../../public/assets/Search.svg'

export default function SheikhSidebar(props) {
    const router = useRouter();

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>المشايخ</div>
                {
                    Array.isArray(props.allSheikhs) && props.allSheikhs.map((sheikh, index) => {
                        return <ActiveLink href={`/sheikh/${sheikh.id}`} activeClassName='activeItem' key={index}>
                            <a className='sidebar__contents__item'>
                                {sheikh.name}
                            </a>
                        </ActiveLink>
                    })
                }


            </div>

        </div>


    )
}
