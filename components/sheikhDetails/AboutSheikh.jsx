import React from 'react'

export default function AboutSheikh(props) {
    return (
        <div className='ScientistPraiseDetailsSec'>
            <div className='title-bg-green'>{props.selectedItem?.name}</div>
            <div className='ScientistPraiseDetailsSec__details'>
                {props.dataToShow}
            </div>
        </div>

    )
}
