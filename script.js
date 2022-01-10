const reverseString = (str) => {
    let list = str.split('');
    let reversedList = list.reverse();
    let reversedString = reversedList.join('');
    return reversedString;
};

const isStringPalindrome = (str) => {
    return str === reverseString(str);
};

const getDateAsString = (date) => {
    let dateObject = {day: '', month: '', year: ''};

    if (date.day < 10) dateObject.day = '0' + date.day;
    else dateObject.day = date.day.toString();

    if (date.month < 10) dateObject.month = '0' + date.month;
    else dateObject.month = date.month.toString();

    dateObject.year = date.year.toString();
    return dateObject;
};

const getDateInAllFormats = (date) => {
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

const checkPalindromeForAllDateFormats = (date) => {
    const dateFormatsList = getDateInAllFormats(date);
    let palindromeList = [];

    for (let i = 0; i < dateFormatsList.length; i++) {
        let result = isStringPalindrome(dateFormatsList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
};

const isLeapYear = (year) => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;
    return false;
};

const getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
};

const getNextPalindromeDate = (date) => {
    let nextDate = getNextDate(date);
    let counter = 0;

    while (true) {
        counter++;
        const dateStr = getDateAsString(nextDate);
        const finalList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < finalList.length; i++) {
            if (finalList[i]) {
                return [counter, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
};

const getPreviousDate = (date) => {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
};

const getPreviousPalindromeDate = (date) => {
    let previousDate = getPreviousDate(date);
    let counter = 0;

    while (true) {
        counter++;
        const dateStr = getDateAsString(previousDate);
        const finalList = checkPalindromeForAllDateFormats(dateStr);

        for (let i = 0; i < finalList.length; i++) {
            if (finalList[i]) {
                return [counter, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
};

const dob = document.querySelector('#dob1');
const btn = document.querySelector('#btn');
const output = document.querySelector('#output');

const clickHandler = (e) => {
    const bdayString = dob.value;

    if (bdayString == '') {
        output.innerHTML = 'Please enter the date!';
        return;
    }

    if (bdayString !== '') {
        let date = bdayString.split('-');
        const yyyy = date[0];
        const mm = date[1];
        const dd = date[2];

        date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };

        const dateStr = getDateAsString(date);
        const list = checkPalindromeForAllDateFormats(dateStr);
        let isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            const [counter1, nextDate] = getNextPalindromeDate(date);
            const [counter2, prevDate] = getPreviousPalindromeDate(date);

            if (counter1 < counter2)
                output.innerText = `The nearest palindrome date is ${nextDate.month}-${nextDate.day}-${nextDate.year}. You missed it by ${counter1} days! 😢`;
            else
                output.innerText = `The nearest palindrome date is ${prevDate.month}-${prevDate.day}-${prevDate.year}. You missed it by ${counter2} days! 😢`;
        } else output.innerText = 'Your birthday is a palindrome! 🎉';
    }
};

btn.addEventListener('click', clickHandler);
