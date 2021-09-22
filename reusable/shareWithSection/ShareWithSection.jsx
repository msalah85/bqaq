import React from 'react'


import WhatsappSVG from '../../public/assets/Whatsapp.svg'
import TwitterSVG from '../../public/assets/Twitter.svg'
import FacebookSVG from '../../public/assets/Facebook.svg'
import MessageSVG from '../../public/assets/Email.svg'


export default function ShareWithSection(props) {
    return (
        <div className={`shareWith ${props.showInSmallScreen ? 'showShareWithSectionSmallScreen' : ''} `}>
            <div className='shareWith__title'>مشاركة عبر</div>
            <div className='shareWith__itemsCont'>
                <div className='shareWith__itemsCont__item' ><FacebookSVG /></div>
                <div className='shareWith__itemsCont__item'><TwitterSVG /></div>
                <div className='shareWith__itemsCont__item'><WhatsappSVG /></div>
                <div className='shareWith__itemsCont__item'><MessageSVG /></div>
            </div>
        </div>
    )
}
