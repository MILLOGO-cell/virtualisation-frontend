"use client";

import { getCategory, updateCategory } from '@/app/services/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const ModifierCategorie = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const initialCategory = {
        name: '',
    };

    const [category, setCategory] = useState(initialCategory);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchCategoryDetails = async () => {
                try {
                    const categoryData = await getCategory(id);
                    setCategory(categoryData);
                } catch (error) {
                    console.error("Failed to fetch category details", error);
                    setError("Failed to fetch category details");
                }
            };

            fetchCategoryDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory(id, category);
            router.back();
        } catch (error) {
            console.error("Failed to update category", error);
            setError("Failed to update category");
        }
    };

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Modifier la Catégorie</h1>
                {error && <p className={styles.error}>{error}</p>}
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
