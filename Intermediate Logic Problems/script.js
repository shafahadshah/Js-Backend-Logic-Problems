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
