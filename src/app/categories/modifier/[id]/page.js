"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const ModifierCategorie = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    
    const initialCategory = {
        name: 'Nom de la Catégorie'
    };
    
    const [category, setCategory] = useState(initialCategory);

    useEffect(() => {
        // Simuler la récupération des données statiques en fonction de l'ID
        if (id) {
            const fetchCategoryDetails = async () => {
                // Ici, nous utilisons des données statiques au lieu de faire une requête API
                const staticData = {
                    1: { name: 'Catégorie 1' },
                    2: { name: 'Catégorie 2' },
                    // Ajoutez plus de catégories si nécessaire
                };
                setCategory(staticData[id] || initialCategory);
            };

            fetchCategoryDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour mettre à jour les détails de la catégorie (actuellement juste une console log)
        console.log('Catégorie mise à jour:', category);
        router.back();
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Modifier la Catégorie</h1>
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Nom
                        <input
                            type="text"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                    <button type="button" onClick={() => router.back()} className={styles.button}>Annuler</button>
                    <button type="submit" className={styles.button}>Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default ModifierCategorie;
