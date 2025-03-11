import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./FilterModal.module.css";

const FilterModal = ({ isOpen, onClose, headers, onApply, currentFilters }) => {
  const [sortOrder, setSortOrder] = useState(currentFilters.sortOrder || "asc");
  const [facultyFilter, setFacultyFilter] = useState(
    currentFilters.faculty || []
  );
  const [fileTypeFilter, setFileTypeFilter] = useState(
    currentFilters.fileType || []
  );

  const handleCheckboxChange = (filterType, value) => {
    if (filterType === "Faculty") {
      setFacultyFilter((prevState) =>
        prevState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value]
      );
    } else if (filterType === "File Type") {
      setFileTypeFilter((prevState) =>
        prevState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value]
      );
    }
  };

  const handleApply = () => {
    onApply({ sortOrder, faculty: facultyFilter, fileType: fileTypeFilter });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Filter</h2>
          <button className={styles.closeIcon} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Sorting Options */}
        <div className={styles.sortOptions}>
          <h3>Sort By</h3>
          <div className={styles.filterLabelContainer}>
            <label className={styles.filterLabel}>
              <input
                type="radio"
                name="sortOrder"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={() => setSortOrder("asc")}
              />
              Ascending
            </label>
            <label className={styles.filterLabel}>
              <input
                type="radio"
                name="sortOrder"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={() => setSortOrder("desc")}
              />
              Descending
            </label>
          </div>
        </div>

        {/* Dynamic Field-specific Filters */}
        {headers.map((header) => {
          if (header.type === "dropdown" && header.options) {
            return (
              <div key={header.field} className={styles.fieldFilter}>
                <h3>{header.field}</h3>
                <div className={styles.filterLabelContainer}>
                  {header.options.map((option) => (
                    <label className={styles.filterLabel} key={option}>
                      <input
                        type="checkbox"
                        checked={
                          header.field === "Faculty"
                            ? facultyFilter.includes(option)
                            : header.field === "File Type" &&
                              fileTypeFilter.includes(option)
                        }
                        onChange={() =>
                          handleCheckboxChange(header.field, option)
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleApply} className={styles.applyButton}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
