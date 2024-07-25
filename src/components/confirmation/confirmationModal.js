import React from 'react';
import styles from './confirmationModal.module.css'


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Confirmation</h2>
                <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                <div className={styles.buttons}>
                    <button className={styles.confirmButton} onClick={onConfirm}>Confirmer</button>
                    <button className={styles.cancelButton} onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
