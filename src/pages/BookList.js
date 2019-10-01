import React, { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const BookList = () => {
    const { books } = useContext(BooksContext);

    return books.length ? (
        books.map(book => {
            return(<div>{book.title}</div>);
        })
    )
    :
    (
        <p>No books to return</p>
    );
}

export default BookList;