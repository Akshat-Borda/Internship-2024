const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/finance_manager', { useNewUrlParser: true, useUnifiedTopology: true });

const expenseSchema = new mongoose.Schema({
    date: String,
    category: String,
    amount: Number,
    description: String
});

const Expense = mongoose.model('Expense', expenseSchema);

app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
    const { date, category, amount, description } = req.body;
    const newExpense = new Expense({ date, category, amount, description });
    await newExpense.save();
    res.json(newExpense);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
