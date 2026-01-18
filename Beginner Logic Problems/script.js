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

// Problem 7  Sum of array elements
// By Manual
let arr = [1,2,3,4]
let sum=0
for(let i=0;i<=arr.length-1;i++){
    sum+=arr[i]
}
console.log(sum);
// By Method
let r = arr.reduce((acc ,aa)=>{
return acc+aa
},0)
console.log(r);

// Problem 8  Average of array elements
// By Manual
let arr1 = [1,2]
let sum1=0
let average =0 
for(let i=0;i<=arr1.length-1;i++){
    sum1+=arr1[i]
}
average=sum1/arr1.length
console.log(average);
// By Method
let r1 = arr1.reduce((acc ,aa)=>{
return acc+aa
},0)
let av =r1 / arr1.length
console.log(av);

// Problem 9  Max number in array
// By Manual
let maxArr = [1,2,3,4,5,5,67,8,9]
let max = maxArr[0]
for(let i =0 ;i<=maxArr.length-1;i++){
    if(maxArr[i]>max){
        max=maxArr[i]
    }
}
console.log(max);
// By Method
let re12= Math.max(...maxArr)
console.log(re12);

// Problem 10  Min number in array
// By Manual
let maxArr1 = [1,2,3,4,5,5,67,8,9]
let max1 = maxArr[0]
for(let i =0 ;i<=maxArr1.length-1;i++){
    if(maxArr1[i]<max1){
        max1=maxArr1[i]
    }
}
console.log(max1);
// By Method
let re1 = Math.min(...maxArr1)
console.log(re1);

// Problem 11 Find index of element manually
// By Manual
let arr2 =[1,2,3,4,5,6,7]
let target = 5
for(let i=0;i<=arr2.length-1;i++){
    if(arr2[i]===target){
        console.log(`index of ,${i}`);
        break;
    }
}
// By Method
let rr = arr2.indexOf(target)
console.log(rr);

// Problem 12 Reverse array manually
// By Manual
let arr3 = [1,2,3,4,5,6,7,8]
let rev12 = []
for(let i=arr3.length-1;i>=0;i--){
rev.push(arr3[i])
}
console.log(rev12);
// By Method
let rev1 =arr3.slice().reverse()
console.log(rev1);

// Problem 13 Remove duplicates from array
// By Manual
let dupArr = [1,2,3,4,2,1,3,4,5,6,7,8,9,1,2,3,4,112,2,3,3,4,4,5,5,6,6]
let newArrr = []
for(let i=0;i<=dupArr.length-1;i++){
    if(!newArrr.includes(dupArr[i])){
  newArrr.push(dupArr[i])
    }
}
console.log(newArrr);
// By Method
let remove = [... new Set(dupArr)]
console.log(remove);

// Problem 14 Rotate array by N positions
// By Manual
let arr4 = [1, 2, 3, 4, 5,6];
let N = 6;
let L = arr4.length;
N = N % L;   
let newArr = [];

for (let i = 0; i < L; i++) {
    let newIndex = (i + N) % L;
    newArr[newIndex] = arr4[i];
}
console.log("Original:", arr4);
console.log("Rotated:", newArr);
//By Method
let arr12 = [1, 2, 3, 4, 5];
let N1 = 2;
let L1= arr12.length;
N1 = ((N1 % L1) + L1) % L1; 
let rotatedArr = arr12.slice(-N1).concat(arr12.slice(0, L1 - N1));
console.log("Original:", arr12);
console.log("Rotated:", rotatedArr);

// // Problem 15 Find missing number in array 1 to N
// By Method
let arra = [1, 2, 3, 5, 6];
let Na= 6;
let totalSum = (Na * (Na + 1)) / 2;         
let arrSum = arra.reduce((a, b) => a + b, 0); 
let missingSumMethod = totalSum - arrSum;
console.log("Missing number (Sum Formula):", missingSumMethod); 
// BY Manual
let missingLoopMethod;
for (let i = 1; i <= Na; i++) {
    if (!arra.includes(i)) {
        missingLoopMethod = i;
        break;
    }
}
console.log("Missing number (Manual Loop):", missingLoopMethod); 


// obj.b=3

// Problem 16 Sum of first N natural numbers
// By Manual
let Num = 5
let sum23=0
for(let i=0;i<=Num;i++){
sum23+=i
}
console.log(sum23);
// By Method
let num=5
let sum2=num *(num+1)/2
console.log(sum2);

// Problem 17 Factorial of number
// By Manual
let factorail =5
let newfact =1
for(i =1 ;i<=factorail;i++){
    newfact*=i
}
console.log(newfact);


// Problem 18 Fibonacci series (loop)
// // By Manual Loop
let n = 8;       
let a = 0, b = 1;
console.log(a);  
console.log(b);  

