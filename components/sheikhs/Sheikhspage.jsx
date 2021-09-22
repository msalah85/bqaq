import React, { useEffect } from 'react';
import SheikhSidebar from './SheikhSidebar';
import SheikhDetails from './SheikhDetails';
import { GET_ALL_SHEIKHS } from '../../redux/actions/lessons/index';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function Sheikhspage(props) {
    const router = useRouter();
    useEffect(() => {
        if (router.query?.id) {
            props.GET_ALL_SHEIKHS();
            // props.GET_SHEIKH_DETAILS({ sheikhId: router.query?.id });
        }
    }, [router.query.id])
    return (
        <div className='sheikhs general-container'>
            <SheikhSidebar breadcrumbs={[{ name: 'الدروس', url: '/lessons' }, { name: props.sheikhDetails?.name, url: '/sheikh/1' }]} allSheikhs={props.allSheikhs} />
            <div className='sheikhs__body'>
                <SheikhDetails sheikhDetails={props.sheikhDetails} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { allSheikhs: state.lessons.allSheikhs };
};

export default connect(mapStateToProps, { GET_ALL_SHEIKHS })(Sheikhspage);