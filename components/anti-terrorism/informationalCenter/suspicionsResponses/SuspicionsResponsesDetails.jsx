import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function SuspicionsResponsesDetails(props) {

    return (
        <div className='lessonsDetails fade-in'>

            <div className='lessonsDetails__navbar'>

                <ActiveLink activeClassName='activeItem' href='/anti-terrorism/informational-center/videos'>
                    <a className='lessonsDetails__navbar__item ' > المرئيات </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeItem' href='/anti-terrorism/informational-center/audios'>
                    <a className='lessonsDetails__navbar__item ' > الصوتيات </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeItem' href='/anti-terrorism/informational-center/suspicions-responses'>
                    <a className='lessonsDetails__navbar__item ' > شبهات و ردود </a>
                </ActiveLink>

                <ActiveLink activeClassName='activeItem' href='/anti-terrorism/informational-center/researches'>
                    <a className='lessonsDetails__navbar__item ' > بحوث تأصيلية </a>
                </ActiveLink>
            </div>


            <div className='ourProjectsDetails__right__title'>{props.pageTopicController?.selectedTopic?.title}</div>
            <div className='ourProjectsDetails__right__desc' style={{ marginTop: '1rem', fontSize: '1.6rem' }}>
                {props.pageTopicController?.selectedTopic?.description}
            </div>


        </div>
    )
}
