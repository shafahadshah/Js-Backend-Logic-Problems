// Problem 1 Reverse a string
// By Method
let str = "BackendDevelopment"
let reverse = str.split('').reverse().join('')
console.log(reverse);
// By Manual 
let rev =""
for(let i =str.length-1 ; i>=0 ;i--){
rev+=str[i]
}
console.log(rev);

// Problem 2  Check if string is palindrome
// Byt Manual
let str1 ="level"
let palindromeStr = ''
for(let i =str1.length-1 ; i>=0 ;i--){
palindromeStr+=str1[i]
}
if(str1 === palindromeStr){
    console.log('The String is Palindrome');
}else{
     console.log('The String is not Palindrome');
}
// By Method
let str2 ="level"
let palindromeStr1 = str2.split('').reverse().join('')
if(str2 === palindromeStr1){
    console.log('The String is Palindrome');
}else{
     console.log('The String is not Palindrome');
}

