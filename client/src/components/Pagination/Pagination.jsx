// Pagination.js
import React from "react";
import styles from "../Table/Table.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className={styles.pagination}>
    <button
      className={`${styles.pageButton} ${
        currentPage === 1 ? styles.disabled : ""
      }`}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className={styles.pageInfo}>
      Page {currentPage} of {totalPages}
    </span>
    <button
      className={`${styles.pageButton} ${
        currentPage === totalPages ? styles.disabled : ""
      }`}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
