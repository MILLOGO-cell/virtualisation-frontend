"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getClient, updateClient } from "@/app/services/api";

const ModifierClient = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const initialClient = {
    firstName: "",
    lastName: "",
    createdDate: "",
    phone: "",
  };

  const [client, setClient] = useState(initialClient);

  useEffect(() => {
    if (id) {
      const fetchClientDetails = async () => {
        try {
          const clientData = await getClient(id);
          setClient(clientData);
        } catch (error) {
          console.error("Failed to fetch client details", error);
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
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Modifier le Client</h1>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Prénom
            <input
              type="text"
              name="firstName"
              value={client.firstName}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Nom
            <input
              type="text"
              name="lastName"
              value={client.lastName}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Téléphone
            <input
              type="text"
              name="phone"
              value={client.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <input type="hidden" name="createdDate" value={client.createdDate} />
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
