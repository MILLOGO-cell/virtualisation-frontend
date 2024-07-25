"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const ModifierClient = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    
    const initialClient = {
        firstName: 'Prénom du Client',
        lastName: 'Nom du Client',
        createdDate: '',  // Date de création gérée par le backend
        phone: 'Téléphone du Client'
    };
    
    const [client, setClient] = useState(initialClient);

    useEffect(() => {
        // Simuler la récupération des données statiques en fonction de l'ID
        if (id) {
            const fetchClientDetails = async () => {
                // Ici, nous utilisons des données statiques au lieu de faire une requête API
                const staticData = {
                    1: { firstName: 'John', lastName: 'Doe', createdDate: '2024-01-15', phone: '+123456789' },
                    2: { firstName: 'Jane', lastName: 'Smith', createdDate: '2024-02-20', phone: '+987654321' },
                    // Ajoutez plus de clients si nécessaire
                };
                setClient(staticData[id] || initialClient);
            };

            fetchClientDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour mettre à jour les détails du client (actuellement juste une console log)
        console.log('Client mis à jour:', client);
        router.back();
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
                    {/* Date de création est gérée par le backend et ne peut pas être modifiée */}
                    <input
                        type="hidden"
                        name="createdDate"
                        value={client.createdDate}
                    />
                    <button type="button" onClick={() => router.back()} className={styles.button}>Annuler</button>
                    <button type="submit" className={styles.button}>Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default ModifierClient;
