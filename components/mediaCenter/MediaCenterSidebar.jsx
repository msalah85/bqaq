import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import ActiveLink from '../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../public/assets/Search.svg'
import { GET_MEDIA_CENTER_SECTION } from '../../redux/actions/mediaCenter/index'
import { connect } from 'react-redux';

function MediaCenterSidebar(props) {
    const [pageFilters, setPageFilters] = useState({
        year: null,
        usePaging: false,
        pageSize: 0,
        pageNumber: 0,
    });

    useEffect(() => {
        console.log(props.mediaCenterData);
        props.GET_MEDIA_CENTER_SECTION(pageFilters)
    }, [pageFilters]);

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            {/* <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div> */}

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>


                <ActiveLink href='/media-center/news' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الأخبار
                    </a>
                </ActiveLink>

                <ActiveLink href='/media-center/images' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        الصور
                    </a>
                </ActiveLink>

                <ActiveLink href='/media-center/designs' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        تصاميم دعاوية
                    </a>
                </ActiveLink>

                <ActiveLink href='/media-center/reports' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        تقارير و انجازات
                    </a>
                </ActiveLink>

                <ActiveLink href='/media-center/newspapers' activeClassName='activeItem'>
                    <a className='sidebar__contents__item'>
                        أقوال الصحف
                    </a>
                </ActiveLink>

            </div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>التاريخ</div>

                <div className={`sidebar__contents__item ${pageFilters.year == null && 'activeItem'}`} onClick={() => setPageFilters({ ...pageFilters, year: null })}>
                    الكل
                </div>

                {
                    props.mediaCenterData?.pageData?.containers?.dates?.map((year, index) => {
                        return <div className={`sidebar__contents__item ${pageFilters.year == year && 'activeItem'}`} key={index} onClick={() => setPageFilters({ ...pageFilters, year: year })}>
                            {year}
                        </div>
                    })
                }

            </div>

        </div>


    )
}
const mapStateToProps = (state) => {
    return { mediaCenterData: state.mediaCenter };
};

export default connect(mapStateToProps, { GET_MEDIA_CENTER_SECTION })(MediaCenterSidebar);