"use client";

import { createClient, deleteClient, getClients } from "@/app/services/api";
import ConfirmationModal from "@/components/confirmation/confirmationModal";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Clients() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
  });

  const loadClients = async () => {
    setLoading(true);
    try {
      const clients = await getClients();
      setClients(clients);
    } catch (error) {
      console.error("Failed to load clients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients(); // Charge les clients lors du premier rendu
  }, []);

  // Applique le filtre seulement si les données sont chargées
  const filteredClients = !loading
  ? clients.filter((client) => {
      // Vérifie que les propriétés existent et sont des chaînes de caractères
      const firstname = client?.firstname || "";
      const lastname = client?.lastname || "";
      const birthday = client?.birthday || "";

      return (
        firstname.toLowerCase().includes(search.toLowerCase()) ||
        lastname.toLowerCase().includes(search.toLowerCase()) ||
        birthday.includes(search)
      );
    })
  : [];

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewClient({ firstname: "", lastname: "", birthday: "" });
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
      await createClient(newClient);
      loadClients(); // Recharge les clients après ajout
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
        {loading ? (
          <div className={styles.loader}>Chargement...</div>
        ) : (
          <>
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
                  <th>Date de naissance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.firstname}</td>
                      <td>{client.lastname}</td>
                      <td>{client.birthday}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noData}>
                      Aucune donnée disponible
                    </td>
                  </tr>
                )}
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
                        name="firstname"
                        value={newClient.firstname}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Nom
                      <input
                        type="text"
                        name="lastname"
                        value={newClient.lastname}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Date de naissance
                      <input
                        type="date"
                        name="birthday"
                        value={newClient.birthday}
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
          </>
        )}
      </main>
  
      <footer className={styles.footer}>
        <p>&copy; 2024 Gestion de Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
