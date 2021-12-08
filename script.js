function reverseString(str) {
    let list = str.split('');
    let reversedList = list.reverse();
    let reversedString = reversedList.join('');
    return reversedString;
}

function isStringPalindrome(str) {
    return str === reverseString(str);
}

function getDateAsString(date) {
    let dateObject = {day: '', month: '', year: ''};

    if (date.day < 10) dateObject.day = '0' + date.day;
    else dateObject.day = date.day.toString();

    if (date.month < 10) dateObject.month = '0' + date.month;
    else dateObject.month = date.month.toString();

    dateObject.year = date.year.toString();
    return dateObject;
}

function getDateInAllFormats(date) {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    let dateFormatsList = getDateInAllFormats(date);
    let palindromeList = [];

    for (let i = 0; i < dateFormatsList.length; i++) {
        let result = isStringPalindrome(dateFormatsList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > monthDays[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let counter = 0;

    while (true) {
        counter++;
        let dateStr = getDateAsString(nextDate);
        let finalList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < finalList.length; i++) {
            if (finalList[i]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = monthDays[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date) {
    let previousDate = getPreviousDate(date);
    let counter = 0;

    while (true) {
        counter++;
        let dateStr = getDateAsString(previousDate);
        let finalList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < finalList.length; i++) {
            if (finalList[i]) {
                return [counter, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

var dob = document.querySelector('#dob1');
var btn = document.querySelector('#btn');
var output = document.querySelector('#output');

function clickHandler(e) {
    let bdayString = dob.value;

    if (bdayString == '') {
        output.innerHTML = 'Please enter the date!';
        return;
    }

    if (bdayString !== '') {
        let date = bdayString.split('-');
        let yyyy = date[0];
        let mm = date[1];
        let dd = date[2];

        date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };

        let dateStr = getDateAsString(date);
        let list = checkPalindromeForAllDateFormats(dateStr);
        let isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            let [counter1, nextDate] = getNextPalindromeDate(date);
            let [counter2, prevDate] = getPreviousPalindromeDate(date);

            if (counter1 < counter2)
                output.innerText = `The nearest palindrome date is ${nextDate.month}-${nextDate.day}-${nextDate.year}. You missed it by ${counter1} days! 😢`;
            else
                output.innerText = `The nearest palindrome date is ${prevDate.month}-${prevDate.day}-${prevDate.year}. You missed it by ${counter2} days! 😢`;
        } else output.innerText = 'Your birthday is a palindrome! 🎉';
    }
}

btn.addEventListener('click', clickHandler);
