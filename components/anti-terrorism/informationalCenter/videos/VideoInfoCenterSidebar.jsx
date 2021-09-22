import React from 'react'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../../reusable/shareWithSection/ShareWithSection'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../../../public/assets/Search.svg'

export default function VideoInfoCenterSidebar(props) {

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            {/* <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div> */}

            <div className='sidebar__switchBtn' style={{ marginTop: '2rem' }}>

                <ActiveLink activeClassName="activeSwitchBtn" href='/anti-terrorism'>
                    <a className='sidebar__switchBtn__btn' style={{ borderRadius: '0 .8rem .8rem 0rem' }}> جهود الجمعية </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeSwitchBtn' href='/anti-terrorism/informational-center/videos'>
                    <a className='sidebar__switchBtn__btn ' style={{ borderRadius: '.8rem 0 0 .8rem' }}> المركز المعلوماتي </a>
                </ActiveLink>

            </div>

            {/* <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>أسماء البرامج</div>

                <ActiveLink activeClassName="activeItem" href='/anti-terrorism/informational-center/videos/7'>
                    <a className='sidebar__contents__item' > أسم البرنامج </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/anti-terrorism/informational-center/videos/1'>
                    <a className='sidebar__contents__item' > أسم البرنامج </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/anti-terrorism/informational-center/videos/2'>
                    <a className='sidebar__contents__item' > أسم البرنامج </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/anti-terrorism/informational-center/videos/3'>
                    <a className='sidebar__contents__item' > أسم البرنامج </a>
                </ActiveLink>

                <ActiveLink activeClassName="activeItem" href='/anti-terrorism/informational-center/videos/4'>
                    <a className='sidebar__contents__item' > أسم البرنامج </a>
                </ActiveLink>

            </div> */}

        </div>


    )
}
