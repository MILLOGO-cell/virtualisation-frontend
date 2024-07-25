"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Head from 'next/head';
import ConfirmationModal from '@/components/confirmation/confirmationModal';
import { useRouter } from 'next/navigation';

// Exemple de données
const initialCategories = [
    { id: 1, name: 'Catégorie 1' },
    { id: 2, name: 'Catégorie 2' },
];

export default function Categories() {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Fonction pour filtrer les catégories
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewCategory({ name: '' }); // Réinitialiser le formulaire
    };

    const openDeleteModal = (category) => {
        setCategoryToDelete(category);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
    };

    const handleConfirmDelete = () => {
        // Logique pour supprimer la catégorie
        setCategories(categories.filter(category => category.id !== categoryToDelete.id));
        closeDeleteModal();
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        const newId = categories.length ? Math.max(categories.map(category => category.id)) + 1 : 1;
        setCategories([...categories, { ...newCategory, id: newId }]);
        closeAddModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Liste des Catégories</title>
                <meta name="description" content="Page de gestion des catégories" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1>Liste des Catégories</h1>
            </header>

            <main className={styles.main}>
                <div className={styles.controls}>
                    <button onClick={openAddModal} className={styles.button}>Ajouter une Catégorie</button>
                    <div className={styles.controlsInput}>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => router.push(`/categories/modifier/${category.id}`)}>Modifier</button>
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => openDeleteModal(category)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isAddModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>Ajouter une Catégorie</h2>
                            <form onSubmit={handleAddCategory}>
                                <label>
                                    Nom
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCategory.name}
                                        onChange={handleChange}
                                    />
                                </label>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={closeAddModal} className={styles.closeButton}>Annuler</button>
                                    <button type="submit" className={styles.saveButton}>Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isDeleteModalOpen && (
                    <ConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        onConfirm={handleConfirmDelete}
                    />
                )}
            </main>

            <footer className={styles.footer}>
                <p>&copy; 2024 Gestion de Bibliothèque. Tous droits réservés.</p>
            </footer>
        </div>
    );
}
