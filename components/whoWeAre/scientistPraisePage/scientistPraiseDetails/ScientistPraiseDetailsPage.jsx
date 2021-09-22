import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import ScientistPraiseDetailsSec from './ScientistPraiseDetailsSec'
import ScientistPraiseDetailsSidebar from './ScientistPraiseDetailsSidebar'
import { GET_PRAISE_DETAILS, CLEAN_PRAISE_DETAILS } from '../../../../redux/actions/who-we-are/index'
function ScientistPraiseDetails(props) {

    // const router = useRouter();
    // useEffect(() => {
    //     router.query?.id && props.GET_PRAISE_DETAILS(router.query.id)
    //     return () => {
    //         props.CLEAN_PRAISE_DETAILS()
    //     }
    // }, [router.query.id])

    return (
        <div className='scientistPraiseDetails general-container fade-in'>
            <ScientistPraiseDetailsSidebar praiseDetails={props.scientistPraiseDetails} />
            <ScientistPraiseDetailsSec praiseDetails={props.scientistPraiseDetails} />
        </div>
    )
}



// const mapStateToProps = (state) => {
//     return { scientistPraiseDetails: state.whoWeAre?.praiseDetails };
// };

// export default connect(mapStateToProps, { GET_PRAISE_DETAILS, CLEAN_PRAISE_DETAILS })(ScientistPraiseDetails);
export default ScientistPraiseDetails;