let btn = document.querySelector('#btn');

btn.addEventListener('click', function () {
    let dob = document.querySelector('#dob1').value;

    if (dob == '') {
        document.querySelector('#output').innerHTML = 'Please enter the date!';
        return;
    }

    let list = dob.split(''); //yyyy-mm-dd
    // console.log(list);

    let newList = [
        list[5],
        list[6],
        list[8],
        list[9],
        list[0],
        list[1],
        list[2],
        list[3],
    ]; //mm-dd-yyyy

    // console.log(newList);

    dob = newList.join('');
    // console.log(dob);

    let newListReversed = newList.reverse();
    let dobReversed = newListReversed.join('');
    // console.log(dobReversed);

    if (dob == dobReversed)
        document.querySelector('#output').innerHTML =
            'Your birthday is a palindrome! 🎉';
    else
        document.querySelector('#output').innerHTML =
            'Your birthday is not a palindrome! 😢';

    // function isPalindrome(str) {
    //     const array = str.split('');
    //     const reverseArray = array.reverse();
    //     const reverseStr = reverseArray.join('');

    //     if (str == reverseStr) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // dobNumber = parseInt(dob);
    // dobReversedNumber = parseInt(dobReversed);

    // function findNearestPalindrome(n) {
    //     let less = n;
    //     let more = n;
    //     while (true) {
    //         let temp1 = less.toString();
    //         let temp2 = more.toString();
    //         if (isPalindrome(temp1)) return less;
    //         if (isPalindrome(temp2)) return more;
    //         --less;
    //         ++more;
    //     }
    // }

    // console.log(findNearestPalindrome(dobNumber));
});
