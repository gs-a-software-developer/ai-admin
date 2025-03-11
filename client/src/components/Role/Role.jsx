// Role.jsx
import React, { useState, useEffect } from "react";
import { ChalkboardSimple, Student, Stack } from "@phosphor-icons/react";
import styles from "./Role.module.css";

const Role = () => {
  const [activeIcon, setActiveIcon] = useState("administrator");

  const handleIconClick = (icon, event) => {
    event.stopPropagation();
    setActiveIcon(icon);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${styles.iconWrapper}`) &&
        !event.target.closest(`.${styles.uploadButton}`)
      ) {
        setActiveIcon(null);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getIconColor = (icon) => {
    return activeIcon === icon ? "var(--color-secondary)" : "var(--color-muted)";
  };

  const getTextClass = (icon) => {
    return activeIcon === icon ? styles.activeText : "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <div
          className={`${styles.iconWrapper} ${
            activeIcon === "educator" ? styles.active : ""
          }`}
          onClick={(e) => handleIconClick("educator", e)}
        >
          <ChalkboardSimple
            color={getIconColor("educator")}
            size={40}
            weight="thin"
          />
          <span className={`${styles.iconText} ${getTextClass("educator")}`}>
            Educator
          </span>
        </div>
        <div
          className={`${styles.iconWrapper} ${
            activeIcon === "student" ? styles.active : ""
          }`}
          onClick={(e) => handleIconClick("student", e)}
        >
          <Student color={getIconColor("student")} size={40} weight="thin" />
          <span className={`${styles.iconText} ${getTextClass("student")}`}>
            Student
          </span>
        </div>
        <div
          className={`${styles.iconWrapper} ${
            activeIcon === "administrator" ? styles.active : ""
          }`}
          onClick={(e) => handleIconClick("administrator", e)}
        >
          <Stack color={getIconColor("administrator")} size={40} weight="thin" />
          <span
            className={`${styles.iconText} ${getTextClass("administrator")}`}
          >
            Administrator
          </span>
        </div>
      </div>
    </div>
  );
};

export default Role;
