"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Head from 'next/head';

// Exemple de données
const initialAuthors = [
    { id: 1, name: 'Auteur 1' },
    { id: 2, name: 'Auteur 2' },
    { id: 3, name: 'Auteur 3' },
    // Ajoutez plus d'auteurs si nécessaire
];

export default function Auteurs() {
    const [authors, setAuthors] = useState(initialAuthors);
    const [search, setSearch] = useState('');

    // Filtrer les auteurs en fonction de la recherche
    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <Head>
                    <title>Liste des Auteurs</title>
                    <meta name="description" content="Page de gestion des auteurs" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <header className={styles.header}>
                    <h1>Liste des Auteurs</h1>
                </header>

                <main className={styles.main}>
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Rechercher un auteur"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.authorsList}>
                        {filteredAuthors.length > 0 ? (
                            filteredAuthors.map((author) => (
                                <div key={author.id} className={styles.authorItem}>
                                    {author.name}
                                </div>
                            ))
                        ) : (
                            <p>Aucun auteur trouvé</p>
                        )}
                    </div>
                </main>

            </div>
                <footer className={styles.footer}>
                    <p>&copy; 2024 Gestion de Bibliothèque. Tous droits réservés.</p>
                </footer>
        </div>
    );
}
