import React, { Fragment } from 'react'
import WhoWeAreSidebar from '../whoWeAreSidebar/WhoWeAreSidebar'
import ScientistPraiseCard from './ScientistPraiseCard'
import { connect } from 'react-redux';

function ScientistPraise(props) {
    return (
        <div className='whoWeAre general-container'>
            <WhoWeAreSidebar breadcrumbs={[{ name: 'من نحن', url: '/who-we-are' }, { name: 'قالوا عنا', url: '/who-we-are/scientist-praise' }]} />
            <div className='whoWeAre__body fade-in' style={{ marginTop: '3rem' }}>
                {(props.scientistPraise && props.scientistPraise.length > 0) ? props.scientistPraise.map((scientistPraise, index) => {
                    return <Fragment key={index}>
                        <ScientistPraiseCard data={scientistPraise} />
                    </Fragment>
                }) : <div style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3', marginTop: '7rem' }}>لا توجد بيانات</div>
                }

                {/* <ScientistPraiseCard />
                <ScientistPraiseCard />
                <ScientistPraiseCard />
                <ScientistPraiseCard />
                <ScientistPraiseCard />
                <ScientistPraiseCard />
                <ScientistPraiseCard /> */}
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { scientistPraise: state.whoWeAre?.containers?.scientistPraise };
};

export default connect(mapStateToProps, {})(ScientistPraise);
