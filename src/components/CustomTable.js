import React, { useState, useEffect } from "react";
import "./CustomTable.css"; // Import the CSS file

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalRows, setTotalRows] = useState(0); // Total rows from API
  const [totalPages, setTotalPages] = useState(1);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${searchQuery}&page=${currentPage}`
      );
      const result = await response.json();
      setData(result.data); // Update table data
      setCurrentPage(result.current_page); // Update current page
      setTotalPages(result.last_page); // Update total pages
      setTotalRows(result.total); // Set total rows
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, rowsPerPage, currentPage]); // Trigger fetch when these values change

  // Search filter function
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Sorting function
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortOrder(order);
    setData(sortedData);
  };

  // Handle page changes
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  // Calculate the current range of rows being displayed
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

  return (
    <div className="p-4 table_container">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortColumn === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortColumn === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th>Email Verified At</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "table-row" : ""}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.email_verified_at}</td>
              <td>{item.created_at}</td>
              <td>{item.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <div>
          <span>Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Display range and total rows */}
        <div>
          {startRow}-{endRow} of {totalRows} 
        </div>

        {/* Pagination buttons */}
        <div className="page-buttons">
          <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
            &lt;
          </button>
          <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
