import Link from 'next/link'
import React from 'react'
import DetailsCard from '../../../reusable/detailsCard/DetailsCard'
import { connect } from 'react-redux';

function ReportsPage(props) {
    return (
        <div className='imagesSection fade-in'>
            {
                props.reportsData?.map((report, index) => {
                    return (
                        <Link href={`/media-center/reports/${report.postId}`} key={index}>
                            <a style={{ height: 'fit-content' }}>
                                <DetailsCard title={report.title} subtitle='20/10/2021' fallbackImg='/assets/fallbacks/news-fallback-image.png' img={report.coverUrl} />
                            </a>
                        </Link>
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return { reportsData: state.mediaCenter?.pageData?.containers?.reports };
};

export default connect(mapStateToProps, {})(ReportsPage);