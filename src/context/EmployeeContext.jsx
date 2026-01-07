import { createContext, useContext, useState, useEffect } from 'react'
import { mockEmployees } from '../data/mockEmployees'

const EmployeeContext = createContext(null)

export const useEmployees = () => {
  const context = useContext(EmployeeContext)
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider')
  }
  return context
}

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* Load employees from localStorage or use mock data */
    const storedEmployees = localStorage.getItem('employees')
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees))
    } else {
      setEmployees(mockEmployees)
      localStorage.setItem('employees', JSON.stringify(mockEmployees))
    }
    setLoading(false)
  }, [])

  /* Save to localStorage whenever employees change */
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('employees', JSON.stringify(employees))
    }
  }, [employees, loading])

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: generateEmployeeId()
    }
    setEmployees(prev => [...prev, newEmployee])
    return newEmployee
  }

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp)
    )
  }

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const toggleEmployeeStatus = (id) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, isActive: !emp.isActive } : emp)
    )
  }

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id)
  }

  const generateEmployeeId = () => {
    const maxId = employees.reduce((max, emp) => {
      const num = parseInt(emp.id.replace('EMP', ''))
      return num > max ? num : max
    }, 0)
    return `EMP${String(maxId + 1).padStart(3, '0')}`
  }

  /* Statistics */
  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.isActive).length,
    inactive: employees.filter(emp => !emp.isActive).length
  }

  const value = {
    employees,
    loading,
    stats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
    getEmployeeById
  }

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}

