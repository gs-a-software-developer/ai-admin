// TableControls.js
import React from "react";
import {
  UploadSimple,
  DownloadSimple,
  Trash,
  FunnelSimple,
  Plus,
} from "@phosphor-icons/react";
import styles from "../Table/Table.module.css";

const TableControls = ({
  searchTerm,
  onSearch,
  onOpenModal,
  onResetFilters,
  selectedItems,
}) => (
  <div className={styles.controls}>
    <div className={styles.leftControls}>
      <button className={`${styles.actionButton} ${styles.blueBorderButton}`}>
        <UploadSimple size={16} /> Export
      </button>
      <button className={`${styles.actionButton} ${styles.blueBorderButton}`}>
        <DownloadSimple size={16} /> Import
      </button>
      <button
        className={`${styles.actionButton} ${styles.deleteButton}`}
        disabled={!selectedItems.length}
        onClick={() => onOpenModal("delete", true)}
      >
        <Trash size={16} /> Delete
      </button>
    </div>
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onSearch}
        className={styles.searchInput}
      />
    </div>
    <div className={styles.rightControls}>
      <button
        className={`${styles.actionButton} ${styles.lightBlueButton}`}
        onClick={() => onOpenModal("filter", true)}
      >
        <FunnelSimple size={16} /> Filter
      </button>
      <button
        className={`${styles.actionButton} ${styles.lightBlueButton}`}
        onClick={onResetFilters}
      >
        Reset
      </button>
      <button
        className={`${styles.actionButton} ${styles.addButton}`}
        onClick={() => onOpenModal("add", true)}
      >
        <Plus size={16} /> Add New
      </button>
    </div>
  </div>
);

export default TableControls;