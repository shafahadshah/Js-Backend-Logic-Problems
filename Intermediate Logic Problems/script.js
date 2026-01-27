//  Problem 51 Reverse String
function reverseString(str) {
  if (str.length <= 1) return str;
  return reverseString(str.slice(1)) + str[0];
}

console.log(reverseString("hello")); // olleh


//  Problem 52 Factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

//  Problem 53 Fibonacci
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];

  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
console.log(fibonacci(10)); // 55

//  Problem 54 Count Vowels
function countVowels(str, i = 0) {
  if (i === str.length) return 0;

  const vowels = "aeiouAEIOU";
  return (vowels.includes(str[i]) ? 1 : 0) + countVowels(str, i + 1);
}

console.log(countVowels("Javascript")); // 3

//  Problem 55 Palindrome Check
function isPalindrome(str, left = 0, right = str.length - 1) {
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;

  return isPalindrome(str, left + 1, right - 1);
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false

//  Problem 56 Find max in nested array
function findMax(arr) {
  let max = -Infinity;
  for (let item of arr) {
    if (Array.isArray(item)) {
      max = Math.max(max, findMax(item));
    } else {
      max = Math.max(max, item);
    }
  }
  return max;
}
console.log(findMax([1, [3, 5], [7, [2, 9]]])); // 9


//  Problem 57 Flatten nested array
function flattenArray(arr, res = []) {
  for (let item of arr) {
    Array.isArray(item) ? flattenArray(item, res) : res.push(item);
  }
  return res;
}
console.log(flattenArray([1, [2, [3, [4]]]]));
// [1, 2, 3, 4]


//  Problem 58 Deep clone object
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}
const a = { x: 1, y: { z: 2 } };
const b = deepClone(a);
b.y.z = 99;
console.log(a.y.z); // 2

//  Problem 59 Deep compare objects
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null)
    return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
}
console.log(deepEqual({a:1,b:{c:2}}, {a:1,b:{c:2}})); // true
