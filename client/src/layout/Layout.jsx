import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Welcome from "../components/Welcome/Welcome";
import Navbar from "../components/Navbar/Navbar";
import Role from "../components/Role/Role";
import TableComponent from "../components/TableComponent/TableComponent";
import Authentication from "../pages/Authentication/Authentication";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderTableRoute = (path, title, dataKey, uniqueKey) => (
    <Route
      path={path}
      element={
        <TableComponent title={title} dataKey={dataKey} uniqueKey={uniqueKey} />
      }
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {currentPath.startsWith("/authentication") ? <Welcome /> : <Navbar />}
      </div>
      <div className={styles.center}>
        <div className={styles.content}>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<Navigate to="/authentication/login" />} />
            <Route path="authentication" element={<Authentication />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Other Routes */}
            {renderTableRoute("ai-admin/files", "Files", "filesData", "ID")}
            {renderTableRoute(
              "ai-admin/students",
              "Students",
              "studentData",
              "ID"
            )}
            {renderTableRoute(
              "ai-admin/lecturers",
              "Lecturers",
              "lecturerData",
              "Staff Number"
            )}
            {renderTableRoute(
              "ai-admin/faculty",
              "Faculty",
              "facultyData",
              "Faculty ID"
            )}
            {renderTableRoute(
              "ai-admin/departments",
              "Department",
              "departmentData",
              "Department ID"
            )}
            {renderTableRoute(
              "ai-admin/courses",
              "Courses",
              "courseData",
              "Course ID"
            )}
            {renderTableRoute(
              "ai-admin/modules",
              "Modules",
              "moduleListData",
              "Module ID"
            )}
            {renderTableRoute(
              "ai-admin/campus",
              "Campus",
              "campusData",
              "Campus ID"
            )}
          </Routes>
        </div>
      </div>
      {currentPath.startsWith("/authentication") && (
        <div className={styles.sidebar}>
          <Role />
        </div>
      )}
    </div>
  );
};

export default Layout;
