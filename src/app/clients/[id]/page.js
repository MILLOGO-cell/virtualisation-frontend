"use client";

import { getClient } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const DetailClient = () => {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchClientDetails = async () => {
        try {
          const clientData = await getClient(id);
          setClient(clientData);
          console.log(client)
        } catch (error) {
          setError("Failed to fetch client details");
          console.error("Failed to fetch client details", error);
        } finally {
          setLoading(false);
        }
      };

      fetchClientDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!client) return <div>Client non trouvé</div>;

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Détails du Client</h1>
        <p className={styles.text}>
          <strong>Prénom:</strong> {client.firstname}
        </p>
        <p className={styles.text}>
          <strong>Nom:</strong> {client.lastname}
        </p>
        <p className={styles.text}>
          <strong>Date de naissance:</strong> {client.birthday}
        </p>
       
        <button onClick={() => router.back()} className={styles.button}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default DetailClient;
