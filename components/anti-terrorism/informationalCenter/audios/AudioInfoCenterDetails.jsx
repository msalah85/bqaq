import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'

export default function AudioInfoCenterDetails(props) {
    let audios = [1, 2, 3, 4, 5, 6]
    return (
        <div className='audioInfoCenterDetails fade-in'>

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


            <div className='audioInfoCenterDetails__audiosCont'>
                {props.audioData?.map((audio, index) => {
                    return (
                        <div className='audioInfoCenterDetails__audiosCont__audio'>
                            <div className='audioInfoCenterDetails__audiosCont__audio__rightSec'>
                                {/* <img src='/assets/fallbacks/Play.svg' width='30rem' /> */}
                                <div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'black' }}>{audio.title}</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '500', color: '#959595' }}>{audio.sheikhName}</div>
                                </div>
                            </div>
                            <div className='audioInfoCenterDetails__audiosCont__audio__leftSec'>
                                <audio controls >
                                    <source src={audio.mediaUrl} type="audio/ogg" />
                                    <source src={audio.mediaUrl} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}
