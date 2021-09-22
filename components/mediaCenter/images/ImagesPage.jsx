import React from 'react'
import DetailsCard from '../../../reusable/detailsCard/DetailsCard'
import { connect } from 'react-redux';

function ImagesPage(props) {
    return (
        <div className='imagesSection fade-in'>
            {
                props.imagesData?.map((image, index) => {
                    return (
                        <div style={{ height: 'fit-content' }} key={index}>
                            <DetailsCard title={image.title} subtitle='20/10/2021' fallbackImg='/assets/fallbacks/news-fallback-image.png' img={image.imageUrl} />
                        </div>
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return { imagesData: state.mediaCenter?.pageData?.containers?.images };
};

export default connect(mapStateToProps, {})(ImagesPage);