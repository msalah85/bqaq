import React, { useEffect, useState } from 'react'
import { EmailShareButton, FacebookShareButton, FacebookIcon, TwitterShareButton, WhatsappShareButton, TwitterIcon, WhatsappIcon, EmailIcon } from "react-share";
import ShareIconSVG from '../../public/assets/Share.svg'
export default function FloatingShare() {
    useEffect(() => {
        setUrl(window.location.href);
        console.log('url', window.location.href, url);
    });

    const [url, setUrl] = useState('');
    const [showShareItems, setShowShareItems] = useState(false)
    return (

        <ul className='floatingShare'>

            <li className='floatingShare__shareItem ' style={{ transform: `translateX(${showShareItems ? '2%' : '-100%'})`, transitionDelay: '0.4s' }}>
                <div >
                    <FacebookShareButton url={url} style={{ width: '100%', height: '100%' }} ><FacebookIcon /></FacebookShareButton>
                </div>
            </li>

            <li className='floatingShare__shareItem ' style={{ transform: `translateX(${showShareItems ? '2%' : '-100%'})`, transitionDelay: '0.3s' }}>
                <div >
                    <TwitterShareButton style={{ width: '100%', height: '100%' }} url={url}><TwitterIcon /></TwitterShareButton>
                </div>
            </li>

            <li>
                <div className='floatingShare__shareItem ' style={{ transform: `translateX(${showShareItems ? '2%' : '-100%'})`, transitionDelay: '0.2s' }}>
                    <WhatsappShareButton style={{ width: '100%', height: '100%' }} url={url}><WhatsappIcon /></WhatsappShareButton>
                </div>
            </li>

            <li>
                <div className='floatingShare__shareItem ' style={{ transform: `translateX(${showShareItems ? '2%' : '-100%'})`, transitionDelay: '0.1s' }}>
                    <EmailShareButton style={{ width: '100%', height: '100%' }} url={url}><EmailIcon /></EmailShareButton>
                </div>
            </li>

            <li>
                <div className='floatingShare__shareBtn' onClick={() => setShowShareItems(!showShareItems)}>
                    <ShareIconSVG />
                </div>
            </li>

        </ul>

    )
}
