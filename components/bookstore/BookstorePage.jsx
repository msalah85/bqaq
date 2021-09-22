import React, { useEffect, useState } from 'react';
import BookstoreDetails from './BookstoreDetails';
import BookstoreSidebar from './BookstoreSidebar';
import { GET_BOOKSTORE } from '../../redux/actions/bookstore/index';
import { connect } from 'react-redux';
function BookstorePage(props) {

    const [pageFilters, setPageFilters] = useState({
        languageId: null,
    });

    useEffect(() => {
        props.GET_BOOKSTORE();
    }, []);

    useEffect(() => {
        console.log(props.bookStore, pageFilters);
    }, [props.bookStore]);

    return (
        <div className='lessons general-container'>

            <BookstoreSidebar
                breadcrumbs={[{ name: 'المكتبة', url: '/bookstore' }]}
                pageFiltersController={{ pageFilters, setPageFilters }}
                books={props.bookStore}
            />

            <div className='lessons__body'>
                <BookstoreDetails pageFiltersController={{ pageFilters, setPageFilters }} books={props.bookStore} />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return { bookStore: state.bookStore?.books };
};

export default connect(mapStateToProps, { GET_BOOKSTORE })(BookstorePage);