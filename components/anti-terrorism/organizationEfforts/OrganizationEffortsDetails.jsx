import React from 'react'

export default function OrganizationEffortsDetails(props) {

    return (
        <div className='lessonsDetails fade-in'>

            {/* <div className='lessonsDetails__navbar'>
                <div className='lessonsDetails__navbar__item'>الدروس</div>
                <div className='lessonsDetails__navbar__item'>المتون</div>
                <div className='lessonsDetails__navbar__item'>المحاضرات</div>
                <div className='lessonsDetails__navbar__item'>الخطب</div>
                <div className='lessonsDetails__navbar__item'>الرسائل</div>
                <div className='lessonsDetails__navbar__item'>المرئيات</div>
            </div> */}

            <div className='ourProjectsDetails__right__title'>{props.pageTopicController?.selectedTopic?.title}</div>
            <div className='ourProjectsDetails__right__desc' style={{ marginTop: '1rem', fontSize: '1.6rem' }}>
                {props.pageTopicController?.selectedTopic?.description}
            </div>


        </div>
    )
}
