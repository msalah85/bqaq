import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function PersonCard(props) {

    return (
        <div className='personCard'>

            <div className='personCard__imgCont'>
                <ReactImageFallback
                    src={props.employeeData?.avatarUrl}
                    fallbackImage="/assets/fallbacks/Admin Avatar.svg"
                    initialImage="/assets/fallbacks/Admin Avatar.svg"
                    alt="صورة الشخص"
                    draggable={false}
                />
            </div>

            <div className='personCard__details'>
                <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'black' }}>{props.employeeData?.name}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2C2C2C' }}>{props.employeeData?.jobTile}</div>
                <div className='personCard__details__withImg' ><img src='/assets/Mask Group 12.png' /><div dir='auto'>{props.employeeData?.mobile}</div></div>
                <div className='personCard__details__withImg' ><img src='/assets/Mask Group 13.png' /><div>{props.employeeData?.email}</div></div>
            </div>

        </div>
    )
}

