import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy';
import { Gallery, Item } from 'react-photoswipe-gallery';
import CopyToClipboard from 'react-copy-to-clipboard'
import Popup from '../popup/Popup'
import WhatsappSVG from '../../public/assets/Whatsapp.svg'
import TwitterSVG from '../../public/assets/Twitter.svg'
import FacebookSVG from '../../public/assets/Facebook.svg'
import MessageSVG from '../../public/assets/Email.svg'

export default function DetailsCard(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [copied, setCopied] = useState(false);
    return (
        <>
            <Popup
                show={showPopup}
                showController={(status) => { setShowPopup(status) }}
                enableCloseBtn
                onClickOutsideClose
            >
                <div className='shareWith showInAllScreens' style={{ padding: '0 8rem 4rem', marginTop: '0' }}>
                    <div className='shareWith__title' style={{ alignSelf: 'center' }}>مشاركة عبر</div>
                    <div className='shareWith__itemsCont'>
                        <div className='shareWith__itemsCont__item' ><FacebookSVG /></div>
                        <div className='shareWith__itemsCont__item'><TwitterSVG /></div>
                        <div className='shareWith__itemsCont__item'><WhatsappSVG /></div>
                        <div className='shareWith__itemsCont__item'><MessageSVG /></div>
                    </div>
                </div>
            </Popup>
            <div className='detailsCard'>
                {props?.img && <div className='detailsCard__imgCont'>
                    <Gallery>
                        <Item
                            original={props?.img}
                            thumbnail={props?.img}
                            width="1024"
                            height="1024"
                        >
                            {({ ref, open }) => (
                                <img ref={ref} onClick={open} src={props.img} onError={e => { e.target.src = props.fallbackImg }} />
                            )}
                        </Item>
                    </Gallery>

                </div>}

                {props?.video && <div className='detailsCard__vidCont'>
                    <ReactPlayer
                        url={props.video}
                        controls={true}
                        volume={1}
                        muted={false}
                        width='100%'
                        height='100%'
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    />
                </div>
                }

                <div className='detailsCard__title'>{props?.title}</div>

                <div className='detailsCard__info'>

                    <div className='detailsCard__info__date' >{props?.subtitle}</div>
                    <div className='detailsCard__info__shareSec'>
                        <div style={{ fontSize: '1.2rem', color: 'green' }} hidden={!copied} className='animate__animated animate__fadeIn animate__faster'>تم النسخ</div>
                        <CopyToClipboard text={props.video || props.img} onCopy={() => {
                            setCopied(true)
                            setTimeout(() => {
                                setCopied(false)
                            }, 2500);
                        }}>

                            <img src='/assets/Mask Group 61.svg' />
                        </CopyToClipboard>

                        <img src='/assets/Mask Group 60.svg' onClick={() => setShowPopup(true)} />
                    </div>
                </div>
            </div>
        </>
    )
}
