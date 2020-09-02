// step 0 const add_user = document.getElementById("add_user")
const doubleBtn = document.getElementById("double")
const millionaireBtn = document.getElementById("show_millionaire")
const wealthBtn = document.getElementById("calculate_wealth")
const sortBtn = document.getElementById("sort")
const main = document.getElementById("main")



// step 1
let data = [];
getRandomUser()
getRandomUser()
getRandomUser()
// Step 2 fecth random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    // .then(res = res.json())
    // .then(data => console.log(data))
    const data = await res.json();
    console.log(data)

    // get user data
    const user = data.results[0];
    // Create an object wwith the new user and generate a random wealth sum
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    // step 4 Add data to new array using function to be created below
   addData(newUser)
    
}

// step 9 Double money
function doubleMoney(){
data = data.map(user => {
    // copy everythong in the user object using the spread operator
    return {...user, money: user.money * 2};
});

// Update dom
updateDOM();
}

// step 10 sort array
function sortByRichest(){
    // using a compare function and sorting in descending order because it iis an object we reference the money with .
    data.sort((a, b) => b.money - a.money);
        
    
    updateDOM();
    
}
// step 11 filter only millionaires gets the object and returns the objects entry and value with . 
function showMillionaires() {
   data =  data.filter(item => {
        return item.money > 1000000
    })

    updateDOM()
}

// step 12 Add all the wealth together
function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);

    console.log(formatMoney(wealth))
}



// step 5 add new object to data array
function addData(obj){
    data.push(obj)

    // step 6 UPDATE DOM
    updateDOM();
}
// step 7
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    // loop through the array using for each
    providedData.forEach(person => {
        // create div element
        const element = document.createElement('div');
       
        // Add person class
        element.classList.add('person');

        // Update tje text with data
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`
        // Append to the main element
        main.appendChild(element)

    })
}
// Step 8 format number as money
function formatMoney(number){
    return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Add Event listeners
add_user.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney)
sortBtn.addEventListener("click", sortByRichest)
millionaireBtn.addEventListener("click", showMillionaires)
wealthBtn.addEventListener("click", calculateWealth)