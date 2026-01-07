import { Search, Filter, X } from 'lucide-react'

const SearchFilter = ({ searchTerm, onSearchChange, filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    onSearchChange('')
    onFilterChange({ gender: '', status: '' })
  }

  const hasActiveFilters = searchTerm || filters.gender || filters.status

  return (
    <div className="search-filter">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => onSearchChange('')}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-group">
        <Filter className="filter-icon" size={18} />
        
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {hasActiveFilters && (
          <button className="btn btn-text clear-filters" onClick={clearFilters}>
            <X size={16} />
            Clear All
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchFilter

