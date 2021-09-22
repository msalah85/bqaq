import Link from 'next/link'
import React from 'react'
import OurScientistCard from './ourScientistCard/OurScientistCard'


export default function OurScientistSection(props) {
    return (
        <div className='general-container ourScientist'>
            <div className='ourScientist__title'>
                <div>علماؤنا</div>
                <Link href='/sheikh/928898ff-68aa-4793-9a55-6c7d7ff724ef'>
                    <a className='ourScientist__title__moreBtn'>
                        المزيد
                    </a>
                </Link>
            </div>
            <div className='ourScientist__ourScientistContainer'>
                {
                    props.scientist?.slice(0, 4).map(scientist => {
                        return <OurScientistCard scientist={scientist} />
                    })
                }

            </div>
        </div>
    )
}
