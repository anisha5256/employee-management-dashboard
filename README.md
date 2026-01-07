# Employee Management Dashboard

A modern, responsive React.js application for managing employees with authentication, CRUD operations, search/filter functionality, and print capabilities.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Project Overview

This Employee Management Dashboard is a complete solution for managing employee data with the following features:

- **Authentication**: Secure login with route protection
- **Dashboard Summary**: Overview of total, active, and inactive employees
- **Employee Management**: Add, edit, delete, and toggle employee status
- **Search & Filter**: Combined search and filtering capabilities
- **Image Upload**: Profile image upload with preview
- **Print Functionality**: Print individual or all employee records
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React.js 18** | Frontend UI library |
| **Vite** | Build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Modern icon library |
| **LocalStorage** | Data persistence |
| **CSS3** | Custom styling (no UI framework) |

## 📁 Project Structure

```
employee-management-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardSummary.jsx
│   │   │   └── Header.jsx
│   │   ├── Employee/
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   └── SearchFilter.jsx
│   │   └── UI/
│   │       ├── ConfirmDialog.jsx
│   │       └── Modal.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── EmployeeContext.jsx
│   ├── data/
│   │   └── mockEmployees.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js

### Installation Steps

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 🔐 Authentication

### Demo Credentials

| Email | Password |
|-------|----------|
| `admin@company.com` | `admin123` |
| Any valid email | Any password (6+ characters) |

### Authentication Features

- Protected routes - Dashboard is inaccessible without login
- Session persistence using localStorage
- Automatic redirect after login
- Logout functionality

## ✨ Features in Detail

### 1. Login Page
- Email and password validation
- Show/hide password toggle
- Loading state during authentication
- Error message display
- Remember session (localStorage)

### 2. Dashboard Summary
- Total employee count
- Active employee count with percentage
- Inactive employee count with percentage
- Real-time updates

### 3. Employee List
- Paginated table view
- Profile image display
- Toggle active/inactive status
- Edit, Delete, Print actions per row
- Responsive table design

### 4. Employee Form (Add/Edit)
- Full name validation
- Gender selection (radio buttons)
- Date of birth picker with age validation
- State dropdown (US states)
- Profile image upload with preview
- Active status toggle
- Form validation with error messages

### 5. Search & Filter
- Real-time search by name
- Filter by gender (Male/Female/Other)
- Filter by status (Active/Inactive)
- Combined filtering support
- Clear all filters option

### 6. Print Functionality
- Print entire employee list
- Print individual employee details
- Print-optimized styling

## 🎨 Design Decisions

### Color Palette
- **Primary**: Teal/Emerald (#0d9488) - Modern and professional
- **Success**: Green (#10b981) - Active status
- **Warning**: Amber (#f59e0b) - Inactive status
- **Danger**: Red (#ef4444) - Delete actions
- **Neutrals**: Slate gray scale for text and borders

### UI/UX Principles
- Clean, minimal interface
- Consistent spacing and typography
- Clear visual hierarchy
- Immediate feedback on actions
- Graceful loading and empty states
- Accessible color contrast

### Architecture
- **Context API** for state management (no Redux needed for this scale)
- **Component composition** for reusability
- **Custom hooks** for logic separation
- **CSS variables** for theming

## 📝 Assumptions

1. **Data Persistence**: Uses localStorage for data storage (suitable for demo/prototype)
2. **Authentication**: Mock authentication (accepts any valid email with 6+ char password)
3. **Image Storage**: Images are stored as Base64 in localStorage (limited to ~5MB per image)
4. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
5. **US States**: Dropdown includes all 50 US states

## 🔧 Customization

### Adding More States/Countries
Edit `src/data/mockEmployees.js`:
```javascript
export const usStates = [
  'Alabama', 'Alaska', ...
]
```

### Changing Theme Colors
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --color-primary: #your-color;
  ...
}
```

### Connecting to Real API
Replace localStorage calls in context files with actual API calls:
```javascript
// In EmployeeContext.jsx
const addEmployee = async (employee) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    body: JSON.stringify(employee)
  })
  // Handle response
}
```

## 📱 Responsive Breakpoints

| Breakpoint | Target Devices |
|------------|----------------|
| > 768px | Desktop |
| ≤ 768px | Tablet & Mobile |

## 🎥 Screen Recording Checklist

When creating your demo video, show:

- [ ] Login flow (with validation)
- [ ] Dashboard overview (summary cards)
- [ ] Add new employee (with image upload)
- [ ] Edit existing employee
- [ ] Delete employee (with confirmation)
- [ ] Image upload and preview
- [ ] Search by name
- [ ] Filter by gender
- [ ] Filter by status
- [ ] Combined filtering
- [ ] Toggle active/inactive
- [ ] Print functionality
- [ ] Logout flow

## 📄 License

This project is for educational/assignment purposes.

## 👩‍💻 Author

Anisha Kumari

---

## 🆘 Troubleshooting

### Common Issues

**Port 5173 is in use**
```bash
npm run dev -- --port 3000
```

**Node modules issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Clear localStorage (reset data)**
Open browser console and run:
```javascript
localStorage.clear()
```

