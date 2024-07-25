"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const ModifierLivre = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    
    const initialBook = {
        title: 'Titre du Livre',
        author: 'Auteur du Livre',
        category: 'Catégorie du Livre',
        status: 'Disponible'
    };
    
    const [book, setBook] = useState(initialBook);

    useEffect(() => {
        // Simuler la récupération des données statiques en fonction de l'ID
        if (id) {
            const fetchBookDetails = async () => {
                // Ici, nous utilisons des données statiques au lieu de faire une requête API
                const staticData = {
                    1: { title: 'Livre 1', author: 'Auteur 1', category: 'Catégorie 1', status: 'Disponible' },
                    2: { title: 'Livre 2', author: 'Auteur 2', category: 'Catégorie 2', status: 'Emprunté' },
                    // Ajoutez plus de livres si nécessaire
                };
                setBook(staticData[id] || initialBook);
            };

            fetchBookDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour mettre à jour les détails du livre (actuellement juste une console log)
        console.log('Livre mis à jour:', book);
        router.back();
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Modifier le Livre</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Titre
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Auteur
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        Catégorie
                        <input
                            type="text"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <label className={styles.label}>
                        État
                        <select
                            name="status"
                            value={book.status}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="Disponible">Disponible</option>
                            <option value="Emprunté">Emprunté</option>
                        </select>
                    </label>
                    <button type="button" onClick={() => router.back()} className={styles.button}>Annuler</button>
                    <button type="submit" className={styles.button}>Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default ModifierLivre;
