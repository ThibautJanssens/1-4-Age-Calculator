
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/
//const
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//variables
let option, i;
let yearsOld;

//getting current date (month/day/year)
let currentDate = new Date(Date.now());
let currentMonth = currentDate.getMonth()+1;
let currentDay = currentDate.getDate();
let currentYear = currentDate.getFullYear();

//getting elements from html page
let yearSelect = document.getElementById("year");
let monthSelect = document.getElementById("month");
let daySelect = document.getElementById("day");

//adding listener
yearSelect.addEventListener('change', ()=>{
    newYear();
});

monthSelect.addEventListener('change', ()=>{
    newMonth();
});

daySelect.addEventListener('change', ()=>{
    newDay();
});

//generate year and push them in option (from 1900 to currentYear)
for (i = 1900; i <= currentYear; i++) {
    option = document.createElement("option");
    option.text = String(i);
    yearSelect.add(option, yearSelect[0]);
}

//generate month and push them in option
for (i = 11; i >= 0; i--) {
    option = document.createElement("option");
    option.text = months[i];
    monthSelect.add(option, monthSelect[0]);
}

newMonth();

function newYear(){
    newMonth();
    calcAge();
}

//generate day when month is changed on the front page
function newMonth() {
    let selector = document.getElementById("month");
    let value = selector[selector.selectedIndex].value;
    daySelect.options.length = 0;

    let nbrOfDays = getNbrOfDays(value);

    for (i = nbrOfDays; i > 0; i--) {
        option = document.createElement("option");
        option.text = String(i);
        daySelect.add(option, daySelect[0]);
    }
    calcAge();
}

function newDay(){
    calcAge();
}

function calcAge() {
    //get month in select and convert it to int
    let monthSelector = document.getElementById("month"); 
    let monthValue = monthSelector[monthSelector.selectedIndex].value;

    let monthInt = monthToInt(monthValue);
    
    //get the day in the select
    let daySelector = document.getElementById("day");
    let dayValue = daySelector[daySelector.selectedIndex].value;
    
    //get the year in the select
    let yearSelector = document.getElementById("year");
    let yearValue = yearSelector[yearSelector.selectedIndex].value;

    //calculate the age of the person
    currentTotal = parseInt(currentYear) * 10000 + parseInt(currentMonth) * 100 + parseInt(currentDay);
    total = yearValue * 10000 + monthInt * 100 + dayValue;
    yearsOld = Math.floor((currentTotal - total) / 10000);

    //display the age
    document.getElementById("age").innerHTML = "You currently are " + yearsOld + " years old.";
}

function monthToInt(monthString) {
    let nbr;
    switch (monthString) {
        case "January":
            nbr = 1;
            break;
        case "February":
            nbr = 2;
            break;
        case "March":
            nbr = 3;
            break;
        case "April":
            nbr = 4;
            break;
        case "May":
            nbr = 5;
            break;
        case "June":
            nbr = 6;
            break;
        case "July":
            nbr = 7;
            break;
        case "August":
            nbr = 8;
            break;
        case "September":
            nbr = 9;
            break;
        case "October":
            nbr = 10;
            break;
        case "November":
            nbr = 11;
            break;
        case "December":
            nbr = 12;
            break;
    }
    return nbr;
}

function getNbrOfDays(monthString){
    let nbrOfDays;
    switch (monthString) {
        case "January":
        case "March":
        case "May":
        case "July":
        case "August":
        case "October":
        case "December":
            nbrOfDays = 31;
            break;
        case "February":
            if(document.getElementById("year").value % 4 == 0)
                nbrOfDays = 29;
            else
                nbrOfDays = 28;
            break;
        case "April":
        case "June":
        case "September":
        case "November":
            nbrOfDays = 30;
            break;
    }
    return nbrOfDays;
}
