import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'
import DetailsCard from '../../../../reusable/detailsCard/DetailsCard'
export default function VideoInfoCenterDetails(props) {

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

            <div className='videos__gridCont'>

                {
                    props?.videosData?.map
                        ((item, index) => {
                            return (
                                <div style={{ height: 'fit-content' }} key={index}>
                                    <DetailsCard
                                        title={item.title}
                                        subtitle={item.sheikhName}
                                        video={item.mediaUrl || 'no video'}
                                    />
                                </div>
                            )
                        })
                }
                s
            </div>

        </div>
    )
}
