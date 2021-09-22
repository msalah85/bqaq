import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import SearchSVG from '../../public/assets/Search.svg'
import search from '../../utils/search'

export default function ElgaliatSidebar(props) {
    let timeout = null;
    const [indexer, setIndexer] = useState([]);

    const searchHandle = (e) => {

        if (timeout) clearTimeout(timeout); // reset timer 

        timeout = setTimeout(function () {

            if (e.target.value) {
                search(e.target.value, props.indexer, 'name').then((results) => {
                    setIndexer(results || [])
                })
            }
            else {
                //in case search input is null 
                setIndexer(props.indexer || [])
            }

        }, 750);

    }

    useEffect(() => {
        setIndexer(props.indexer || [])
    }, [props.indexer]);

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' onChange={searchHandle} /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                <div className={`sidebar__contents__item ${props.pageControll?.pageToShow == 'lessons' && 'activeItem'}`} onClick={() => { props.pageControll?.setPageToShow('lessons') }}>
                    الدروس
                </div>

                <div className={`sidebar__contents__item ${props.pageControll?.pageToShow == 'designs' && 'activeItem'}`} onClick={() => { props.pageControll?.setPageToShow('designs') }}>
                    التصاميم الدعوية
                </div>

                <div className={`sidebar__contents__item ${props.pageControll?.pageToShow == 'videos' && 'activeItem'}`} onClick={() => { props.pageControll?.setPageToShow('videos') }}>
                    المرئيات
                </div>


            </div>

            {props.showLangs && <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>اللغات</div>

                <div className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.languageId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, languageId: null }) }}>
                    الكل
                </div>

                {indexer.map((item, index) => (
                    <div key={index} className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.languageId == item.id && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, languageId: item.id }) }}>
                        {item.name}
                    </div>
                ))}
            </div>
            }

        </div>


    )
}
