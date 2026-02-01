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


//  Problem 60 Count keys in nested object
function countKeys(obj) {
  if (typeof obj !== "object" || obj === null) return 0;
  return Object.keys(obj).reduce(
    (count, key) => count + 1 + countKeys(obj[key]),
    0
  );
}
console.log(countKeys({a:1, b:{c:2, d:{e:3}}})); // 5


//  Problem 61 Search value in a nested object
function hasValue(obj, target) {
  return Object.values(obj).some(v =>
    v === target ||
    (v && typeof v === "object" && hasValue(v, target))
  );
}
// Example
const data = { a: 1, b: { c: 2, d: { e: 3 } } };
console.log(hasValue(data, 3)); // true
console.log(hasValue(data, 5)); // false

//  Problem 62 Merge two objects
const mergeObjects = (a, b) => ({ ...a, ...b });
// Example
console.log(mergeObjects(
  { x: 1, y: 2 },
  { y: 99, z: 3 }
));
// { x: 1, y: 99, z: 3 }

//  Problem 63 Remove property from object
function removeProp(obj, prop) {
  const { [prop]: _, ...rest } = obj;
  return rest;
}

// Example
const user = { id: 1, name: "Alex", age: 25 };
console.log(removeProp(user, "age"));
// { id: 1, name: "Alex" }


//  Problem 64 Convert array of objects to object by key
function arrayToObject(arr, key) {
  return Object.fromEntries(arr.map(item => [item[key], item]));
}

// Example
const users = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }
];
console.log(arrayToObject(users, "id"));
/*
{
  1: { id: 1, name: "A" },
  2: { id: 2, name: "B" }
}
*/


//  Problem 65 Filter array of objects by property
const filterByProp = (arr, key, value) =>
  arr.filter(obj => obj[key] === value);

// Example
const products = [
  { name: "Phone", type: "tech" },
  { name: "Shirt", type: "clothes" }
];

console.log(filterByProp(products, "type", "tech"));
// [{ name: "Phone", type: "tech" }]

//  Problem 66 Sort array of objects by property
function sortByAge(arr) {
  return arr.sort((a, b) => a.age - b.age);
}

// Call
const users1 = [
  { name: "A", age: 30 },
  { name: "B", age: 20 },
  { name: "C", age: 25 }
];

console.log(sortByAge(users1));


//  Problem 67 Group array of objects by property
function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    (acc[obj[key]] ||= []).push(obj);
    return acc;
  }, {});
}

// Call
const people = [
  { name: "A", city: "NY" },
  { name: "B", city: "LA" },
  { name: "C", city: "NY" }
];

console.log(groupBy(people, "city"));


//  Problem 68 Detect duplicates in array of objects by key
function findDuplicates(arr, key) {
  const seen = new Set();
  return arr.filter(obj => {
    if (seen.has(obj[key])) return true;
    seen.add(obj[key]);
    return false;
  });
}

// Call
const data1= [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "C" }
];

console.log(findDuplicates(data1, "id"));

//  Problem 69 Simulate Stack (Array)
const stack = [];

// Push
stack.push(10);
stack.push(20);

// Pop
console.log(stack.pop()); // 20
console.log(stack);       // [10]

//  Problem 70 Simulate Queue (Array)
const queue = [];

// Enqueue
queue.push(10);
queue.push(20);

// Dequeue
console.log(queue.shift()); // 10
console.log(queue);         // [20]

//  Problem 71 Simulate Deque
function Deque() {
  this.items = [];
}
Deque.prototype.addFront = function (val) {
  this.items.unshift(val);
};
Deque.prototype.addRear = function (val) {
  this.items.push(val);
};
Deque.prototype.removeFront = function () {
  return this.items.shift();
};
Deque.prototype.removeRear = function () {
  return this.items.pop();
};
Deque.prototype.peekFront = function () {
  return this.items[0];
};
Deque.prototype.peekRear = function () {
  return this.items[this.items.length - 1];
};
// CALLS
const dq = new Deque();
dq.addRear(10);
dq.addRear(20);
dq.addFront(5);
console.log(dq.items);        // [5, 10, 20]
console.log(dq.peekFront()); // 5
console.log(dq.peekRear());  // 20
dq.removeFront();
dq.removeRear();
console.log(dq.items);       // [10]


//  Problem 72 Manual map()
function manualMap(arr, callback) {
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    result[i] = callback(arr[i], i, arr);
  }

  return result;
}

// CALL
const mapArr = [1, 2, 3, 4];
const mapResult = manualMap(mapArr, x => x * 2);

console.log(mapResult); // [2, 4, 6, 8]


//  Problem 73 Manual filter()
function manualFilter(arr, callback) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
}

// CALL
const filterArr = [1, 2, 3, 4, 5, 6];
const filterResult = manualFilter(filterArr, x => x % 2 === 0);

