// Problem 1 Reverse a string
// By Method
let str90 = "BackendDevelopment"
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

// Problem 3 Count vowels in string
// By Manual
let str = 'backend'
let vo = 'aeiou'
let count =0
for(let i=0 ;i<=str.length-1;i++){
    if(vo.includes(str[i])){
count++
    }
}
console.log(count);
// By Method
let str3 ='backend'
let vo1 = 'aeiou'
let res = str3.split('').filter((i)=>vo1.includes(i)
)
console.log(res.length);

// Problem 4 Count consonants in string
// By Manual
let str4 = 'backend'
let vo2 = 'aeiou'
let count1 =0
for(let i=0 ;i<=str4.length-1;i++){
    if(!(vo2.includes(str4[i])) ){
 count1++
    }
}
console.log(count1);

// Problem 5 Count words in string
// By Method
let str5 ='backend'
let vo3 = 'aeiou'
let res1 = str5.split('').filter((i)=>!(vo1.includes(i))
)
console.log(res1.length);
// By Manual
let str6 ='backenddev'
let c =str6.length
console.log(c);
// 
let str7 = 'backenddev'
let count3 = 0
for(let i=0;i<+str7.length;i++){
    count3++
}
console.log(count3);

// Problem 6 Find longest word in string
// By Manual
let str8 ='iam backend developer'
 let long = ''
 let re = str8.split(' ')
 for(let i=0;i<=re.length-1;i++){
    if(re[i].length>long.length){
long =re[i]
    }
 }
 console.log(long);
 // By Method
let str0 = 'I am a backend developer learning JavaScript';
let longestWord = str0.split(' ').reduce((longest, current) => (current.length > longest.length ? current : longest), '');
console.log(longestWord);
