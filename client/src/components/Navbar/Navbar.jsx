import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  Gear,
  SignOut,
  Books,
  Student,
  ChalkboardTeacher,
  Exam,
  Stack,
  BuildingOffice,
  Building,
  TreeStructure
} from "@phosphor-icons/react";
import { upgrade } from "../../assets";
import styles from "./Navbar.module.css";

// Reusable Nav Item Component
const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link to={to}>
        <div
          className={classNames(styles.link, { [styles.activeLink]: isActive })}
        >
          <Icon size={20} weight={isActive ? "regular" : "light"} className={styles.icon} />
          <div>{label}</div>
        </div>
      </Link>
    </li>
  );
};

// Upgrade Section
const UpgradeSection = () => (
  <div className={styles.upgradeSection}>
    <img src={upgrade} alt="Upgrade" className={styles.bottomImage} />
    <button className={styles.upgradeButton}>Upgrade</button>
  </div>
);

// Navbar Component
const Navbar = () => {
  const upperMenuItems = [
    { to: "/ai-admin/lecturers", icon: ChalkboardTeacher, label: "Lecturers" },
    { to: "/ai-admin/students", icon: Student, label: "Students" },
    { to: "/ai-admin/files", icon: Stack, label: "Files" },
    { to: "/ai-admin/faculty", icon: Building, label: "Faculty" },
    { to: "/ai-admin/departments", icon: TreeStructure, label: "Departments" },
    { to: "/ai-admin/courses", icon: Books, label: "Courses" },
    { to: "/ai-admin/modules", icon: Exam, label: "Module List" },
    { to: "/ai-admin/campus", icon: BuildingOffice, label: "Campus" },
  ];

  const bottomMenuItems = [
    { to: "/ai-admin/settings", icon: Gear, label: "Settings" },
    { to: "/", icon: SignOut, label: "Logout" },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <span className={styles.appName}>AI Tutor</span>
      </div>

      <ul className={styles.upperMenu}>
        {upperMenuItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>

      <ul className={styles.bottomMenu}>
        {/* <UpgradeSection /> */}
        {bottomMenuItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
