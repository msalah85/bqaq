import React, { useEffect, useState } from 'react'
import AboutSheikh from './AboutSheikh'
import SheikhDetailsSidebar from './SheikhDetailsSidebar'
import { GET_ALL_SHEIKHS } from '../../redux/actions/lessons/index'
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function SheikhDetailsPage(props) {

    const router = useRouter();

    const [selectedItem, setSelectedItem] = useState({ id: 'students', name: 'طلابه' });

    useEffect(() => {
        props.GET_ALL_SHEIKHS();
    }, [router.query.id]);

    return (
        <div className='sheikhs general-container'>

            <SheikhDetailsSidebar breadcrumbs={[{ name: 'الدروس', url: '/lessons' }, { name: props.sheikhDetails?.name, url: '/sheikh/1' }]} selectedItem={selectedItem} setSelectedItem={(item) => setSelectedItem(item)} />

            <div className='sheikhs__body' >
                <AboutSheikh selectedItem={selectedItem} dataToShow={props.sheikhDetails && props.sheikhDetails[selectedItem.id]} />
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { GET_ALL_SHEIKHS })(SheikhDetailsPage);