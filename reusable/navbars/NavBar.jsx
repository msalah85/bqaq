import React, { useState } from 'react'
import { connect } from "react-redux";
import { TOGGLE_SIGNIN_POPUP, LOG_OUT } from '../../redux/actions/registration/index'

import UserSVG from '../../public/assets/User.svg'
import MenuSVG from '../../public/assets/menu.svg'
import SearchSVG from '../../public/assets/Search.svg'

import InstagramSVG from '../../public/assets/Instagram.svg'
import YoutubeSVG from '../../public/assets/Youtube.svg'
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";


import RolesAndConditionsSVG from '../../public/assets/Mask Group 100.svg'
import PolciesSVG from '../../public/assets/Mask Group 99.svg'
import ContactUsSVG from '../../public/assets/Mask Group 101.svg'
import LogoutSVG from '../../public/assets/Mask Group 102.svg'






import Link from 'next/link';
import SliderSidebar from './SliderSidebar';

function NavBar(props) {
    const [showSlider, setShowSlider] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false)
    const showController = (status) => {
        switch (status) {
            case true: {
                setShowSlider(true);
                break;
            }

            case false: {
                document.getElementById('sliderSidebar') && document.getElementById('sliderSidebar').classList.add('animate__slideOutRight');
                setTimeout(() => {
                    document.getElementById('sliderSidebar') && document.getElementById('sliderSidebar').classList.remove('animate__slideOutRight');
                    setShowSlider(false)
                }, 250);
                break;
            }

            default: {
                document.getElementById('sliderSidebar') && document.getElementById('sliderSidebar').classList.add('animate__slideOutRight');
                setTimeout(() => {
                    document.getElementById('sliderSidebar') && document.getElementById('sliderSidebar').classList.remove('animate__slideOutRight');
                    setShowSlider(false)
                }, 250);
                break;
            }


        }
    }
    return (
        <div className='bottomBorder'>
            <SliderSidebar showController={showController} showSlider={showSlider} />
            <div className='general-container navbar'>
                {
                    props.userData?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?
                        <div className='navbar__userContainer' >
                            <div className="navbar__userContainer__loggedInUser" style={{ cursor: 'pointer' }} onClick={() => setShowPopUp(!showPopUp)}><img src='/assets/downArrow.png' /> <UserSVG /><span>{props.userData.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}</span></div>
                            {showPopUp &&
                                <>
                                    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'transparent', position: 'absolute', top: '0', right: '0', zIndex: '3' }} onClick={() => { setShowPopUp(false) }}></div>
                                    <div className='navbar__userContainer__dropdown'>
                                        <div className='navbar__userContainer__dropdown__item'><RolesAndConditionsSVG /><span>الشروط و الأحكام</span></div>
                                        <div className='navbar__userContainer__dropdown__item'><PolciesSVG /><span>سياسة خاصة</span></div>
                                        <div className='navbar__userContainer__dropdown__item'><ContactUsSVG /><span>تواصل معنا</span></div>
                                        <div className='navbar__userContainer__dropdown__item' onClick={() => props.LOG_OUT()}><LogoutSVG /><span>تسجيل خروج</span></div>
                                    </div>
                                </>
                            }
                        </div>
                        : <div className='navbar__userContainer' style={{ cursor: 'pointer' }}><div className='navbar__userContainer__loginBtn' onClick={() => { props.TOGGLE_SIGNIN_POPUP(true) }} ><UserSVG /><span>تسجيل دخول</span></div></div>
                }


                <div className='navbar__searchBar'><SearchSVG /><input placeholder='بحث' className='baqiq-inp' /></div>
                <div className='navbar__socials'>
                    <a href='' target="_blank" className='navbar__socials__socialItem__svg instaBg' ><InstagramSVG /></a>
                    <a href='https://www.youtube.com/c/%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82' target="_blank" className='navbar__socials__socialItem__svg' style={{ backgroundColor: 'red' }}><YoutubeSVG /></a>
                    <a href='https://api.whatsapp.com/send?phone=966500801488' target="_blank" className='navbar__socials__socialItem'><WhatsappIcon /></a>
                    <a href='https://twitter.com/bqaiqdawah' target="_blank" className='navbar__socials__socialItem'><TwitterIcon /></a>
                    <a href='https://www.facebook.com/bqaiqdawh' target="_blank" className='navbar__socials__socialItem' ><FacebookIcon /></a>
                </div>
            </div>

            <div className='general-container sm-screen-navbar'>
                <div className='sm-screen-navbar__rightSec'>
                    <div style={{ cursor: 'pointer' }} onClick={() => { showController(true) }}><MenuSVG /></div>
                    <div><SearchSVG /></div>
                </div>


                <div className='sm-screen-navbar__leftSec'>

                    <Link href='/'>
                        <a className='sm-screen-navbar__leftSec__logoSVG'>
                            <img src='/assets/Baqiq-Logo.svg' />
                        </a>
                    </Link>

                    <Link href='/'>
                        <a className='sm-screen-navbar__leftSec__TextLogoSVG'>
                            <img src='/assets/textLogo.svg' />
                        </a>
                    </Link>

                </div>

            </div>
        </div >

    )
}
const mapStateToProps = (state) => {
    return { userData: state.authorization?.userData };
};

export default connect(mapStateToProps, { TOGGLE_SIGNIN_POPUP, LOG_OUT })(NavBar);
