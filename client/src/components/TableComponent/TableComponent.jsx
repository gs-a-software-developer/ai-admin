// TableComponent.js
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTableData,
  addTableItem,
  editTableItem,
  deleteTableItem,
} from "../../redux/actions/tableActions";
import FilterModal from "../FilterModal/FilterModal";
import AddModal from "../AddModal/AddModal";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import TableControls from "../TableControls/TableControls";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import styles from "../Table/Table.module.css";

const ITEMS_PER_PAGE = 15;

const TableComponent = ({
  title,
  dataKey,
  uniqueKey,
  // data
  // headers,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOrder, setFilterOrder] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [facultyFilter, setFacultyFilter] = useState([]);
  const [fileTypeFilter, setFileTypeFilter] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editItemData, setEditItemData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { data: tableData, headers = [] } = useSelector((state) => state.table);
  console.log("Headers from Redux store:", headers);
  console.log("Data from Redux store:", tableData);

  useEffect(() => {
    dispatch(fetchTableData(dataKey));
  }, [dispatch, dataKey]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const closeEditModal = () => setIsEditModalOpen(false);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openDeleteModal = (item) => {
    setDeleteItemData(item);
    setIsDeleteModalOpen(true);
  };

  const handleApplyFilters = ({ sortOrder, faculty, fileType }) => {
    setFilterOrder(sortOrder);
    setFacultyFilter(faculty);
    setFileTypeFilter(fileType);
  };

  const openEditModal = (item) => {
    setEditItemData(item);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleModal = (type, isOpen) => {
    if (type === "filter") setIsFilterModalOpen(isOpen);
    else if (type === "add") setIsAddModalOpen(isOpen);
    else if (type === "edit") setIsEditModalOpen(isOpen);
    else if (type === "delete") setIsDeleteModalOpen(isOpen);
  };

  const filteredData = useMemo(() => {
    if (!tableData) return [];

    return tableData
      .filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .filter((item) =>
        facultyFilter.length ? facultyFilter.includes(item.Faculty) : true
      )
      .filter((item) =>
        fileTypeFilter.length
          ? fileTypeFilter.includes(item["File Type"])
          : true
      )
      .sort((a, b) => {
        if (!filterOrder) return 0;
        const valA = a[uniqueKey]?.toString() || "";
        const valB = b[uniqueKey]?.toString() || "";
        return filterOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [
    tableData,
    searchTerm,
    facultyFilter,
    fileTypeFilter,
    filterOrder,
    uniqueKey,
  ]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredData, currentPage]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterOrder(null);
    setFacultyFilter([]);
    setFileTypeFilter([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (
      filteredData.length > 0 &&
      currentPage > Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    ) {
      setCurrentPage(1);
    }
  }, [filteredData]);

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <TableControls
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        onOpenModal={(type, isOpen) => {
          if (type === "filter") setIsFilterModalOpen(isOpen);
          else if (type === "add") setIsAddModalOpen(isOpen);
          else if (type === "delete") setIsDeleteModalOpen(isOpen);
        }}
        onResetFilters={resetFilters}
        selectedItems={selectedItems}
      />
      
      <Table
        headers={headers}
        data={paginatedData}
        uniqueKey={uniqueKey}
        onEdit={(item) => {
          setEditItemData(item);
          setIsEditModalOpen(true);
        }}
        onDelete={(item) => {
          setDeleteItemData(item);
          setIsDeleteModalOpen(true);
        }}
        onToggleSelect={(id) => {
          setSelectedItems((prev) =>
            prev.includes(id)
              ? prev.filter((item) => item !== id)
              : [...prev, id]
          );
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newItem) => dispatch(addTableItem(newItem))}
        headers={headers}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        headers={headers}
        onApply={handleApplyFilters}
        currentFilters={{
          sortOrder: filterOrder,
          faculty: facultyFilter,
          fileType: fileTypeFilter,
        }}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedItem) => dispatch(editTableItem(updatedItem))}
        itemData={editItemData}
        headers={headers}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => {
          dispatch(deleteTableItem(deleteItemData?.[uniqueKey]));
          setIsDeleteModalOpen(false);
        }}
        itemData={deleteItemData}
      />
    </div>
  );
};

export default TableComponent;
