"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getBook } from "@/app/services/api";

const DetailLivre = () => {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Livre non trouvé</div>;

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Détails du Livre</h1>
        <p className={styles.text}>
          <strong>Titre:</strong> {book.title}
        </p>
        <p className={styles.text}>
          <strong>Auteur:</strong> {book.author}
        </p>
        <p className={styles.text}>
          <strong>Catégorie:</strong> {book.category}
        </p>
        <p className={styles.text}>
          <strong>État:</strong> {book.status}
        </p>
        <button onClick={() => router.back()} className={styles.button}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default DetailLivre;
