document.addEventListener('DOMContentLoaded', function() {
    const incomeForm = document.getElementById('incomeForm');
    const incomeSources = document.getElementById('incomeSources');
    const generateExpensesBtn = document.getElementById('generateExpenses');
    const exportPDFBtn = document.getElementById('exportPDF');
    const exportPDFBtn2 = document.getElementById('exportPDF2');
    const addExpenseBtn = document.getElementById('addExpense');
    const expensesContainer = document.getElementById('expensesContainer');
    const successSound = document.getElementById('successSound');

    let totalIncome = 0;
    let expenses = [];

    // Initialize Bootstrap carousel
    new bootstrap.Carousel(document.getElementById('wealthWiseCarousel'), {
        interval: 5000,
        wrap: true
    });

    // Sidebar functionality
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#calculations') {
                e.preventDefault();
                location.reload(); // Refresh the page for New Calculations
            } else if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelectorAll('#sidebar .nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    incomeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = document.getElementById('incomeType').value;
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const frequency = document.getElementById('incomeFrequency').value;
        const currency = document.getElementById('incomeCurrency').value;

        totalIncome += amount;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item fade-in';
        listItem.innerHTML = `${type}: ${currency} ${amount.toFixed(2)} (${frequency})`;
        incomeSources.appendChild(listItem);

        incomeForm.reset();
        successSound.play();
    });

    generateExpensesBtn.addEventListener('click', function() {
        expenses = [
            { name: 'Tithe', amount: totalIncome * 0.1 },
            { name: 'Offerings', amount: totalIncome * 0.1 },
            { name: 'Savings', amount: totalIncome * 0.2 },
            { name: 'Emergency', amount: totalIncome * 0.1 },
            { name: 'Basic', amount: totalIncome * 0.3 },
            { name: 'Secondary', amount: totalIncome * 0.15 },
            { name: 'Charity', amount: totalIncome * 0.05 }
        ];
        renderExpenses();
        successSound.play();
    });

    function renderExpenses() {
        expensesContainer.innerHTML = '';
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <input type="text" class="form-control" value="${expense.name}" data-index="${index}">
                <input type="number" class="form-control" value="${expense.amount.toFixed(2)}" data-index="${index}">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-sm btn-outline-primary edit-expense" data-index="${index}">Edit</button>
                    <button type="button" class="btn btn-sm btn-outline-danger remove-expense" data-index="${index}">Remove</button>
                </div>
            `;
            expensesContainer.appendChild(expenseItem);
        });
    }

    addExpenseBtn.addEventListener('click', function() {
        expenses.push({ name: 'New Expense', amount: 0 });
        renderExpenses();
    });

    expensesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-expense')) {
            const index = e.target.getAttribute('data-index');
            const nameInput = e.target.parentElement.parentElement.querySelector('input[type="text"]');
            const amountInput = e.target.parentElement.parentElement.querySelector('input[type="number"]');
            expenses[index].name = nameInput.value;
            expenses[index].amount = parseFloat(amountInput.value);
            renderExpenses();
        } else if (e.target.classList.contains('remove-expense')) {
            const index = e.target.getAttribute('data-index');
            expenses.splice(index, 1);
            renderExpenses();
        }
    });

    exportPDFBtn.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(30, 0, 159); // Primary color
        doc.text('WealthWise Financial Report', 20, 30);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('Income Sources:', 20, 50);
        let yPos = 60;
        incomeSources.querySelectorAll('li').forEach(item => {
            doc.setFontSize(12);
            doc.text(item.textContent, 20, yPos);
            yPos += 10;
        });

        doc.setFontSize(16);
        doc.text('Expenses:', 20, yPos + 10);
        yPos += 20;

        expenses.forEach(expense => {
            doc.setFontSize(14);
            doc.setTextColor(0, 34, 210); // Primary light color
            doc.text(`${expense.name}: ${expense.amount.toFixed(2)}`, 20, yPos);
            yPos += 10;
        });

        // Save the PDF
        doc.save('WealthWise_Report.pdf');
    });
    exportPDFBtn2.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(30, 0, 159); // Primary color
        doc.text('WealthWise Financial Report', 20, 30);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('Income Sources:', 20, 50);
        let yPos = 60;
        incomeSources.querySelectorAll('li').forEach(item => {
            doc.setFontSize(12);
            doc.text(item.textContent, 20, yPos);
            yPos += 10;
        });

        doc.setFontSize(16);
        doc.text('Expenses:', 20, yPos + 10);
        yPos += 20;

        expenses.forEach(expense => {
            doc.setFontSize(14);
            doc.setTextColor(0, 34, 210); // Primary light color
            doc.text(`${expense.name}: ${expense.amount.toFixed(2)}`, 20, yPos);
            yPos += 10;
        });

        // Save the PDF
        doc.save('WealthWise_Report.pdf');
    });
});
