# 💰 Personal Expense Tracker

A beautiful, full-featured expense tracking application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Beautiful Modern UI** - Gradient backgrounds, glass-morphism effects, and responsive design
- **Complete CRUD Operations** - Create, Read, Update, Delete expenses
- **Expense Categories** - Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Education, Other
- **Statistics Dashboard** - Total spent, expense count, average expense
- **Date Tracking** - Track when expenses occurred
- **Descriptions** - Add optional notes to expenses
- **Real-time Updates** - Instant UI updates after operations
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Quick Start with Docker

```bash
# Clone and navigate to project
cd TWSThreeTierAppChallenge

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3500
```

## 🛠️ Manual Setup

### Prerequisites
- Node.js 14+
- MongoDB

### Backend Setup
```bash
cd Application-Code/backend
npm install
npm start
```

### Frontend Setup
```bash
cd Application-Code/frontend
npm install
npm start
```

### Environment Variables

**Backend (.env):**
```
MONGO_CONN_STR=mongodb://localhost:27017/expensetracker
PORT=3500
```

**Frontend (.env):**
```
REACT_APP_BACKEND_URL=http://localhost:3500/api/expenses
```

## 📱 Application Screenshots

### Dashboard
- Clean, modern interface with statistics cards
- Total spent, expense count, and average calculations
- Beautiful gradient background with glass-morphism effects

### Expense Management
- Add new expenses with title, amount, category, date, and description
- Edit existing expenses inline
- Delete expenses with confirmation
- Category-based color coding

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Color-coded Categories** - Visual expense categorization
- **Smooth Animations** - Hover effects and transitions
- **Glass-morphism** - Modern frosted glass effects
- **Gradient Backgrounds** - Beautiful color transitions
- **Material Design** - Google's Material-UI components

## 🔧 API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats/total` - Get expense statistics
- `GET /api/expenses/category/:category` - Get expenses by category

## 🏗️ Architecture

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker & Docker Compose
- **State Management**: React Class Components
- **HTTP Client**: Axios

## 📊 Data Model

```javascript
{
  title: String,        // Expense title
  amount: Number,       // Expense amount
  category: String,     // Expense category
  date: Date,          // Expense date
  description: String,  // Optional description
  createdAt: Date,     // Auto-generated
  updatedAt: Date      // Auto-generated
}
```

This expense tracker provides a complete solution for personal finance management with a beautiful, modern interface and robust functionality.