"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import ConfirmationModal from "@/components/confirmation/confirmationModal";
import { useRouter } from "next/navigation";
import { getClients, createClient, deleteClient } from "@/app/services/api";

export default function Clients() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [newClient, setNewClient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clients = await getClients();
        setClients(clients);
      } catch (error) {
        console.error("Failed to load clients", error);
      }
    };
    loadClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(search.toLowerCase()) ||
      client.lastName.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search)
  );

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewClient({ firstName: "", lastName: "", phone: "" });
  };

  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteClient(clientToDelete.id);
      setClients(clients.filter((client) => client.id !== clientToDelete.id));
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete client", error);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      const newClientData = await createClient(newClient);
      setClients([...clients, newClientData]);
      closeAddModal();
    } catch (error) {
      console.error("Failed to add client", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Liste des Clients</title>
        <meta name="description" content="Page de gestion des clients" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Liste des Clients</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.controls}>
          <button onClick={openAddModal} className={styles.button}>
            Ajouter un Client
          </button>
          <div className={styles.controlsInput}>
            <input
              type="text"
              placeholder="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date de Création</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.createdDate}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.viewButton}`}
                    onClick={() => router.push(`/clients/${client?.id}`)}
                  >
                    Voir
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() =>
                      router.push(`/clients/modifier/${client?.id}`)
                    }
                  >
                    Modifier
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => openDeleteModal(client)}
                  >
                    Supprimer
                  </button>
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
              <h2>Ajouter un Client</h2>
              <form onSubmit={handleAddClient}>
                <label>
                  Prénom
                  <input
                    type="text"
                    name="firstName"
                    value={newClient.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Nom
                  <input
                    type="text"
                    name="lastName"
                    value={newClient.lastName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Téléphone
                  <input
                    type="text"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleChange}
                  />
                </label>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className={styles.closeButton}
                  >
                    Annuler
                  </button>
                  <button type="submit" className={styles.saveButton}>
                    Enregistrer
                  </button>
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
