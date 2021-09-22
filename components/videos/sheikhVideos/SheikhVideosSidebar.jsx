import React from 'react'
import Breadcrumbs from '../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'
import SearchSVG from '../../../public/assets/Search.svg'

export default function SheikhVideosSidebar(props) {

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                <div className='sidebar__contents__item activeItem'>
                    لوريم ايبسوم
                </div>

                <div className='sidebar__contents__item '>
                    لوريم ايبسوم
                </div>

                <div className='sidebar__contents__item '>
                    لوريم ايبسوم
                </div>

                <div className='sidebar__contents__item '>
                    لوريم ايبسوم
                </div>

                <div className='sidebar__contents__item '>
                    لوريم ايبسوم
                </div>

            </div>

        </div>


    )
}
