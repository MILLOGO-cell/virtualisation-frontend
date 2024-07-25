"use client"

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Head from 'next/head';
import ConfirmationModal from '@/components/confirmation/confirmationModal';
import { useRouter } from 'next/navigation';

// Exemple de données
const initialBooks = [
    { id: 1, title: 'Livre 1', author: 'Auteur 1', category: 'Catégorie 1', status: 'Disponible' },
    { id: 2, title: 'Livre 2', author: 'Auteur 2', category: 'Catégorie 2', status: 'Emprunté' },
];

export default function Livres() {
    const router = useRouter();
    const [books, setBooks] = useState(initialBooks);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // const [newBook, setNewBook] = useState({ title: '', author: '', category: '', status: '' });
    const [bookToDelete, setBookToDelete] = useState(null);

    // Fonction pour filtrer les livres
    const filteredBooks = books.filter(book =>
        (book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.category.toLowerCase().includes(search.toLowerCase())) &&
        (filter === '' || book.author.toLowerCase().includes(filter.toLowerCase()) ||
            book.category.toLowerCase().includes(filter.toLowerCase()) ||
            book.status.toLowerCase().includes(filter.toLowerCase()))
    );

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewBook({ title: '', author: '', category: '', status: '' }); // Réinitialiser le formulaire
    };

    const openDeleteModal = (book) => {
        setBookToDelete(book);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
    };

    const handleConfirmDelete = () => {
        // Logique pour supprimer le livre
        setBooks(books.filter(book => book.id !== bookToDelete.id));
        closeDeleteModal();
    };

    const handleAddBook = (e) => {
        e.preventDefault();
        const newId = books.length ? Math.max(books.map(book => book.id)) + 1 : 1;
        setBooks([...books, { ...newBook, id: newId }]);
        closeAddModal();
    };

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        status: 'Disponible'  // État par défaut
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Liste des Livres</title>
                <meta name="description" content="Page de gestion des livres" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1>Liste des Livres</h1>
            </header>

            <main className={styles.main}>
                <div className={styles.controls}>
                    <button onClick={openAddModal} className={styles.button}>Ajouter un Livre</button>
                    <div className={styles.controlsInput}>
                        <input
                            type="text"
                            placeholder="Rechercher et filtrer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                        <input
                            type="text"
                            placeholder="Filtrer par Auteur, Catégorie ou État"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>{book.status}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.viewButton}`} onClick={() => router.push(`/livres/${book.id}`)}>Voir</button>
                                    <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => router.push(`/livres/modifier/${book.id}`)}>Modifier</button>
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => openDeleteModal(book)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    {/* Pagination à ajouter ici */}
                </div>

                {isAddModalOpen && (
                    <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Ajouter un Livre</h2>
                        <form onSubmit={handleAddBook}>
                            <label>
                                Titre
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Auteur
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Catégorie
                                <input
                                    type="text"
                                    name="category"
                                    value={newBook.category}
                                    onChange={handleChange}
                                />
                            </label>
                            {/* Champ état masqué ou en lecture seule */}
                            <input
                                type="hidden"
                                name="status"
                                value={newBook.status}
                            />
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