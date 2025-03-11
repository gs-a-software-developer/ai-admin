// Table
import React from "react";
import { PencilSimple } from "@phosphor-icons/react";
import styles from "./Table.module.css";

const Table = ({
  headers,
  data,
  uniqueKey,
  onEdit,
  onDelete,
  onToggleSelect,
}) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={() => {}} />
        </th>
        {headers.map((header) => (
          <th key={header.field}>{header.field}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((item) => (
          <tr key={item[uniqueKey]}>
            <td>
              <input
                type="checkbox"
                onChange={() => onToggleSelect(item[uniqueKey])}
              />
            </td>
            {headers.map((header) => (
              <td key={header.field}>{item[header.field] || "-"}</td>
            ))}
            <td>
              <PencilSimple
                size={16}
                onClick={() => onEdit(item)}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length + 2}>No data available</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Table;