for (let i = 3; i <= n; i++) {
    let next = a + b;
    console.log(next);  
    b = next;           
}
// By Array
let na = 8;                     
let arr23 = [0, 1];             
for (let i = 2; i < na; i++) {
    arr23[i] = arr23[i - 1] + arr23[i - 2]; 
}
console.log(arr23);

//  Problem 19 Check if number is prime
let numn = 7;
let isPrime = numn > 1;
for (let i = 2; i * i < numn && isPrime; i++) {
  if (numn% i === 0) isPrime = false;
}
console.log(isPrime ? "Prime" : "Not Prime");

// Problem 20 Check if number is Armstrong number
function isArmstrong(num) {
    let strNum = num.toString();
    let summn = 0;
    let nnn = strNum.length;
    for (let i = 0; i < nnn; i++) {
        summn += Math.pow(Number(strNum[i]), nnn);
    }
    return summn === num;
}
console.log(isArmstrong(153)); 
console.log(isArmstrong(123)); 

// Problem 21 Sum digits of a number
function sumDigits(n) {
  let summm = 0;
  for (const ch of String(Math.abs(n))) {
    summm += ch.charCodeAt(0) - 48; // faster than Number()
  }
  return summm;
}
console.log(sumDigits(12345678901234567890n));

// Problem 22 Reverse digits of a number
function reverseNumber(num) {
  return Number(String(num).split('').reverse().join(''));
}
// Example
console.log(reverseNumber(12345)); // 54321

// Problem 23 Count digits of number
function countDigits(n) {
  return Math.abs(n).toString().length;
}
countDigits(12345);

// Problem 24 GCD of two numbers
function gcd(a, b) {
  // Convert to BigInt in case numbers are very large
  a = BigInt(a);
  b = BigInt(b);
  // Keep looping until the second number becomes 0
  for (; b !== 0n;) {
    let temp = b;   // store b temporarily
    b = a % b;      // set b to remainder of a divided by b
    a = temp;       // set a to old b
  }
  return a;  // a now contains the GCD
}

// Problem 25 LCM of two numbers
function lcm(a, b) {
    // Start from the maximum of a and b
    let maxxi = a > b ? a : b;

    // Keep checking multiples of max until divisible by both a and b
    for (let i = maxxi; ; i += maxxi) { // increment by max to reduce iterations
        if (i % a === 0 && i % b === 0) {
            return i;
        }
    }
}
// Example usage:
let number1 = 12;
let number2 = 18;

console.log(`LCM of ${number1} and ${number2} is: ${lcm(number1, number2)}`);

// Problem 26 Check perfect number
function isPerfectNumber(n) {
  if (n <= 1) return false;
  let sum = 1; // 1 is always a divisor
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) {
        sum += n / i;
      }
    }
  }
  return sum === n;
}
// Examples
console.log(isPerfectNumber(6));    // true
console.log(isPerfectNumber(28));   // true
console.log(isPerfectNumber(12));   // false

// Problem 27 Check abundant/deficient number
function checkNumberType(n) {
  if (n <= 0) return 'Invalid input, enter a positive integer';
  let sum = 1; // 1 is always a divisor (except for n=1 itself)
  const sqrt = Math.sqrt(n);
  if (n === 1) return 'Deficient'; // special case
  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) {
      sum += i;
      const otherDiv = n / i;
      if (otherDiv !== i) sum += otherDiv; // add paired divisor only if different
    }
  }
  if (sum === n) return 'Perfect';
  else if (sum > n) return 'Abundant';
  else return 'Deficient';
}
// Example usage:
console.log(checkNumberType(12));   // Abundant
console.log(checkNumberType(28));   // Perfect
console.log(checkNumberType(15));   // Deficient
console.log(checkNumberType(1));    // Deficient
console.log(checkNumberType(945));  // Abundant (large number)

// Problem 28 Decimal to binary conversion
let decimal = 10;
let binary = decimal.toString(2);
console.log(binary); // 1010

// Problem 29 Decimal to hexadecimal conversion
const dec = 255;
const hex = dec.toString(16);
console.log(hex); // "ff"

// Problem 30 Decimal to octal conversion
function decimalToOctal(decimal) {
  return decimal.toString(8);
}

// Example
const numberrr = 83;
console.log(`Decimal: ${numberrr}`);
console.log(`Octal: ${decimalToOctal(numberrr)}`);

// Problem 31 Count frequency of array elements
const array = [1, 2, 2, 3, 3, 3];
const freq = {};
for (const el of array) {
  freq[el] = (freq[el] || 0) + 1;
}
console.log(freq);
// {1: 1, 2: 2, 3: 3}
