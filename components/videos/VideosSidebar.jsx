import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import SearchSVG from '../../public/assets/Search.svg'
import search from '../../utils/search'

export default function VideosSidebar(props) {
    let timeout = null;
    const [indexer, setIndexer] = useState([]);

    const searchHandle = (e) => {

        if (timeout) clearTimeout(timeout); // reset timer 

        timeout = setTimeout(function () {

            if (e.target.value) {
                search(e.target.value, props.indexer?.sheikhs, 'sheikhName').then((results) => {
                    setIndexer(results || [])
                })
            }
            else {
                //in case search input is null 
                setIndexer(props.indexer?.sheikhs || [])
            }

        }, 750);

    }

    useEffect(() => {
        setIndexer(props.indexer?.sheikhs || [])
    }, [props.indexer?.sheikhs]);

    return (
        <div className='sidebar'>

            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' onChange={searchHandle} /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>


                <div className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.categoryName == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, categoryName: null }) }}>
                    الكل
                </div>
                {Array.isArray(props.indexer?.categries) && props.indexer?.categries.map((item, index) => (
                    <div key={index} className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.categoryName == item && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, categoryName: item }) }}>
                        {item}
                    </div>
                ))}

            </div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>المشايخ</div>

                <div className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.sheikhId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, sheikhId: null }) }}>
                    الكل
                </div>

                {indexer.map((item, index) => (
                    <div key={index} className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.sheikhId == item.sheikhId && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, sheikhId: item.sheikhId }) }}>
                        {item.sheikhName}
                    </div>
                ))}


            </div>
        </div>


    )
}
