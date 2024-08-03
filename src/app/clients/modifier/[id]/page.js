"use client";

import { getClient, updateClient } from "@/app/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const ModifierClient = () => {
  const router = useRouter();
  const { id } = useParams();

  const initialClient = {
    firstname: "",
    lastname: "",
    birthday: "",
  };

  const [client, setClient] = useState(initialClient);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchClientDetails = async () => {
        try {
          const clientData = await getClient(id);
          setClient(clientData);
        } catch (error) {
          console.error("Failed to fetch client details", error);
          setError("Failed to fetch client details");
        }
      };

      fetchClientDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(id, client);
      router.back();
    } catch (error) {
      console.error("Failed to update client", error);
      setError("Failed to update client");
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Modifier le Client</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Prénom
            <input
              type="text"
              name="firstname"
              value={client.firstname}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Nom
            <input
              type="text"
              name="lastname"
              value={client.lastname}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Date de naissance
            <input
              type="date"
              name="birthday"
              value={client.birthday}
              onChange={handleChange}
              className={styles.input}
            />
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

export default ModifierClient;
