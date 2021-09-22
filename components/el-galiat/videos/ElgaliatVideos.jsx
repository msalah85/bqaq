import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import Link from 'next/link'
import DetailsCard from '../../../reusable/detailsCard/DetailsCard';

export default function ElgaliatVideos(props) {

    return (
        <div className='galiatVideos fade-in'>

            {
                Array.isArray(props.videosData) && props?.videosData.map((item, index) => {
                    return (
                        <div style={{ height: 'fit-content' }} key={index}>
                            <DetailsCard
                                title={item.title}
                                subtitle={item.sheikhName}
                                video={item.url || 'no video'}
                            />
                        </div>
                    )
                })
            }

        </div>
    )
}
