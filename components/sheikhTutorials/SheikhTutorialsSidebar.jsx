import React from 'react'
import ActiveLink from '../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'
import { useRouter } from 'next/router'
import SearchSVG from '../../public/assets/Search.svg'

export default function SheikhTutorialsSidebar(props) {
    const router = useRouter();

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>اللغات</div>

                <ActiveLink href={`/sheikh-tutorials/${props.id}/all-tutorials`} activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الكل
                    </a>
                </ActiveLink>

                <ActiveLink href={`/sheikh-tutorials/${props.id}/1`} activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        اللغة العربية
                    </a>
                </ActiveLink>

                <ActiveLink href={`/sheikh-tutorials/${props.id}/2`} activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        اللغة البنغالية
                    </a>
                </ActiveLink>

                <ActiveLink href={`/sheikh-tutorials/${props.id}/3`} activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        اللغة الأوردو
                    </a>
                </ActiveLink>

                <ActiveLink href={`/sheikh-tutorials/${props.id}/4`} activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        اللغة الهندية
                    </a>
                </ActiveLink>

            </div>

        </div>


    )
}
