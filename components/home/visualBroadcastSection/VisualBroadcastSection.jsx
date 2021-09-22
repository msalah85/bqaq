import React from 'react'
import BroadcastCard from '../broadcastSection/broadcastCard/BroadcastCard'

export default function VisualBroadcastSection() {
    return (
        <div className='general-container broadcastSection'>
            <div className='broadcastSection__title'>
                <div>البث المرئي</div>
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
