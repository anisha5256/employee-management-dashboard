import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useEmployees } from '../../context/EmployeeContext'
import Header from './Header'
import DashboardSummary from './DashboardSummary'
import EmployeeList from '../Employee/EmployeeList'
import EmployeeForm from '../Employee/EmployeeForm'
import SearchFilter from '../Employee/SearchFilter'
import Modal from '../UI/Modal'
import ConfirmDialog from '../UI/ConfirmDialog'
import { Loader2 } from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { employees, loading, deleteEmployee, stats } = useEmployees()
  
  /* Modal states */
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, employee: null })
  
  /* Search and filter states */
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    gender: '',
    status: ''
  })

  /* Filter employees based on search and filters */
  const filteredEmployees = employees.filter(emp => {
    /* Search by name */
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    
    /* Filter by gender */
    const matchesGender = !filters.gender || emp.gender === filters.gender
    
    /* Filter by status */
    const matchesStatus = !filters.status || 
      (filters.status === 'active' && emp.isActive) ||
      (filters.status === 'inactive' && !emp.isActive)
    
    return matchesSearch && matchesGender && matchesStatus
  })

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setIsFormOpen(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setIsFormOpen(true)
  }

  const handleDeleteClick = (employee) => {
    setDeleteConfirm({ open: true, employee })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirm.employee) {
      deleteEmployee(deleteConfirm.employee.id)
    }
    setDeleteConfirm({ open: false, employee: null })
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingEmployee(null)
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <Loader2 className="spinner" size={48} />
        <p>Loading employees...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <Header user={user} onLogout={logout} />
      
      <main className="dashboard-main">
        <div className="dashboard-container">
          <DashboardSummary stats={stats} />
          
          <div className="employee-section">
            <div className="section-header">
              <h2>Employee Directory</h2>
              <div className="section-actions">
                <button className="btn btn-secondary" onClick={handlePrint}>
                  Print List
                </button>
                <button className="btn btn-primary" onClick={handleAddEmployee}>
                  Add Employee
                </button>
              </div>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={setFilters}
            />

            <EmployeeList
              employees={filteredEmployees}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteClick}
            />

            {filteredEmployees.length === 0 && (
              <div className="empty-state">
                <p>No employees found matching your criteria.</p>
                {(searchTerm || filters.gender || filters.status) && (
                  <button 
                    className="btn btn-text"
                    onClick={() => {
                      setSearchTerm('')
                      setFilters({ gender: '', status: '' })
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Employee Modal */}
      <Modal isOpen={isFormOpen} onClose={handleCloseForm}>
        <EmployeeForm
          employee={editingEmployee}
          onClose={handleCloseForm}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deleteConfirm.employee?.fullName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ open: false, employee: null })}
        variant="danger"
      />
    </div>
  )
}

export default Dashboard

