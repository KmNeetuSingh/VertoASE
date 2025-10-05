import { useState } from 'react';

function EmployeeList({ employees = [], onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found. Add your first employee to get started!</p>
      </div>
    );
  }

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="employee-list">
      <table className="employee-table">
        <thead>
          <tr>
            <th className="centered-column column-gap">Name</th>
            <th className="centered-column column-gap">Email</th>
            <th className="centered-column column-gap">Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td className="centered-column column-gap" data-label="Name">{employee.name}</td>
              <td className="centered-column column-gap" data-label="Email">{employee.email}</td>
              <td className="centered-column column-gap" data-label="Position">{employee.position}</td>
              <td data-label="Actions">
                <div className="action-buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(employee)}
                    title="Edit employee"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(employee._id)}
                    title="Delete employee"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length > 4 && totalPages > 1 && (
        <div
          className="pagination"
          style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: '5px' }}
          >
            Previous
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ marginLeft: '5px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;