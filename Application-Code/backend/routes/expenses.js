const Expense = require("../models/expense");
const express = require("express");
const router = express.Router();

// Create expense
router.post("/", async (req, res) => {
    try {
        const expense = await new Expense(req.body).save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get expense by ID
router.get("/:id", async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update expense
router.put("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete expense
router.delete("/:id", async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get expenses by category
router.get("/category/:category", async (req, res) => {
    try {
        const expenses = await Expense.find({ category: req.params.category }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get total expenses
router.get("/stats/total", async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(result[0] || { total: 0, count: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;