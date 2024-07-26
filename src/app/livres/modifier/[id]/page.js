"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getBook, updateBook } from "@/app/services/api";

const ModifierLivre = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

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
          setError("Failed to fetch book details");
          console.error("Failed to fetch book details", error);
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
      await updateBook(id, book);
      console.log("Book updated:", book);
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
