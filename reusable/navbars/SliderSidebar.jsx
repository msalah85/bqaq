import Link from 'next/link'
import React, { useState } from 'react'
import { connect } from "react-redux"
import { TOGGLE_SIGNIN_POPUP } from '../../redux/actions/registration/index'
import UserSVG from '../../public/assets/User.svg'

// import InstagramSVG from '../../public/assets/Instagram.svg'
// import YoutubeSVG from '../../public/assets/Youtube.svg'
// import WhatsappSVG from '../../public/assets/Whatsapp.svg'
// import TwitterSVG from '../../public/assets/Twitter.svg'
// import FacebookSVG from '../../public/assets/Facebook.svg'
import InstagramSVG from '../../public/assets/Instagram.svg'
import YoutubeSVG from '../../public/assets/Youtube.svg'
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

function SliderSidebar(props) {

    return (
        <>
            {props.showSlider &&
                <div className='sliderSidebar'>
                    <div className='sliderSidebar__background' onClick={() => { props.showController(false) }} />
                    <div className='sliderSidebar__body animate__animated animate__slideInRight' id='sliderSidebar'>
                        <div className='sliderSidebar__body__closeBtn'><img src='/assets/Mask Group 67.svg' onClick={() => props.showController(false)} /></div>
                        <div className='sliderSidebar__body__loginSec' onClick={() => { props.showController(false); props.TOGGLE_SIGNIN_POPUP(true) }}>
                            <div><UserSVG /></div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>تسجيل دخول</div>
                        </div>

                        <div className='sliderSidebar__body__routes'>
                            <Link href='/who-we-are' ><a onClick={() => { props.showController(false) }}>من نحن</a></Link>
                            <Link href='/our-projects' ><a onClick={() => { props.showController(false) }}>مشاريع الجمعية</a></Link>
                            <Link href='/lessons' ><a onClick={() => { props.showController(false) }}>الدروس</a></Link>
                            <Link href='/el-galiat' ><a onClick={() => { props.showController(false) }}>الجاليات</a></Link>
                            <Link href='/videos' ><a onClick={() => { props.showController(false) }}>المرئيات</a></Link>
                            <Link href='/bookstore' ><a onClick={() => { props.showController(false) }}>المكتبة</a></Link>
                            <Link href='/women-section' ><a onClick={() => { props.showController(false) }}>القسم النسائي</a></Link>
                            <Link href='/media-center' ><a onClick={() => { props.showController(false) }}>المركز الاعلامي</a></Link>
                            <Link href='/anti-terrorism' ><a onClick={() => { props.showController(false) }}>مركز مكافحة الإرهاب</a></Link>
                            <Link href='/contact-us' ><a onClick={() => { props.showController(false) }}>تواصل معانا</a></Link>
                        </div>

                        <div className='sliderSidebar__body__bootomSec'>
                            <div className='sliderSidebar__body__bootomSec__imgCont'><img src='/assets/Saudi Vision 2030 Logo.png' width='150px' height='80px' /></div>
                            <div className='sliderSidebar__body__bootomSec__socials'>

                                <a href='' target="_blank" className='navbar__socials__socialItem__svg instaBg' ><InstagramSVG /></a>
                                <a href='https://www.youtube.com/c/%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82' target="_blank" className='navbar__socials__socialItem__svg' style={{ backgroundColor: 'red' }}><YoutubeSVG /></a>
                                <a href='https://api.whatsapp.com/send?phone=966500801488' target="_blank" className='navbar__socials__socialItem'><WhatsappIcon /></a>
                                <a href='https://twitter.com/bqaiqdawah' target="_blank" className='navbar__socials__socialItem'><TwitterIcon /></a>
                                <a href='https://www.facebook.com/bqaiqdawh' target="_blank" className='navbar__socials__socialItem' ><FacebookIcon /></a>

                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { TOGGLE_SIGNIN_POPUP })(SliderSidebar);
