import Link from 'next/link'
import React from 'react'

export default function SectionBar(props) {
    return (
        <div className='general-container sections'>
            <Link href='/donnation/21cbfd8a-efc3-434c-b710-0ba130950ec8'>
                <a >
                    <div className='sections__item'>
                        <img src='/assets/Mask Group 75.svg' />
                        <div className='sections__item__title'>تبرع</div>
                    </div>
                </a>
            </Link>

            <div className='sections__item'>
                <img src='/assets/Mask Group 76.svg' />
                <div className='sections__item__title'>تطوع</div>
            </div>

            <Link href='/media-center/reports'>
                <a >
                    <div className='sections__item'>
                        <img src='/assets/Mask Group 77.svg' />
                        <div className='sections__item__title'>التقارير</div>
                    </div>
                </a>
            </Link>

            <Link href='/media-center/reports'>
                <a >
                    <div className='sections__item'>
                        <img src='/assets/Mask Group 78.svg' />
                        <div className='sections__item__title'>الإنجازات</div>
                    </div>

                </a>
            </Link>

        </div>
    )
}
