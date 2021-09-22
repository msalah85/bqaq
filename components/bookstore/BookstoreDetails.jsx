import React from 'react'
import BookCard from './BookCard';

export default function BookstoreDetails(props) {

    return (
        <div className='bookstoreDetails fade-in'>

            {
                props.pageFiltersController?.pageFilters?.languageId && props.books ?
                    props.books.filter(book => book.languageId == props.pageFiltersController?.pageFilters?.languageId).map(book => (
                        <BookCard href='/bookstore/7' book={book} />
                    ))
                    :
                    props.books && props.books.map(book => (
                        <BookCard href={`/bookstore/${book.id}`} book={book} />
                    ))
            }

        </div>
    )
}
