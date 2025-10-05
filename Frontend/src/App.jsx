import { useState, useEffect } from 'react';
import api from './services/api';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EditModal from './components/EditModal';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (search = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getEmployees(search);
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchEmployees(term);
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      setError('');
      await api.createEmployee(employeeData);
      fetchEmployees(searchTerm);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add employee';
      setError(message);
      return { success: false, message };
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowEditModal(true);
  };

  const handleUpdateEmployee = async (id, employeeData) => {
    try {
      setError('');
      await api.updateEmployee(id, employeeData);
      fetchEmployees(searchTerm);
      setShowEditModal(false);
      setEditingEmployee(null);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update employee';
      setError(message);
      return { success: false, message };
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      setError('');
      await api.deleteEmployee(id);
      fetchEmployees(searchTerm);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
      console.error('Error deleting employee:', err);
    }
  };

  const closeModal = () => {
    setShowEditModal(false);
    setEditingEmployee(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Employee Management System</h1>
          <p>Manage your team efficiently</p>
        </header>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="main-content">
          <div className="form-section">
            <h2>Add New Employee</h2>
            <EmployeeForm onSubmit={handleAddEmployee} />
          </div>

          <div className="list-section">
            <div className="list-header">
              <h2>Employee List</h2>
              <SearchBar onSearch={handleSearch} />
            </div>

            {loading ? (
              <div className="loading">Loading employees...</div>
            ) : (
              <EmployeeList
                employees={employees}
                onEdit={handleEditClick}
                onDelete={handleDeleteEmployee}
              />
            )}
          </div>
        </div>

        {showEditModal && editingEmployee && (
          <EditModal
            employee={editingEmployee}
            onUpdate={handleUpdateEmployee}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;