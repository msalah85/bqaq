import React, { useEffect } from 'react'
import ActiveLink from '../../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../../reusable/breadcrumbs/Breadcrumbs'
import { useRouter } from 'next/router'
import { GET_WHO_WE_ARE } from '../../../redux/actions/who-we-are/index'
import { connect } from 'react-redux';

function WhoWeAreSidebar(props) {
    const router = useRouter();
    useEffect(() => {
        props.GET_WHO_WE_ARE()

    }, [])
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            {(router.pathname == '/who-we-are/scientist-praise' || router.pathname == '/who-we-are') && <div className='sidebar__switchBtn'>

                <ActiveLink activeClassName="activeSwitchBtn" href='/who-we-are'>
                    <a className='sidebar__switchBtn__btn' style={{ borderRadius: '0 .8rem .8rem 0rem' }}> من نحن </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeSwitchBtn' href='/who-we-are/scientist-praise'>
                    <a className='sidebar__switchBtn__btn ' style={{ borderRadius: '.8rem 0 0 .8rem' }}> ثناء العلماء و الدعاة </a>
                </ActiveLink>

            </div>}
            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                {/* <div className={`sidebar__contents__item  ${router.pathname.includes('who-we-are') && 'activeItem'}`}>من نحن</div> */}

                <ActiveLink href='/who-we-are' activeClassName='activeItem'>
                    <a className={`sidebar__contents__item  ${router.pathname == '/who-we-are/scientist-praise' && 'activeItem'}`}>
                        من نحن
                    </a>
                </ActiveLink>

                <ActiveLink href='/who-we-are/general-goals' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الأهداف العامة
                    </a>
                </ActiveLink>

                <ActiveLink href='/who-we-are/management-structure' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الهيكل الأداري
                    </a>
                </ActiveLink>

                <ActiveLink href='/who-we-are/provided-services' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الخدمات التي يقدمها الموقع
                    </a>
                </ActiveLink>



            </div>

            {/* <div style={{ marginTop: 'auto' }}> */}

            {/* </div> */}
        </div>

    )
}
const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { GET_WHO_WE_ARE })(WhoWeAreSidebar);