import { Users, LogOut, User } from 'lucide-react'

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Users size={28} />
          <h1>Employee Management</h1>
        </div>
        
        <div className="header-user">
          <div className="user-info">
            <User size={20} />
            <span>{user?.name || user?.email}</span>
          </div>
          <button className="btn btn-logout" onClick={onLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

