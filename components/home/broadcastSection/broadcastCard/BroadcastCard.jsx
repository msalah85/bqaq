import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function BroadcastCard() {
    return (
        <div className='broadcastCard'>
            <div className='broadcastCard__imgCont'>
                <ReactImageFallback
                    src="xx"
                    fallbackImage="assets/fallbacks/news-fallback-image.png"
                    initialImage="assets/fallbacks/news-fallback-image.png"
                    alt="صورة الخبر"
                />
            </div>
            <div className='broadcastCard__title'>عنوان الخبر</div>
            <div className='broadcastCard__describtion three-lines'>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد  </div>
            <button className='baqiq-gold-btn '>حضور البث</button>

        </div>
    )
}
