import React from 'react'

export default function BookDetails(props) {

    return (
        <div className='bookDetails fade-in'>
            <div className='bookDetails__infoBar'>
                <div className='title-bg-green'>{props.bookDetails?.bookName}</div>
                <a href={props.bookDetails?.documentUrl} target='_blank' className='bookDetails__infoBar__downloadSec'><img src='/assets/Mask Group 63.svg' /><span>تحميل</span></a>
            </div>

            <div className='bookDetails__details'>{props.bookDetails?.content}</div>

        </div>
    )
}
