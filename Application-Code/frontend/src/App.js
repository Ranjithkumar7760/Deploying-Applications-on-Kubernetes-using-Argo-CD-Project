import React, { Component } from "react";
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalanceWallet as WalletIcon,
  MonetizationOn as MoneyIcon,
  Inbox as InboxIcon,
} from "@material-ui/icons";
import CategoryIcon from "./components/CategoryIcon";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
} from "./services/expenseService";
import "./App.css";

const categories = [
  "Food",
  "Transportation", 
  "Entertainment",
  "Shopping",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

class App extends Component {
  state = {
    expenses: [],
    currentExpense: {
      title: "",
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
    },
    totalStats: { total: 0, count: 0 },
    editingExpense: null,
    dialogOpen: false,
  };

  async componentDidMount() {
    await this.loadExpenses();
    await this.loadStats();
  }

  loadExpenses = async () => {
    try {
      const { data } = await getExpenses();
      this.setState({ expenses: data });
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  loadStats = async () => {
    try {
      const { data } = await getTotalExpenses();
      this.setState({ totalStats: data });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  handleChange = (field) => (event) => {
    this.setState({
      currentExpense: {
        ...this.state.currentExpense,
        [field]: event.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentExpense, editingExpense } = this.state;
    
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, currentExpense);
      } else {
        await addExpense(currentExpense);
      }
      
      this.setState({
        currentExpense: {
          title: "",
          amount: "",
          category: "",
          description: "",
          date: new Date().toISOString().split('T')[0],
        },
        editingExpense: null,
        dialogOpen: false,
      });
      
      await this.loadExpenses();
      await this.loadStats();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  handleEdit = (expense) => {
    this.setState({
      currentExpense: {
        ...expense,
        date: new Date(expense.date).toISOString().split('T')[0],
      },
      editingExpense: expense,
      dialogOpen: true,
    });
  };

  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        await this.loadExpenses();
        await this.loadStats();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false,
      editingExpense: null,
      currentExpense: {
        title: "",
        amount: "",
        category: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
      },
    });
  };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  getCategoryClass = (category) => {
    return `category-${category.toLowerCase()}`;
  };

  render() {
    const { expenses, currentExpense, totalStats, editingExpense, dialogOpen } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1>Personal Expense Tracker</h1>
          <p>Track your spending and manage your finances</p>
        </header>

        <div className="main-content">
          {/* Stats Cards */}
          <div className="stats-container">
            <Paper className="stat-card">
              <WalletIcon style={{ fontSize: 40, color: '#667eea', marginBottom: 10 }} />
              <Typography className="stat-value">
                {this.formatCurrency(totalStats.total)}
              </Typography>
              <Typography className="stat-label">Total Spent</Typography>
            </Paper>
            
            <Paper className="stat-card">
              <ReceiptIcon style={{ fontSize: 40, color: '#667eea', marginBottom: 10 }} />
              <Typography className="stat-value">{totalStats.count}</Typography>
              <Typography className="stat-label">Total Expenses</Typography>
            </Paper>
            
            <Paper className="stat-card">
              <TrendingUpIcon style={{ fontSize: 40, color: '#667eea', marginBottom: 10 }} />
              <Typography className="stat-value">
                {totalStats.count > 0 ? this.formatCurrency(totalStats.total / totalStats.count) : '$0.00'}
              </Typography>
              <Typography className="stat-label">Average Expense</Typography>
            </Paper>
          </div>

          {/* Main Content */}
          <Paper className="expense-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <Typography variant="h5" style={{ fontWeight: 600, color: '#333' }}>
                Recent Expenses
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={this.openDialog}
                className="add-expense-btn"
              >
                Add Expense
              </Button>
            </div>

            {/* Expenses List */}
            <div className="expenses-list">
              {expenses.length === 0 ? (
                <div className="no-expenses">
                  <div className="empty-state">
                    <div className="empty-state-image">
                      <InboxIcon style={{ fontSize: 80, color: '#ccc' }} />
                    </div>
                    <Typography variant="h5" style={{ marginBottom: 15, fontWeight: 300 }}>No expenses yet</Typography>
                    <Typography variant="body1" style={{ color: '#888', marginBottom: 25 }}>Start tracking your expenses by adding your first one!</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={this.openDialog}
                      className="add-expense-btn"
                      style={{ marginTop: 10 }}
                    >
                      Add Your First Expense
                    </Button>
                  </div>
                </div>
              ) : (
                expenses.map((expense) => (
                  <Paper key={expense._id} className={`expense-item ${this.getCategoryClass(expense.category)}`}>
                    <div className="expense-header">
                      <Typography className="expense-title">{expense.title}</Typography>
                      <Typography className="expense-amount">
                        {this.formatCurrency(expense.amount)}
                      </Typography>
                    </div>
                    
                    <div className="expense-details">
                      <div>
                        <span className="expense-category">
                          <CategoryIcon category={expense.category} size={16} color="white" />
                          {expense.category}
                        </span>
                        <span style={{ marginLeft: 15 }} className="expense-date">
                          {this.formatDate(expense.date)}
                        </span>
                      </div>
                    </div>
                    
                    {expense.description && (
                      <Typography variant="body2" style={{ marginTop: 10, color: '#666' }}>
                        {expense.description}
                      </Typography>
                    )}
                    
                    <div className="expense-actions">
                      <Button
                        className="edit-btn"
                        startIcon={<EditIcon />}
                        onClick={() => this.handleEdit(expense)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="delete-btn"
                        startIcon={<DeleteIcon />}
                        onClick={() => this.handleDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Paper>
                ))
              )}
            </div>
          </Paper>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={this.closeDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <div style={{ display: 'grid', gap: 20 }}>
                <TextField
                  label="Title"
                  value={currentExpense.title}
                  onChange={this.handleChange('title')}
                  required
                  fullWidth
                />
                
                <TextField
                  label="Amount"
                  type="number"
                  value={currentExpense.amount}
                  onChange={this.handleChange('amount')}
                  required
                  fullWidth
                  inputProps={{ min: 0, step: 0.01 }}
                />
                
                <TextField
                  label="Category"
                  select
                  value={currentExpense.category}
                  onChange={this.handleChange('category')}
                  required
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CategoryIcon category={category} size={20} />
                        {category}
                      </div>
                    </MenuItem>
                  ))}
                </TextField>
                
                <TextField
                  label="Date"
                  type="date"
                  value={currentExpense.date}
                  onChange={this.handleChange('date')}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                
                <TextField
                  label="Description (Optional)"
                  value={currentExpense.description}
                  onChange={this.handleChange('description')}
                  multiline
                  rows={3}
                  fullWidth
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {editingExpense ? 'Update' : 'Add'} Expense
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default App;