import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (<>
        {/* <div className='curve'></div> */}
        <div className='footer '>

            <div className='general-container footer__container'>

                <div className='footer__container__logo' ><img src='/assets/Group 161009.svg ' /></div>

                <div className='footer__container__links'>
                    <div className='footer__container__links__title'>روابط سريعه</div>
                    <div className='footer__container__links__grid'>

                        <Link href='/anti-terrorism'>
                            <a>
                                <img src={'/assets/Mask Group 82.png'} />مركز مكافحة الإرهاب
                            </a>
                        </Link>

                        <Link href='/who-we-are'>
                            <a>
                                <img src={'/assets/Mask Group 82.png'} />التعريف بالجمعيه
                            </a>
                        </Link>

                        <Link href='/women-section'>
                            <a>
                                <img src={'/assets/Mask Group 82.png'} />القسم النسائي
                            </a>
                        </Link>

                        <Link href='/who-we-are/general-goals'>
                            <a>
                                <img src={'/assets/Mask Group 82.png'} />الأهداف العامة
                            </a>
                        </Link>

                    </div>

                </div>

                <div className='footer__container__subscribtion'>
                    <div className='footer__container__subscribtion__title'>أشترك في القائمة البريدية</div>
                    <div className='footer__container__subscribtion__inpContainer'>
                        <input className='baqiq-inp' placeholder='أدخل البريد الألكتروني' /> <button className='baqiq-gold-btn'><img src={'/assets/Mask Group 87.png'} /></button>
                    </div>
                </div>

            </div>

        </div>

        <div className='footerBottom'>
            <div className='general-container footerBottom__container'>
                <div className='footerBottom__container__socialCont'>

                    <a href='https://www.youtube.com/c/%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82' target="_blank" >
                        <img src={'/assets/Mask Group 90.png'} />
                    </a>

                    <a href='https://twitter.com/bqaiqdawah' target="_blank" >
                        <img src={'/assets/Mask Group 89.png'} />
                    </a>

                    <a href='https://www.facebook.com/bqaiqdawh' target="_blank" >
                        <img src={'/assets/Mask Group 88.png'} />
                    </a>

                    {/* <img src={'/assets/Mask Group 91.png'} /> */}
                </div>
                <div>© حقوق الملكية</div>
            </div>
        </div>
    </>
    )
}
