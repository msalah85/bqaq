import React from 'react'
import ActiveLink from '../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'
import SearchSVG from '../../public/assets/Search.svg'
export default function SheikhDetailsSidebar(props) {
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>المشايخ</div>

                <div className={`sidebar__contents__item ${props.selectedItem?.id == 'students' && 'activeItem'}`} onClick={() => props.setSelectedItem({ id: 'students', name: 'طلابه' })}>
                    طلابه
                </div>

                <div className={`sidebar__contents__item ${props.selectedItem?.id == 'about' && 'activeItem'}`} onClick={() => props.setSelectedItem({ id: 'about', name: 'ملامح من صفاته' })}>
                    ملامح من صفاته
                </div>

                <div className={`sidebar__contents__item ${props.selectedItem?.id == 'working' && 'activeItem'}`} onClick={() => props.setSelectedItem({ id: 'working', name: 'اعماله و نشاطه العلمي' })}>
                    اعماله و نشاطه العلمي
                </div>

                <div className={`sidebar__contents__item ${props.selectedItem?.id == 'teachers' && 'activeItem'}`} onClick={() => props.setSelectedItem({ id: 'teachers', name: 'شيوخه' })}>
                    شيوخه
                </div>

                <div className={`sidebar__contents__item ${props.selectedItem?.id == 'history' && 'activeItem'}`} onClick={() => props.setSelectedItem({ id: 'history', name: 'أسمه و مولده' })}>
                    أسمه و مولده
                </div>

            </div>

        </div>


    )
}
