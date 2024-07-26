"use client";

import React, { useEffect, useState } from 'react';
import { getBooks } from '../service/api';

const BooksPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooks();
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BooksPage;
