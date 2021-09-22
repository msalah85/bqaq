import React, { useEffect, useState } from 'react'
import BookDetails from './BookDetails'
import BookSidebar from './BookSidebar'
// import { GET_BOOK_DETAILS } from '../../../redux/actions/bookstore/index';
// import { connect } from 'react-redux';
// import { useRouter } from 'next/router';

export default function BookPage(props) {
    // const router = useRouter();

    // useEffect(() => {
    //     router.query?.id && props.GET_BOOK_DETAILS({ bookId: router.query.id });
    // }, [router.query.id]);

    return (
        <div className='lessons general-container'>
            <BookSidebar breadcrumbs={[{ name: 'المكتبة', url: '/bookstore' }, { name: props.bookDetailsData?.bookName, url: '/bookstore' }]} bookDetails={props.bookDetailsData} />
            <div className='lessons__body'>
                <BookDetails bookDetails={props.bookDetailsData} />
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return { bookDetailsData: state.bookStore?.bookDetailsData };
// };

// export default connect(mapStateToProps, { GET_BOOK_DETAILS })(BookPage);
