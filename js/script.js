/*
Raw JavaScript made for this project
*/

'use strict';

/*
Data
*/

// Data 1
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

// Data 2
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

// Data 3
const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

// Data 4
const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// All the data together as an array
const accounts = [account1, account2, account3, account4];

// Element tags from HTML
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

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



const displayMovements = (movements) => {

    // Loop through each `mov` in the `movements` array
    movements.forEach((mov, i) => {

      // Get current date
      const datum = new Date()
      const date = datum.getFullYear();

      // Define movement type based on value
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      // Create HTML element and insert into DOM
      const html = `
              <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${ date }</div>
                <div class="movements__value">${mov}</div>
              </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    })
  }
  
  // Display Movements using the above function
  displayMovements(account1.movements);

  /*
  
  */
  
  // Calculate and display balance for account1
  const calcDisplayBalance = (movements) => {
    
    // Calculate the sum of all movements to get the current account balance
    const balance = movements.reduce((acc, mov) => acc + mov, 0);

    // Update the balance label in the UI with the calculated balance value
    labelBalance.textContent = `${balance} EUR`;
  }
  
  // Call calcDisplayBalance() function to display balance for account1
  calcDisplayBalance(account1.movements);
  
  // Calculate and display summary for account1
  const calcDisplaySummary = (movements) => {
    
    // Calculate total income from all deposits
    const incomes =  movements.filter(mov => mov > 0)
                              .reduce((acc, mov) => acc + mov, 0);
    
    // Calculate total amount of withdrawals (as negative value)
    const out = movements.filter(mov => mov < 0)
                         .reduce((acc, mov) => acc + mov, 0);     
  
    // Calculate total interest earned on all deposits (using fixed interest rate of 1.2%)
    const interest =   movements.filter(mov => mov > 0)
                                .map(deposit => (deposit  * 1.2)/100)
                                .filter((int, i, arr) => { console.log(arr); return int >= 1; })
                                .reduce((acc, int) => acc + int, 0);
  
    // Update the corresponding labels in the UI with the calculated values
    labelSumIn.textContent = `${incomes} €`;
    labelSumOut.textContent = `${Math.abs(out)} €`; 
    labelSumInterest.textContent = `${interest} €`;
  }
  
  // Call calcDisplaySummary() function to display summary for account1
  calcDisplaySummary(account1.movements);
   
  
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
  /////////////////////////////////////////////////
  
  // Calculate the total deposits in USD using pipeline method
  const euroUsd = 1.1;
  const totalDepositsUsd = movements.filter(mov => mov > 0)
                                    .map((mov, i, arr) => {

                                      // Multiply each deposit by the exchange rate (euroUsd)
                                      return mov * euroUsd;
                                    })
                                    .map(mov => mov * euroUsd)
                                    .reduce((acc, mov) => acc + mov, 0);
  
    // Round the total deposits in USD to the nearest integer
    console.log(Math.round(totalDepositsUsd));
  
  // Create an array of strings that describe each movement
  const movementsDes = movements.map( (mov, i) => 
  `Movement ${i + 1}: You ${(mov > 0) ? 'deposited' : 'withdrew'} ${mov} ${Math.abs(mov)}`);