console.log(filterResult); // [2, 4, 6]


//  Problem 74 Manual reduce()
function manualReduce(arr, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callback(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

// CALL
const reduceArr = [1, 2, 3, 4];
const reduceResult = manualReduce(reduceArr, (a, b) => a + b, 0);

console.log(reduceResult); // 10

//  Problem 75 Manual find()
function manualFind(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
}

// CALL
const findArr = [4, 9, 12, 7];
const findResult = manualFind(findArr, x => x > 10);

console.log(findResult); // 12

//  Problem 76 Find Common Elements in Multiple Arrays
function findCommonElements(arrays) {
  const map = new Map();
  const total = arrays.length;

  for (let arr of arrays) {
    const unique = new Set(arr);
    for (let val of unique) {
      map.set(val, (map.get(val) || 0) + 1);
    }
  }

  const result = [];
  for (let [key, count] of map) {
    if (count === total) result.push(key);
  }

  return result;
}

// CALL
const arr1 = [1, 2, 3, 4];
const arr2 = [2, 3, 5, 6];
const arr3 = [2, 3, 7];

console.log(findCommonElements([arr1, arr2, arr3])); // [2, 3]

//  Problem 77 Find missing elements in multiple array 
function findMissingFromOthers(arrays) {
  const reference = arrays[0];
  const otherSet = new Set();

  for (let i = 1; i < arrays.length; i++) {
    for (let val of arrays[i]) {
      otherSet.add(val);
    }
  }

  const missing = [];
  for (let val of reference) {
    if (!otherSet.has(val)) {
      missing.push(val);
    }
  }

  return missing;
}

// CALL
const a1 = [1, 2, 3, 4, 5];
const a2 = [2, 3];
const a3 = [1, 4];

console.log(findMissingFromOthers([a1, a2, a3]));
// [5]


//  Problem 78 Check if two arrays contain same elements
function sameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const map = new Map();

  for (let x of arr1) map.set(x, (map.get(x) || 0) + 1);
  for (let x of arr2) {
    if (!map.has(x) || map.get(x) === 0) return false;
    map.set(x, map.get(x) - 1);
  }
  return true;
}

console.log(sameElements([1,2,3], [3,2,1])); // true
console.log(sameElements([1,2,2], [2,1,1])); // false


//  Problem 79 Longest substring without repeating characters
function longestSubstring(s) {
  let set = new Set(), left = 0, max = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}

console.log(longestSubstring("abcabcbb")); // 3
console.log(longestSubstring("bbbbb")); // 1


//  Problem 80 Count total characters in array of strings
function countChars(arr) {
  return arr.reduce((sum, str) => sum + str.length, 0);
}

console.log(countChars(["hello", "world"])); // 10

//  Problem 81 Merge multiple arrays
function mergeArrays(...arrays) {
  return arrays.flat();
}

console.log(mergeArrays([1,2], [3,4], [5])); // [1,2,3,4,5]

//  Problem 82 Rotate matrix clockwise (90°)
function rotateClockwise(matrix) {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => Array(n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res[j][n - i - 1] = matrix[i][j];
    }
  }
  return res;
}

console.log(rotateClockwise([
  [1,2,3],
  [4,5,6],
  [7,8,9]
]));


//  Problem 83 Rotate matrix anti-clockwise (90°)
function rotateAntiClockwise(matrix) {
  const n = matrix.length;
  const res = Array.from({ length: n }, () => Array(n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res[n - j - 1][i] = matrix[i][j];
    }
  }
  return res;
}

console.log(rotateAntiClockwise([
  [1,2,3],
  [4,5,6],
  [7,8,9]
]));


//  Problem 84 Spiral Order Traversal of Matrix
function spiralOrder(matrix) {
  if (!matrix.length) return [];

  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  const result = [];

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;

    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
}

// Call
console.log(spiralOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]));


//  Problem 85 BFS Traversal of Tree / Object Structure
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);

    if (node.children) {
      for (const child of node.children) {
        queue.push(child);
      }
    }
  }
  return result;
}

// Call
const tree = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4 }] },
    { value: 3, children: [{ value: 5 }, { value: 6 }] }
  ]
};

console.log(bfs(tree));


//  Problem 86 DFS Traversal of Tree / Object Structure
function dfs(root) {
  const result = [];

  function traverse(node) {
    if (!node) return;
    result.push(node.value);

    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(root);
  return result;
}

// Call
console.log(dfs(tree));



//  Problem 87 Detect Cycle in Graph (Directed)
function hasCycle(graph) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }

    stack.delete(node);
    return false;
  }

  for (const node in graph) {
    if (dfs(node)) return true;
  }
  return false;
}

// Call
const graph = {
  A: ["B"],
  B: ["C"],
  C: ["A"]
};

console.log(hasCycle(graph));
