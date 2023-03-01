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
  username: 'jonas'
};

// Data 2
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  username: 'jessica'
};

// Data 3
const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  username: 'steven'
};

// Data 4
const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  username: 'sarah'
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

const containerApp = document.querySelector('.main');
const containerMovements = document.querySelector('.movements');

const loginForm = document.querySelector('.login');

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

const loginPopup = document.querySelector('.fields');
const loginModal = document.querySelector('.modal_div');



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
                <tr>
                <td>1</td> <td class="movements__type  movements__type--${type}">${i + 1} ${type}</td> <td class="movements__value">${mov} €</td> <td></td> <td></td> <td class="movements__date">${ date }</td>
                </tr>
              </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
    })
  }
  
  // Display Movements using the above function
  // 

  /*
  
  */
  
  // Calculate and display balance for account1
  const calcDisplayBalance = (movements) => {
    
    // Calculate the sum of all movements to get the current account balance
    const balance = movements.reduce((acc, mov) => acc + mov, 0);

    // Update the balance label in the UI with the calculated balance value
    labelBalance.textContent = `${balance} €`;
  }
  
  // Call calcDisplayBalance() function to display balance for account1
  calcDisplayBalance(account1.movements);
  
  // Calculate and display summary for account1
  const calcDisplaySummary = (account) => {
    
    // Calculate total income from all deposits
    const incomes =  account.movements.filter(mov => mov > 0)
                              .reduce((acc, mov) => acc + mov, 0);
    
    // Calculate total amount of withdrawals (as negative value)
    const out = account.movements.filter(mov => mov < 0)
                         .reduce((acc, mov) => acc + mov, 0);     
  
    // Calculate total interest earned on all deposits (using fixed interest rate of 1.2%)
    const interest =   account.movements.filter(mov => mov > 0)
                                .map(deposit => (deposit  * account.interestRate)/100)
                                .filter((int, i, arr) => { console.log(arr); return int >= 1; })
                                .reduce((acc, int) => acc + int, 0);
  
    // Update the corresponding labels in the UI with the calculated values
    labelSumIn.textContent = `${incomes} €`;
    labelSumOut.textContent = `${Math.abs(out)} €`; 
    labelSumInterest.textContent = `${interest} €`;
  }
   
  const createUsernames = (accs) => {
    //
    accs.forEach((acc) => {
        //
        acc.username = acc.owner.toLowerCase()
                                .split(' ')
                                .map(name => name[0])
                                .join('');
    });
  };

  createUsernames(accounts);

  let currentAccount;

  //Adding event listener to BTN
  btnLogin.addEventListener('click', (e) => {
    
    //Prevent form from submitting
    e.preventDefault() 
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    // if (currentAccount?.pin === Number(inputClosePin.value)) {
    //   //Display UI and message
    //   labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    //   containerApp.style.opacity = '100';
    // }

    if(Number(inputLoginPin.value) === currentAccount?.pin) {
        
        //Display UI and message
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = '100';

        //Hide form
        loginPopup.style.display = 'none';

        //Change login modal to log out clicka after login in.

        //Clear input fields
        

        //Display movements
        displayMovements(currentAccount.movements);
        //Display Balance
        calcDisplayBalance(currentAccount.movements);
        //Display  Summary
        calcDisplaySummary(currentAccount);

        console.log('Login form has been hidden');

    } else {
        console.log('Wrong Password');
        alert('WrongPassword!');
    }
  });
    
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

/*

*/
// Finding the first withdrawal movement.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
  
const findAccount = accounts.find(accounts => accounts.owner === 'Jessica Davis');
console.log(accounts);
console.log(findAccount);