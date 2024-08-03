"use client";

import { getBook, updateBook } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const ModifierLivre = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const {category_id, setCategory_id}=useState()
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    status: "Disponible",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const bookData = await getBook(id);
          setBook(bookData);
        } catch (error) {
          setError("Erreur s'est produite");
          console.error("Erreurs'est produite", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, {
        title: book.book.title,
        author: book.book.author,
        description: book.book.description,
        datePub: book.book.datePub,
        category_id: book.book.category.id,  
        // status: book.book.status,
      });
      router.back();
    } catch (error) {
      console.error("Failed to update book", error);
      setError("Failed to update book");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              value={book.book.title}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Auteur
            <input
              type="text"
              name="author"
              value={book.book.author}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Catégorie
            <input
              type="text"
              name="category"
              value={book.book.category.name}
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
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.button}
          >
            Annuler
          </button>
          <button type="submit" className={styles.button}>
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifierLivre;
