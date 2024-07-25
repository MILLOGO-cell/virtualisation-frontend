"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const DetailLivre = () => {
    const { id } = useParams();
    const router = useRouter();

    // Données statiques pour les détails du livre
    const staticBooks = {
        1: { id: 1, title: 'Livre 1', author: 'Auteur 1', category: 'Catégorie 1', status: 'Disponible' },
        2: { id: 2, title: 'Livre 2', author: 'Auteur 2', category: 'Catégorie 2', status: 'Emprunté' },
        // Ajoutez d'autres livres ici si nécessaire
    };

    const [book, setBook] = useState(null);

    useEffect(() => {
        if (id) {
            const bookDetails = staticBooks[id];
            if (bookDetails) {
                setBook(bookDetails);
            } else {
                setBook(null); // Livre non trouvé
            }
        }
    }, [id]);

    if (!book) return <div>Livre non trouvé</div>;

    return (
        <div className={styles.containerWrapper}>
        <div className={styles.container}>
            <h1 className={styles.title}>Détails du Livre</h1>
            <p className={styles.text}><strong>Titre:</strong> {book.title}</p>
            <p className={styles.text}><strong>Auteur:</strong> {book.author}</p>
            <p className={styles.text}><strong>Catégorie:</strong> {book.category}</p>
            <p className={styles.text}><strong>État:</strong> {book.status}</p>
            <button onClick={() => router.back()} className={styles.button}>Retour</button>
        </div>
        </div>
    );
};

export default DetailLivre;
