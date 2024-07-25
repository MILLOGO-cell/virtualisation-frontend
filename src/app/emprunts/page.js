"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Head from 'next/head';

// Exemple de données
const initialBooks = [
    { id: 1, title: 'Livre 1', author: 'Auteur 1', category: 'Catégorie 1', status: 'Disponible' },
    { id: 2, title: 'Livre 2', author: 'Auteur 2', category: 'Catégorie 2', status: 'Emprunté' },
    { id: 3, title: 'Livre 3', author: 'Auteur 3', category: 'Catégorie 3', status: 'Emprunté' },
];

export default function Emprunts() {
    const [books, setBooks] = useState(initialBooks);
    const [search, setSearch] = useState('');

    // Fonction pour filtrer les livres empruntés
    const borrowedBooks = books.filter(book => book.status === 'Emprunté' &&
        (book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.category.toLowerCase().includes(search.toLowerCase())));

    return (
        <div className={styles.container}>
            <Head>
                <title>Liste des Emprunts</title>
                <meta name="description" content="Page de gestion des emprunts" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1>Liste des Emprunts</h1>
            </header>

            <main className={styles.main}>
                <div className={styles.controls}>
                    <div className={styles.controlsInput}>
                        <input
                            type="text"
                            placeholder="Rechercher"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Catégorie</th>
                            <th>État</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedBooks.length > 0 ? (
                            borrowedBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Aucun livre emprunté</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2024 Gestion de Bibliothèque. Tous droits réservés.</p>
            </footer>
        </div>
    );
}
