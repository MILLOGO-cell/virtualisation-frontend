"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const DetailClient = () => {
    const { id } = useParams();
    const router = useRouter();

    // Données statiques pour les détails du client
    const staticClients = {
        1: { id: 1, firstName: 'John', lastName: 'Doe', createdDate: '2024-01-15', phone: '+123456789' },
        2: { id: 2, firstName: 'Jane', lastName: 'Smith', createdDate: '2024-02-20', phone: '+987654321' },
        // Ajoutez d'autres clients ici si nécessaire
    };

    const [client, setClient] = useState(null);

    useEffect(() => {
        if (id) {
            const clientDetails = staticClients[id];
            if (clientDetails) {
                setClient(clientDetails);
            } else {
                setClient(null); // Client non trouvé
            }
        }
    }, [id]);

    if (!client) return <div>Client non trouvé</div>;

    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Détails du Client</h1>
                <p className={styles.text}><strong>Prénom:</strong> {client.firstName}</p>
                <p className={styles.text}><strong>Nom:</strong> {client.lastName}</p>
                <p className={styles.text}><strong>Date de Création:</strong> {client.createdDate}</p>
                <p className={styles.text}><strong>Téléphone:</strong> {client.phone}</p>
                <button onClick={() => router.back()} className={styles.button}>Retour</button>
            </div>
        </div>
    );
};

export default DetailClient;
