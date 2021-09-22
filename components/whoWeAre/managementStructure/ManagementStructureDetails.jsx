import React, { useEffect } from 'react';
import PersonCard from './PersonCard';
// import { GET_EMPOLYEES } from '../../../redux/actions/who-we-are/index'
import { connect } from 'react-redux';

function ManagementStructureDetails(props) {

    return (
        <div className='managementStructure fade-in'>
            {
                (props.empolyees && props.empolyees.length > 0) ? props.empolyees.map(employee => {
                    return <PersonCard employeeData={employee} />
                }) : <div style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
            }


        </div>
    )
}
const mapStateToProps = (state) => {
    return { empolyees: state.whoWeAre?.containers?.whoWeAre?.administration };
};

export default connect(mapStateToProps, {})(ManagementStructureDetails);
