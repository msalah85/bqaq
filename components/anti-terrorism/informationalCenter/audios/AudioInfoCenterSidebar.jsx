import React from 'react'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../../reusable/shareWithSection/ShareWithSection'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../../../public/assets/Search.svg'

export default function AudioInfoCenterSidebar(props) {

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            {/* <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div> */}

            <div className='sidebar__switchBtn' style={{ marginTop: '2rem' }}>

                <ActiveLink activeClassName="activeSwitchBtn" href='/anti-terrorism'>
                    <a className='sidebar__switchBtn__btn' style={{ borderRadius: '0 .8rem .8rem 0rem' }}> جهود الجمعية </a>
                </ActiveLink>

                <div className='sidebar__switchBtn__btn activeSwitchBtn' style={{ borderRadius: '.8rem 0 0 .8rem' }}> المركز المعلوماتي </div>

            </div>

        </div>


    )
}
