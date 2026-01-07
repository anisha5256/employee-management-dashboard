import { useEmployees } from '../../context/EmployeeContext'
import { Edit, Trash2, Printer, User } from 'lucide-react'

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const { toggleEmployeeStatus } = useEmployees()

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const handlePrintSingle = (employee) => {
    const printContent = `
      <html>
        <head>
          <title>Employee Details - ${employee.fullName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .details { margin: 20px 0; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; }
            img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Employee Details</h1>
          </div>
          <div class="details">
            <div class="detail-row"><span class="label">Employee ID:</span> ${employee.id}</div>
            <div class="detail-row"><span class="label">Full Name:</span> ${employee.fullName}</div>
            <div class="detail-row"><span class="label">Gender:</span> ${employee.gender}</div>
            <div class="detail-row"><span class="label">Date of Birth:</span> ${formatDate(employee.dateOfBirth)}</div>
            <div class="detail-row"><span class="label">State:</span> ${employee.state}</div>
            <div class="detail-row"><span class="label">Status:</span> ${employee.isActive ? 'Active' : 'Inactive'}</div>
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="employee-list">
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="emp-id">{employee.id}</td>
                <td>
                  <div className="profile-image">
                    {employee.profileImage ? (
                      <img 
                        src={employee.profileImage} 
                        alt={employee.fullName}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="profile-placeholder" style={{ display: employee.profileImage ? 'none' : 'flex' }}>
                      <User size={20} />
                    </div>
                  </div>
                </td>
                <td className="emp-name">{employee.fullName}</td>
                <td>{employee.gender}</td>
                <td>{formatDate(employee.dateOfBirth)}</td>
                <td>{employee.state}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={employee.isActive}
                      onChange={() => toggleEmployeeStatus(employee.id)}
                    />
                    <span className="toggle-slider"></span>
                    <span className={`toggle-label ${employee.isActive ? 'active' : 'inactive'}`}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={() => onEdit(employee)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={() => onDelete(employee)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="btn-icon btn-print" 
                      onClick={() => handlePrintSingle(employee)}
                      title="Print"
                    >
                      <Printer size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList

