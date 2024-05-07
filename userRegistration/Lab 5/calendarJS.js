// document.addEventListener("DOMContentLoaded", function () { -- not needed if script is added at the end of the body

/************************ Calendar 1 ************************/

// Query selectors
const daysContainer = document.querySelector(".days"),
    nextBtn = document.querySelector(".next"),
    prevBtn = document.querySelector(".prev"),
    todayBtn = document.querySelector(".today"),
    monthContainer = document.querySelector(".month");

// Array of Months
const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December",
];

// Array of days(weekdays)
const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// Variables
const currDate = new Date(); // Current date
let currMonth = currDate.getMonth(); // Current month
let currYear = currDate.getFullYear(); // Current year

// Functions
function createCalendar1() {

    // Get the days of the month (previous, current, and next days)
    currDate.setDate(1);
    const firstDay = new Date(currYear, currMonth, 1);
    const lastDay = new Date(currYear, currMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currYear, currMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    // Update current year and month in header
    monthContainer.innerHTML = `${months[currMonth]} ${currYear}`;

    // Update days
    let days = "";

    // Days for previous month
    for (let x = firstDay.getDay(); x > 0; x--) {
        days += `<div class = "prev day">${prevLastDayDate - x + 1}</div>`;
    }

    // Days for current month
    for (let i = 1; i <= lastDayDate; i++) {
        // Check if its today, then add today class
        if (
            i === new Date().getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
        ) {
            days += `<div class = "day today">${i}</div>`;
        } else {
            days += `<div class = "day ">${i}</div>`;
        }
    }

    // Days for next month
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class = "next day">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}

createCalendar1();

nextBtn.addEventListener("click", () => {
    // increment months
    currMonth++;
    // Check if its the last month, then move to the first month of the next year
    if (currMonth > 11) {
        currMonth = 0;
        currYear++; // increment year
    }
    createCalendar1();
});

prevBtn.addEventListener("click", () => {
    // decrement months
    currMonth--;
    // Check if its the first month, then move to the last month of the previous year
    if (currMonth < 0) {
        currMonth = 11;
        currYear--; // decrement year
    }
    createCalendar1();
});

todayBtn.addEventListener("click", () => {
    // Reset back to the current month and year
    currMonth = currDate.getMonth();
    currYear = currDate.getFullYear();
    createCalendar1();
});

/************************ Calendar 2 ************************/

// Query selectors
const select = document.querySelector(".select"),
    elementsContainer = document.querySelector(".date-elements"),
    results = document.querySelector(".result"),
    clearBtn = document.querySelector(".clearBtn");

// Functions
function createYearCalendar2() { // Create the year page

    // Update to "Select Year"
    select.innerHTML = "Select Year";

    let yearsElement = "";

    // Display the yearsElement (2010 - 2030)
    for (let year = 2010; year <= 2030; year++) {
        yearsElement += `<div class = "year">${year}</div>`;
    }
    elementsContainer.innerHTML = yearsElement;

    // Add event listener to each year element
    const yearsBtn = document.querySelectorAll(".year");
    yearsBtn.forEach(year => {
        year.addEventListener("click", () => {
            // console.log(parseInt(year.textContent));
            const yearIndex = parseInt(year.textContent);
            createMonthCalendar2(yearIndex); // After year clicked, call month page
        });
    });
}

createYearCalendar2();

function createMonthCalendar2(yearIndex) { // Create the month page

    // Update to "Select Month"
    select.innerHTML = "Select Month";

    let monthsElement = "";

    // Display the months
    for (let month = 0; month < 12; month++) {
        monthsElement += `<div class = "months">${months[month]}</div>`;
    }
    elementsContainer.innerHTML = monthsElement;

    // Add event listener to each month element
    const monthsBtn = document.querySelectorAll(".months");
    monthsBtn.forEach((month, index) => {
        month.addEventListener("click", () => {
            // console.log(index + 1);
            createDayCalendar2(yearIndex, index); // After month clicked, call day page (of selected month and year)
        });
    });
}

function createDayCalendar2(yearIndex, monthIndex) { // Create the day page

    // Update to "Select Day"
    select.innerHTML = "Select Day";

    // Get the days for the selected year and month
    const lastDay = new Date(yearIndex, monthIndex + 1, 0);
    const lastDayDate = lastDay.getDate();

    // Update days
    let daysElement = "";

    // Days for current month
    for (let i = 1; i <= lastDayDate; i++) {
        daysElement += `<div class = "day">${i}</div>`;
    }
    elementsContainer.innerHTML = daysElement;

    // Add event listener to each month element
    const daysBtn = document.querySelectorAll(".date-elements .day")
    daysBtn.forEach((day, index) => {
        day.addEventListener("click", () => {

            const dayIndex = index + 1;
            const selectDate = new Date(yearIndex, monthIndex, dayIndex);
            // console.log(selectDate);

            // Display the selected date (eg Sunday, July 10 2016)
            // Get day, date, month, and year
            const dayName = days[selectDate.getDay()];
            const date = selectDate.getDate();
            const month = months[selectDate.getMonth()];
            const year = selectDate.getFullYear();
            results.innerHTML = "Your Selected date is " + `${dayName}, ${date} ${month} ${year}`;
        });
    });
}

clearBtn.addEventListener("click", () => {
    results.innerHTML = "Your Selected date is "; // Reset/clear the selected date from the result
    createYearCalendar2(); // Display the year page again
});
// });