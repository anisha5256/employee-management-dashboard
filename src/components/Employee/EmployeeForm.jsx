import { useState, useRef, useEffect } from 'react'
import { useEmployees } from '../../context/EmployeeContext'
import { usStates } from '../../data/mockEmployees'
import { Upload, X, User, Loader2 } from 'lucide-react'

const EmployeeForm = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useEmployees()
  const fileInputRef = useRef(null)
  const isEditing = !!employee

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    state: '',
    isActive: true,
    profileImage: ''
  })

  const [imagePreview, setImagePreview] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* Populate form when editing */
  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName || '',
        gender: employee.gender || '',
        dateOfBirth: employee.dateOfBirth || '',
        state: employee.state || '',
        isActive: employee.isActive ?? true,
        profileImage: employee.profileImage || ''
      })
      setImagePreview(employee.profileImage || '')
    }
  }, [employee])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    /* Clear error when field is modified */
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      /* Validate file type */
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profileImage: 'Please upload an image file' }))
        return
      }
      /* Validate file size (max 5MB) */
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image size should be less than 5MB' }))
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({ ...prev, profileImage: reader.result }))
        setErrors(prev => ({ ...prev, profileImage: '' }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview('')
    setFormData(prev => ({ ...prev, profileImage: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const dob = new Date(formData.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      if (age < 18) {
        newErrors.dateOfBirth = 'Employee must be at least 18 years old'
      }
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future'
      }
    }

    if (!formData.state) {
      newErrors.state = 'Please select a state'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    /* Simulate API delay */
    await new Promise(resolve => setTimeout(resolve, 500))

    if (isEditing) {
      updateEmployee(employee.id, formData)
    } else {
      addEmployee(formData)
    }

    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="employee-form">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
        <button className="btn-close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="form-group image-upload-group">
          <label>Profile Image</label>
          <div className="image-upload-container">
            <div className="image-preview">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image" 
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="image-placeholder">
                  <User size={40} />
                </div>
              )}
            </div>
            <div className="image-upload-actions">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={18} />
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </button>
              <p className="image-hint">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
          {errors.profileImage && <span className="error">{errors.profileImage}</span>}
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              <span className="radio-custom"></span>
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              <span className="radio-custom"></span>
              Female
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              <span className="radio-custom"></span>
              Other
            </label>
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={errors.dateOfBirth ? 'error' : ''}
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'error' : ''}
          >
            <option value="">Select a state</option>
            {usStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        {/* Active Status */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <span className="checkbox-custom"></span>
            Active Employee
          </label>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="spinner" size={18} />
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditing ? 'Update Employee' : 'Add Employee'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm

