import React, { Fragment } from 'react'
import WhoWeAreSidebar from '../whoWeAreSidebar/WhoWeAreSidebar'
import { connect } from 'react-redux';

function ProvidedServices(props) {
    return (
        <div className='whoWeAre general-container'>
            <WhoWeAreSidebar breadcrumbs={[{ name: 'الخدمات التي يقدمها الموقع', url: '/who-we-are' }]} />
            <div className='whoWeAre__body fade-in'>
                {(props.ProvidedServices && props.ProvidedServices.length > 0) ? props.ProvidedServices.map((service, index) => {
                    return <Fragment key={index}>
                        <div className='whoWeAreDetails__right__title'>{service.definition}</div>
                        <div className='whoWeAreDetails__right__desc'>{service.description}</div>
                    </Fragment>
                }) : <div style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3', marginTop: '10rem' }}>لا توجد بيانات</div>
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { ProvidedServices: state.whoWeAre?.containers?.whoWeAre?.service?.reverse() };
};

export default connect(mapStateToProps, {})(ProvidedServices);