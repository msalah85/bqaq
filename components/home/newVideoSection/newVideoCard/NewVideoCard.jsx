import React from 'react'
import ReactPlayer from 'react-player'

export default function NewVideoCard(props) {
    return (
        <div className='newVideoCard'>
            <div className='newVideoCard__imgCont'>
                <ReactPlayer
                    url={props.video?.url}
                    controls={true}
                    volume={1}
                    muted={false}
                    width='100%'
                    height='100%'
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                />
            </div>
            <div className='newVideoCard__title'>{props.video?.title}</div>
            <div className='newVideoCard__describtion'>{props.video?.sheikhName}</div>
        </div>
    )
}
