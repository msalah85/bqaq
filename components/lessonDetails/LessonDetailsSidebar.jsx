import React, { useEffect, useState } from 'react';
import ActiveLink from '../../reusable/activeLink/ActiveLink';
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs';
import moment from 'moment';
export default function LessonDetailsSidebar(props) {
    console.log(props);
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <table >
                <tr>
                    <th className='one-line'>أسم الشيخ :</th>
                    <td >{props.lessonDetailsData?.sheikhName}</td>
                </tr>
                <tr>
                    <th className='one-line'>عنوان الدرس :</th>
                    <td>{props.lessonDetailsData?.title}</td>
                </tr>
                <tr>
                    <th className='one-line'>التاريخ :</th>
                    <td>{moment(props.lessonDetailsData?.hijriDate).format('YYYY / MM / DD')}</td>
                </tr>
            </table>

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                <div
                    className={`sidebar__contents__item ${props?.pageFiltersController?.selectedTag == null && 'activeItem'}`}
                    onClick={() => { props?.pageFiltersController?.setSelectedTag(null) }}
                >
                    المقدمه
                </div>

                {Array.isArray(props.lessonDetailsData?.tenor?.bookmarks) && props.lessonDetailsData?.tenor?.bookmarks.map((item, index) => (

                    <div
                        key={index}
                        className={`sidebar__contents__item ${props?.pageFiltersController?.selectedTag?.id == item.id && 'activeItem'}`}
                        onClick={() => { props?.pageFiltersController?.setSelectedTag({ ...item }) }}
                    >
                        {item.title}
                    </div>

                ))}

            </div>

        </div>

    )
}
