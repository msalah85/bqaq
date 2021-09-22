import React from 'react'
import { connect } from 'react-redux'
import WhoWeAreSidebar from '../whoWeAreSidebar/WhoWeAreSidebar'
import WhoWeAreDetails from './WhoWeAreDetails'

function WhoWeAre(props) {
    return (
        <div className='whoWeAre general-container'>
            <WhoWeAreSidebar breadcrumbs={[{ name: 'من نحن', url: '/who-we-are' }]} />
            <div className='whoWeAre__body'>
                <WhoWeAreDetails whoWeAreData={props.whoWeAreData} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { whoWeAreData: state.whoWeAre };
};

export default connect(mapStateToProps, {})(WhoWeAre);