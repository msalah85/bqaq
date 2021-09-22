import React from 'react'
import BroadcastCard from './broadcastCard/BroadcastCard'

export default function BroadcastSection() {
    return (
        <div className='general-container broadcastSection'>
            <div className='broadcastSection__title'>
                <div>الإذاعة و البث الصوتي</div>
                <div className='broadcastSection__title__moreBtn'>المزيد</div>
            </div>
            <div className='broadcastSection__broadcastContainer'>
                <BroadcastCard />
                <BroadcastCard />
                <BroadcastCard />
                <BroadcastCard />
            </div>
        </div>
    )
}
