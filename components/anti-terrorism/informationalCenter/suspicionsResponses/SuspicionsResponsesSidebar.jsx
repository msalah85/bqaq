import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink';
import SearchSVG from '../../../../public/assets/Search.svg'
import search from '../../../../utils/search'

export default function SuspicionsResponsesSidebar(props) {
    let timeout = null;
    const [indexer, setIndexer] = useState([]);

    const searchHandle = (e) => {

        if (timeout) clearTimeout(timeout); // reset timer 

        timeout = setTimeout(function () {

            if (e.target.value) {
                search(e.target.value, props.suspicionsData, 'title').then((results) => {
                    setIndexer(results || [])
                })
            }
            else {
                //in case search input is null 
                setIndexer(props.suspicionsData || [])
            }

        }, 750);

    }

    useEffect(() => {
        setIndexer(props.suspicionsData || [])
    }, [props.suspicionsData]);

    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' onChange={searchHandle} /></div>

            <div className='sidebar__switchBtn' style={{ marginTop: '2rem' }}>

                <ActiveLink activeClassName="activeSwitchBtn" href='/anti-terrorism'>
                    <a className='sidebar__switchBtn__btn' style={{ borderRadius: '0 .8rem .8rem 0rem' }}> جهود الجمعية </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeSwitchBtn' href='/anti-terrorism/informational-center/suspicions-responses'>
                    <a className='sidebar__switchBtn__btn ' style={{ borderRadius: '.8rem 0 0 .8rem' }}> المركز المعلوماتي </a>
                </ActiveLink>

            </div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                {
                    indexer?.map((topic, index) => {
                        return (
                            <div
                                key={index}
                                className={`sidebar__contents__item ${(topic.id == props.pageTopicController?.selectedTopic?.id) && 'activeItem'}`}
                                onClick={() => {
                                    props.pageTopicController?.setSelectedTopic(topic)
                                }}
                            >
                                {topic.title}
                            </div>
                        )
                    })
                }
            </div>

        </div>


    )
}
