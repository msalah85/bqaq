import React from 'react'
import HomeSVG from '../../../public/assets/dashboard_assets/home.svg'
import AppSVG from '../../../public/assets/dashboard_assets/app.svg'
import DonationSVG from '../../../public/assets/dashboard_assets/heart.svg'
import CoinSVG from '../../../public/assets/dashboard_assets/coin.svg'
import SettingSVG from '../../../public/assets/dashboard_assets/customer-support.svg'
import UsersSVG from '../../../public/assets/dashboard_assets/customer.svg'
import ActiveLink from '../../../reusable/activeLink/ActiveLink'
import { useRouter } from 'next/router'
import Link from 'next/link'




export default function DashboardSideBar(props) {
    const router = useRouter();
    console.log(router.pathname.includes('sections'));
    return (
        <div className='dashboard__sidebar'>

            <ActiveLink activeClassName='dashboardActiveItem' href='/dashboard'>
                <a className='dashboard__sidebar__item ' title='الرئيسيه'><HomeSVG /></a>
            </ActiveLink>

            <Link href='/dashboard/sections'>
                <a className={`dashboard__sidebar__item ${router.pathname.includes('sections') && 'dashboardActiveItem'}`} title='اقسام الموقع'><AppSVG /></a>
            </Link>

            <ActiveLink activeClassName='dashboardActiveItem' href='/dashboard/donations'>
                <a className='dashboard__sidebar__item ' title='التبرعات'><CoinSVG /></a>
            </ActiveLink>



            <div className='dashboard__sidebar__item' title='التطوع'><DonationSVG /></div>
            <div className='dashboard__sidebar__item' title='مدراء الموقع'><SettingSVG /></div>
            {/* <div className='dashboard__sidebar__item' title='المستخدمون'><UsersSVG /></div> */}
        </div>
    )
}
