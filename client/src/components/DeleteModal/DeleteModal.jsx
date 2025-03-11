// DeleteModal
import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ isOpen, onClose, onDelete, itemData }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Confirm Delete</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>Are you sure you want to delete the following item(s)?</p>
          <table className={styles.horizontalTable}>
            <thead>
              <tr>
                {Object.keys(itemData || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(itemData || {}).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
