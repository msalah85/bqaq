import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function ScientistPraiseDetailsSec(props) {
    return (
        <>
            <div className='ScientistPraiseDetailsSec'>
                <div className='title-bg-green'>{props?.praiseDetails?.title}</div>
                <div className='ScientistPraiseDetailsSec__details' >{props?.praiseDetails?.description}</div>
                <div className='ScientistPraiseDetailsSec__gallery'>

                    {props?.praiseDetails?.media?.images?.map((img) => {
                        return <div className='ScientistPraiseDetailsSec__gallery__imgCont'>
                            <ReactImageFallback
                                src={img}
                                fallbackImage="/assets/fallbacks/Admin Avatar.svg"
                                initialImage="/assets/fallbacks/Admin Avatar.svg"
                                alt="صورة الثناء"
                            />
                        </div>
                    })}

                </div>
            </div>
        </>
    )
}
