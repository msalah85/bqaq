import React from 'react'
import DetailsCard from '../../../reusable/detailsCard/DetailsCard';
import moment from 'moment';

export default function ElgaliatDesignsDetails(props) {
    console.log('data', props.designsData)
    return (
        <div className='galiatDesigns fade-in'>
            {
                Array.isArray(props.designsData) && props?.designsData.map((item, index) => {
                    return (
                        <div style={{ height: '33rem' }} key={index}>
                            <DetailsCard
                                title={item.title}
                                subtitle={moment(item.dateInHijri).format('YYYY / MM / DD')}
                                fallbackImg='/assets/fallbacks/news-fallback-image.png'
                                img={item.imageUrl || 'no Image'}
                            />
                        </div>
                    )
                })
            }



        </div>
    )
}
