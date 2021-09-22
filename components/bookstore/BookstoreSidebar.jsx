import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import SearchSVG from '../../public/assets/Search.svg'
import search from '../../utils/search'

export default function BookstoreSidebar(props) {

    const [language, setLanguage] = useState([]);
    const [indexer, setIndexer] = useState([]);
    let timeout = null;

    const searchHandle = (e) => {

        if (timeout) clearTimeout(timeout); // reset timer 

        timeout = setTimeout(function () {

            if (e.target.value) {
                search(e.target.value, language, 'languageName').then((results) => {
                    setIndexer(results || [])
                })
            }
            else {
                //in case search input is null 
                setIndexer(language || [])
            }

        }, 750);

    }
    useEffect(() => {
        let uniqueLang = []
        props.books?.map(book => {
            if (!uniqueLang.find(item => item.languageId === book.languageId)) {

                uniqueLang.push(book)
            }
        })
        setLanguage(uniqueLang)
        setIndexer(uniqueLang)

    }, [props.books]);


    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' onChange={searchHandle} /></div>

            <div className='sidebar__visitUs'>للحصول على الكتاب تكرم بزياراتنا</div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>اللغات</div>

                <div className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.languageId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ languageId: null }) }}>
                    الكل
                </div>

                {indexer.map((item, index) => (

                    <div key={index} className={`sidebar__contents__item ${props?.pageFiltersController?.pageFilters?.languageId == item.languageId && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ languageId: item.languageId }) }}>
                        {item.languageName}
                    </div>

                ))}

            </div>

        </div>

    )
}
