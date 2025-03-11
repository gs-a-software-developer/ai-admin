// EditModal.js
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./EditModal.module.css";

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

const EditModal = ({ isOpen, onClose, onSave, itemData, headers }) => {
  const [editedItem, setEditedItem] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setEditedItem(itemData || {});
  }, [itemData]);

  const handleChange = (e, field) => {
    setEditedItem((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDropdownSelect = (field, option) => {
    setEditedItem((prev) => ({ ...prev, [field]: option }));
    setOpenDropdown(null);
  };

  const toggleDropdown = (field) =>
    setOpenDropdown(openDropdown === field ? null : field);

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit Item</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.inputFields}>
          {headers.map(({ field, type, options }, idx) => {
            if (type === "autogenerate") {
              return (
                <div key={idx} className={styles.inputField}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={editedItem[field] || "Auto-generated"}
                    disabled
                  />
                </div>
              );
            }
            if (type === "dropdown") {
              return (
                <Dropdown
                  key={idx}
                  field={field}
                  value={editedItem[field]}
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
                  value={editedItem[field] || ""}
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
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
