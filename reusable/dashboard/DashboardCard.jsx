import React from 'react'

export default function DashboardCard(props) {
    return (
        <div className='card-container'>
            <div className='upperSec'>
                <img src={props.icon} style={{ maxWidth: '2rem' }} />
                <div>{props.title}</div>
            </div>
            <div className='lowerSec'>
                {props.subtitle}
            </div>
        </div>
    )
}
