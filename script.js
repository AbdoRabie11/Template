'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
let containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value
  const reciver =  accounts.find(acc => acc.username === inputTransferTo.value)
  if(amount > 0 && currentAccount.balance >= amount && reciver?.username  !== currentAccount) {

    currentAccount.movements.push(-amount)
    reciver.movements.push(amount)

    updateUi(currentAccount)
    inputTransferTo.value = ''
    inputTransferAmount.value = ''
  } 
}) 

btnClose.addEventListener('click', function(e) {
  e.preventDefault()
  if(inputCloseUsername.value === currentAccount.username && inputClosePin.value == +currentAccount.pin){
    console.log(currentAccount);
    const index = accounts.indexOf(acc => acc.username === currentAccount.username)
    accounts.splice(index,1)
    containerApp.style.opacity = '0'

  }
})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault()
  const amount = +inputLoanAmount.value
  if(amount > 0) {
    currentAccount.movements.push(amount)
  }
  updateUi(currentAccount)
  inputLoanAmount.value = ''
})

function updateUi() {
  displaymovements(currentAccount.movements);
  calcDisplayBalance(currentAccount)
  calcDisplaySummary(currentAccount)
}

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const displaymovements = function (movements , sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;
  console.log(movs);
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
     containerMovements.insertAdjacentHTML('afterbegin', html);
    // containerMovements.innerHTML += html
  });
};


const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.innerHTML = `${acc.balance} eur`
}

const calcDisplaySummary = function(acc) {
  const deposite = acc.movements.filter(item => item > 0)
    .reduce((acc, mov) => acc + mov,0)
  labelSumIn.innerHTML = `${deposite}eu`
  const withdrawal = acc.movements.filter(item => item < 0)
  .reduce((acc, mov) => acc + mov)
  labelSumOut.innerHTML = Math.abs(withdrawal)
  const interst = acc.movements.filter(item => item > 0)
  .map(de => (de * acc.interestRate) / 100)
  .reduce((acc, int) => acc + int,0)
  labelSumInterest.innerHTML = interst
}
const creatUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLocaleLowerCase().split(' ').map((i) => {
    return i[0]
  }).join('')
  })
}
creatUsernames(accounts)
let currentAccount
btnLogin.addEventListener('click',function(e) {
  e.preventDefault()
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  if(currentAccount?.pin === +inputLoginPin.value) {
    // display ui and message
    containerApp.style.opacity = '1'
    labelWelcome.innerHTML = `welcome ${currentAccount.owner.split(' ')[0]}`
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    // display movments
    displaymovements(currentAccount.movements);
    calcDisplayBalance(currentAccount)
    calcDisplaySummary(currentAccount)
    }
    
})

 const total =  movements
 .filter(mov => mov > 0)
 .map(mov => mov * 1.1)
 .reduce((acc, mov) => acc + mov,0)
 console.log(total);


//  const arr = [[1,2,3,4], [2,5,6,7,8]]
//  console.log(arr.flat());

btnSort.addEventListener('click', function(e) {
  e.preventDefault()
  displaymovements(currentAccount.movements, true)
})