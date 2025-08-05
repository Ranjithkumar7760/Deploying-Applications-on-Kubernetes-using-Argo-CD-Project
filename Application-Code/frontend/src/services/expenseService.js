import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3500/api/expenses";

export function getExpenses() {
    return axios.get(apiUrl);
}

export function getExpenseById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function addExpense(expense) {
    return axios.post(apiUrl, expense);
}

export function updateExpense(id, expense) {
    return axios.put(`${apiUrl}/${id}`, expense);
}

export function deleteExpense(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function getExpensesByCategory(category) {
    return axios.get(`${apiUrl}/category/${category}`);
}

export function getTotalExpenses() {
    return axios.get(`${apiUrl}/stats/total`);
}