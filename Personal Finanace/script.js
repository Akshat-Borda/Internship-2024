document.addEventListener('DOMContentLoaded', () => {
    const addExpenseTab = document.getElementById('add-expense-tab');
    const viewExpensesTab = document.getElementById('view-expenses-tab');
    // const reportsTab = document.getElementById('reports-tab');

    const addExpenseSection = document.getElementById('add-expense');
    const viewExpensesSection = document.getElementById('view-expenses');
    // const reportsSection = document.getElementById('reports');

    function showSection(section) {
        addExpenseSection.classList.remove('active');
        viewExpensesSection.classList.remove('active');
        //reportsSection.classList.remove('active');
        section.classList.add('active');
    }

    addExpenseTab.addEventListener('click', (event) => {
        event.preventDefault();
        showSection(addExpenseSection);
    });

    viewExpensesTab.addEventListener('click', (event) => {
        event.preventDefault();
        showSection(viewExpensesSection);
        fetchExpenses();  // Fetch expenses when the tab is clicked
    });

    // Show the add expense section by default
    showSection(addExpenseSection);

    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.querySelector('#expense-table tbody');

    async function fetchExpenses() {
        const response = await fetch('http://localhost:3000/api/expenses');
        const expenses = await response.json();
        expenseTableBody.innerHTML = '';
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.description}</td>
            `;
            expenseTableBody.appendChild(row);
        });
    }

    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;

        const response = await fetch('http://localhost:3000/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, category, amount, description })
        });

        const newExpense = await response.json();

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${newExpense.date}</td>
            <td>${newExpense.category}</td>
            <td>$${newExpense.amount}</td>
            <td>${newExpense.description}</td>
        `;
        expenseTableBody.appendChild(row);

        expenseForm.reset();
    });

    fetchExpenses();
});
