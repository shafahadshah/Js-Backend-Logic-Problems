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


