const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('historyList');
const form = document.getElementById('transactionForm');
const text = document.getElementById('transactionText');
const amount = document.getElementById('transactionAmount');


// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: +300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ?
localStorageTransactions : [];

// Add transaction
function addTransaction(e){
  e.preventDefault();
  
  if(text.value.trim() === ''  || amount.value.trim() === ''){
    alert('Please add a text and amount')
  }else{
    var category = document.getElementById('expenseCategory').value != '' ? document.getElementById('expenseCategory').value : 'General';
    var location = document.getElementById('locationAutocomplete').value != '' ? document.getElementById('locationAutocomplete').value : 'Undefined';
    const transaction = {
      id: generateID(),
      category: category,
      text: text.value,
      amount: +amount.value,
      position: currentLatLng,
      location: location
    };

    document.getElementById('locationAutocomplete').value = '';
  // Add the transaction to the map from mapScript 
  markTransaction(transaction)
  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  showTransactions();
  updateLocalStorage();


  text.value = '';
  amount.value = '';
  }
}

//Generate random ID
function generateID(){
  return Math.floor(Math.random() * 1000000)
}

// Add transactions to DOM list
function addTransactionDOM(transaction){
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li')

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

  list.appendChild(item);
  // item.innerHTML = ` <li class="${sign}">Cash<span>$</span><button class="delete-btn">x</button></li>
}

// Update the balance, income and expense
function updateValues(){
  const amounts = transactions.map( transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

// Calculate the values for income and expense with the help of javascript list functions
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts
    .filter( item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1) 
    .toFixed(2); 

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
            
}

// Remove transaction by ID
function removeTransaction(id){
  transactions = transactions.filter( transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transaction
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);