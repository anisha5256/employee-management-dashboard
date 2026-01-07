import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react'

const DashboardSummary = ({ stats }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.total,
      icon: Users,
      color: 'primary',
      trend: null
    },
    {
      title: 'Active Employees',
      value: stats.active,
      icon: UserCheck,
      color: 'success',
      trend: stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0
    },
    {
      title: 'Inactive Employees',
      value: stats.inactive,
      icon: UserX,
      color: 'warning',
      trend: stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0
    }
  ]

  return (
    <div className="dashboard-summary">
      {cards.map((card, index) => (
        <div key={index} className={`summary-card summary-card--${card.color}`}>
          <div className="summary-card-icon">
            <card.icon size={24} />
          </div>
          <div className="summary-card-content">
            <h3>{card.title}</h3>
            <p className="summary-value">{card.value}</p>
            {card.trend !== null && (
              <span className="summary-trend">
                <TrendingUp size={14} />
                {card.trend}% of total
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardSummary

