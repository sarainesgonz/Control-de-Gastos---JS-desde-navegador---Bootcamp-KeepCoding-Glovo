let arrayTransactions = [];
let incomeList;
let expensesList;

function newTransactions() {
    const transactionsFormElement = document.querySelector('#transactionsForm')
    transactionsFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const descriptionElement = document.querySelector('#description');
        const amountElement = document.querySelector('#amount');
        const typeOfMovement = document.querySelector('input[type="radio"]:checked');

        let transaction = {
            id: '',
            description: descriptionElement.value,
            amountOfMoney: parseFloat(amountElement.value),
            typeOfMovement: typeOfMovement.value
        };

        arrayTransactions.push(transaction)
        let idValue = arrayTransactions.indexOf(transaction)
        transaction.id = idValue

        updateTransactionsInfo(arrayTransactions)
        displayTransaction()
        localStorage.setItem('transactionRecords', JSON.stringify(arrayTransactions));

        descriptionElement.value = "";
        amountElement.value = "";
        typeOfMovement.checked = false;
    })
}

function updateTransactionsInfo(arrayTransactions) {
    const savingsElement = document.querySelector('#savings')
    const expensesElement = document.querySelector('#expenses')
    const incomeElement = document.querySelector('#income')
    let income = 0;
    let expenses = 0;
    let savings = 0;

    incomeList = arrayTransactions.filter(transaction => transaction.typeOfMovement === 'Ingreso');
    expensesList = arrayTransactions.filter(transaction => transaction.typeOfMovement === 'Gasto');

    if(incomeList != null) {
        incomeList.forEach(element => {
            income = income + parseFloat(element.amountOfMoney)
        });
    }
    if(expensesList != null) {
        expensesList.forEach(element => {
            expenses = expenses + parseFloat(element.amountOfMoney)
        })
    }

    savings = parseFloat(income - expenses)
    
    savingsElement.textContent = savings.toFixed(2);
    expensesElement.textContent = expenses.toFixed(2);
    incomeElement.textContent = income.toFixed(2)
}
