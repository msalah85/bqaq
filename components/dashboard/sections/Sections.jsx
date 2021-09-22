import Link from 'next/link'
import React from 'react'
import DashboardCard from '../../../reusable/dashboard/DashboardCard'

export default function Sections() {
    return (
        <div className='dashboard-sections'>
            <Link href='/dashboard/sections/who-we-are'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 117.svg'} title='من نحن' subtitle='لادارة قسم من نحن' />
                </a>
            </Link>

            <Link href='/dashboard/sections/our-projects'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 118.svg'} title='مشاريع الجمعيه' subtitle='لادارة قسم مشاريع الجمعيه' />
                </a>
            </Link>

            <Link href='/dashboard/sections/lessons'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 119.svg'} title='الدروس' subtitle='لادارة قسم الدروس' />
                </a>
            </Link>

            <Link href='/dashboard/sections/videos'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 121.svg'} title='المرئيات' subtitle='لادارة قسم المرئيات' />
                </a>
            </Link>

            <Link href='/dashboard/sections/women-section'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 123.svg'} title='القسم النسائي' subtitle='لادارة القسم النسائي' />
                </a>
            </Link>

            <Link href='/dashboard/sections/bookstore'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 122.svg'} title='المكتبه' subtitle='لادارة قسم المكتبه' />
                </a>
            </Link>

            <Link href='/dashboard/sections/el-galiat'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 120.svg'} title='الجاليات' subtitle='لادارة قسم الجاليات' />
                </a>
            </Link>

            <Link href='/dashboard/sections/media-center'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 124.svg'} title='المركز الاعلامي' subtitle='لادارة المركز الاعلامي' />
                </a>
            </Link>

            <Link href='/dashboard/sections/anti-terrorism'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 125.svg'} title='قسم مكافحة الإرهاب' subtitle='لادارة قسم مكافحة الإرهاب' />
                </a>
            </Link>

            <Link href='/dashboard/sections/tags'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 122.svg'} title='التصنيف' subtitle='لادارة  التصنيف' />
                </a>
            </Link>

            <Link href='/dashboard/sections/languages'>
                <a>
                    <DashboardCard icon={'/assets/global.svg'} title='اللغات' subtitle='لادارة اللغات' />
                </a>
            </Link>

            <Link href='/dashboard/sections/categories'>
                <a>
                    <DashboardCard icon={'/assets/dashboard_assets/app.svg'} title='انواع المواضيع' subtitle='لادارة انواع المواضيع' />
                </a>
            </Link>

            <Link href='/dashboard/sections/shiekhs'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 153.svg'} title='المشايخ و العلماء' subtitle='لادارة المشايخ و العلماء' />
                </a>
            </Link>

            <Link href='/dashboard/sections/mainPage'>
                <a>
                    <DashboardCard icon={'/assets/Mask Group 138.svg'} title='الصفحة الرئيسية' subtitle='لادارة الصفحة الرئيسية' />
                </a>
            </Link>

        </div>
    )
}
