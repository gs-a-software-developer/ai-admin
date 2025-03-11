// AddModal
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import styles from "./AddModal.module.css";

const Dropdown = ({
  field,
  value,
  options,
  onSelect,
  isOpen,
  toggleDropdown,
}) => (
  <div className={styles.inputField}>
    <label>{field}</label>
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={() => toggleDropdown(field)}
      >
        {value || "Select..."}{" "}
        {isOpen ? (
          <FaChevronUp className={styles.caretIcon} />
        ) : (
          <FaChevronDown className={styles.caretIcon} />
        )}
      </button>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`${styles.dropdownItem} ${
                value === option ? styles.selected : ""
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const AddModal = ({ isOpen, onClose, onAdd, headers }) => {
  const [newItem, setNewItem] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (e, field) => {
    setNewItem((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    onAdd(newItem);
    onClose();
  };

  const toggleDropdown = (field) =>
    setOpenDropdown(openDropdown === field ? null : field);
  const handleDropdownSelect = (field, option) => {
    setNewItem((prev) => ({ ...prev, [field]: option }));
    setOpenDropdown(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add New Item</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.inputFields}>
          {headers.map(({ field, type, options }, idx) => {
            if (type === "autogenerate") {
              return (
                <div key={idx} className={styles.inputField}>
                  <label>{field}</label>
                  <input type="text" value="Auto-generated" disabled />
                </div>
              );
            }
            if (type === "dropdown") {
              return (
                <Dropdown
                  key={idx}
                  field={field}
                  value={newItem[field]}
                  options={options}
                  isOpen={openDropdown === field}
                  toggleDropdown={toggleDropdown}
                  onSelect={(option) => handleDropdownSelect(field, option)}
                />
              );
            }
            return (
              <div key={idx} className={styles.inputField}>
                <label>{field}</label>
                <input
                  type="text"
                  value={newItem[field] || ""}
                  onChange={(e) => handleChange(e, field)}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.addButton} onClick={handleSubmit}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
