//  Problem 121 Stack with push/pop
class Stack {
    constructor() { this.items = []; }
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}

// Example
const stack = new Stack();
stack.push(1); stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1


//  Problem 122 Queue with enqueue/dequeue
class Queue {
    constructor() { this.items = []; }
    enqueue(item) { this.items.push(item); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}

// Example
const queue = new Queue();
queue.enqueue(1); queue.enqueue(2);
console.log(queue.dequeue()); // 1
console.log(queue.front()); // 2


//  Problem 123 Deque (Double-ended Queue)
class Deque3 {
    constructor() { this.items = []; }
    addFront(item) { this.items.unshift(item); }
    addRear(item) { this.items.push(item); }
    removeFront() { return this.items.shift(); }
    removeRear() { return this.items.pop(); }
    peekFront() { return this.items[0]; }
    peekRear() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}

// Example
const deque3= new Deque();
deque3.addRear(1); deque3.addFront(0);
console.log(deque3.removeRear()); // 1
console.log(deque3.peekFront()); // 0


//  Problem 124 Priority Queue
class PriorityQueue {
    constructor() { this.items = []; }
    enqueue(item, priority) {
        const element = { item, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, element);
                added = true;
                break;
            }
        }
        if (!added) this.items.push(element);
    }
    dequeue() { return this.items.shift()?.item; }
    isEmpty() { return this.items.length === 0; }
}

// Example
const pq = new PriorityQueue();
pq.enqueue('task1', 2); pq.enqueue('task2', 1);
console.log(pq.dequeue()); // 'task2' (higher priority)

//  Problem 125 Singly Linked List
class Node {
    constructor(value) { this.value = value; this.next = null; }
}

class LinkedList {
    constructor() { this.head = null; }
    append(value) {
        const node = new Node(value);
        if (!this.head) { this.head = node; return; }
        let current = this.head;
        while (current.next) current = current.next;
        current.next = node;
    }
    print() {
        let current = this.head;
        const values = [];
        while (current) { values.push(current.value); current = current.next; }
        console.log(values.join(' -> '));
    }
}

// Example
const list = new LinkedList();
list.append(1); list.append(2); list.append(3);
list.print(); // 1 -> 2 -> 3


//  Problem 126 Implementation of Doubly Linked List
class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  insert(val) {
    let n = new Node(val);

    if (!this.head) {
      this.head = n;
      return;
    }

    let t = this.head;
    while (t.next) t = t.next;

    t.next = n;
    n.prev = t;
  }

  display() {
    let t = this.head;
    while (t) {
      console.log(t.val);
      t = t.next;
    }
  }
}



//  Problem 127 Implementation of Circular Linked List
class CircularLinkedList {
  constructor() {
    this.head = null;
  }

  insert(val) {
    let n = { val, next: null };

    if (!this.head) {
      this.head = n;
      n.next = this.head;
      return;
    }

    let t = this.head;
    while (t.next !== this.head) t = t.next;

    t.next = n;
    n.next = this.head;
  }

  display(count) {
    let t = this.head;
    while (count--) {
      console.log(t.val);
      t = t.next;
    }
  }
}


 
//  Problem 128 Manual Implementation of Hash Map
class HashMap {
  constructor() {
    this.data = {};
  }

  put(key, val) {
    this.data[key] = val;
  }

  get(key) {
    return this.data[key];
  }

  remove(key) {
    delete this.data[key];
  }
}



 
//  Problem 129 Manual Implementation of Set
class MySet {
  constructor() {
    this.data = {};
  }

  add(val) {
    this.data[val] = true;
  }

  has(val) {
    return this.data[val] === true;
  }

  remove(val) {
    delete this.data[val];
  }
}



 
//  Problem 130 Graph Implementation Using Adjacency List
class GraphAdjList {
  constructor() {
    this.graph = {};
  }

  addVertex(v) {
    if (!this.graph[v]) this.graph[v] = [];
  }

  addEdge(a, b) {
    this.graph[a].push(b);
    this.graph[b].push(a);
  }

  display() {
    console.log(this.graph);
  }
}


 
//  Problem 131 Graph Implementation Using Adjacency Matrix
class GraphAdjMatrix {
  constructor(n) {
    this.matrix = Array.from({ length: n }, () =>
      Array(n).fill(0)
    );
  }

  addEdge(i, j) {
    this.matrix[i][j] = 1;
    this.matrix[j][i] = 1;
  }

  display() {
    console.log(this.matrix);
  }
}


 
//  Problem 132 Breadth First Search (BFS) Traversal of Graph
function bfs(graph, start) {
  let visited = {};
  let queue = [];

  queue.push(start);
  visited[start] = true;

  while (queue.length) {
    let v = queue.shift();
    console.log(v);   // console output

    graph[v].forEach(n => {
      if (!visited[n]) {
        visited[n] = true;
        queue.push(n);
      }
    });
  }
}


 
//  Problem 133 DFS Traversal of Graph
function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);

  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// Call
const graphDFS = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: [],
  E: []
};

dfs(graphDFS, "A");


 
//  Problem 134 Detect Cycle in Graph Undirected Graph
function hasCycleUndirected(graph) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (let nbr of graph[node]) {
      if (!visited.has(nbr)) {
        if (dfs(nbr, node)) return true;
      } else if (nbr !== parent) {
        return true;
      }
    }
    return false;
  }

  for (let node in graph) {
    if (!visited.has(node) && dfs(node, null)) return true;
  }
  return false;
}

// Call
const undirected = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B", "A"]
};

console.log(hasCycleUndirected(undirected));
 
//  Problem 134 Detect Cycle in Graph Directed Graph
function hasCycleDirected(graph) {
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (let nbr of graph[node]) {
      if (dfs(nbr)) return true;
    }
    stack.delete(node);
    return false;
  }

  for (let node in graph) {
    if (dfs(node)) return true;
  }
  return false;
}

// Call
const directed = {
  A: ["B"],
  B: ["C"],
  C: ["A"]
};

console.log(hasCycleDirected(directed));


//  Problem 135 Shortest Path using BFS
function bfsShortestPath(graph, start, end) {
  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;

    for (let nbr of graph[node]) {
      if (!visited.has(nbr)) {
        visited.add(nbr);
        queue.push([nbr, dist + 1]);
      }
    }
  }
  return -1;
}

// Call
const graphBFS = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D"],
  D: []
};

console.log(bfsShortestPath(graphBFS, "A", "D"));


//  Problem 136 Dijkstra’s Algorithm
function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();

  for (let node in graph) dist[node] = Infinity;
  dist[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let minNode = null;
    for (let node in dist) {
      if (!visited.has(node) &&
          (minNode === null || dist[node] < dist[minNode])) {
        minNode = node;
      }
    }

    visited.add(minNode);
    for (let [nbr, weight] of graph[minNode]) {
      dist[nbr] = Math.min(dist[nbr], dist[minNode] + weight);
    }
  }
  return dist;
}

// Call
const graphDij = {
  A: [["B", 1], ["C", 4]],
  B: [["C", 2], ["D", 5]],
  C: [["D", 1]],
  D: []
};

console.log(dijkstra(graphDij, "A"));


//  Problem 137 Bellman-Ford Algorithm
function bellmanFord(edges, vertices, start) {
  const dist = Array(vertices).fill(Infinity);
  dist[start] = 0;

  for (let i = 0; i < vertices - 1; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  return dist;
}

// Call
const edges = [
  [0, 1, 4],
  [0, 2, 5],
  [1, 2, -3],
  [2, 3, 4]
];

console.log(bellmanFord(edges, 4, 0));


//  Problem 138 Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(a, b) {
  let res = [];
  while (a.length && b.length) {
    res.push(a[0] < b[0] ? a.shift() : b.shift());
  }
  return res.concat(a, b);
}

// Call
console.log(mergeSort([5, 3, 8, 4, 2]));


//  Problem 139 Quick Sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [], right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Call
console.log(quickSort([10, 7, 8, 9, 1, 5]));


//  Problem 140 Heap Sort (Max Heap)
function heapSort(arr) {
  let n = arr.length;

  const heapify = (i, size) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < size && arr[l] > arr[largest]) largest = l;
    if (r < size && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(largest, size);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(i, n);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(0, i);
  }
  return arr;
}

console.log(heapSort([4, 10, 3, 5, 1]));



//  Problem 141 Build Binary Tree (from array)
class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function buildTree(arr, i = 0) {
  if (i >= arr.length || arr[i] === null) return null;
  let root = new Node(arr[i]);
  root.left = buildTree(arr, 2 * i + 1);
  root.right = buildTree(arr, 2 * i + 2);
  return root;
}

let tree = buildTree([1, 2, 3, 4, 5]);
console.log(tree);



//  Problem 142 BST Insert / Search / Delete
class BST {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }

  insert(val) {
    if (val < this.val)
      this.left ? this.left.insert(val) : this.left = new BST(val);
    else
      this.right ? this.right.insert(val) : this.right = new BST(val);
  }

  search(val) {
    if (this.val === val) return true;
    if (val < this.val) return this.left?.search(val) || false;
    return this.right?.search(val) || false;
  }
}

let bst = new BST(10);
[5, 15, 3, 7].forEach(v => bst.insert(v));
console.log(bst.search(7)); // true
console.log(bst.search(20)); // false



//  Problem 143 Check if Tree is Balanced
function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    let l = height(node.left);
    let r = height(node.right);
    if (l === -1 || r === -1 || Math.abs(l - r) > 1) return -1;
    return Math.max(l, r) + 1;
  }
  return height(root) !== -1;
}

console.log(isBalanced(tree));


//  Problem 144 Lowest Common Ancestor in BST
function LCA(root, p, q) {
  if (!root) return null;
  if (p < root.val && q < root.val) return LCA(root.left, p, q);
  if (p > root.val && q > root.val) return LCA(root.right, p, q);
  return root.val;
}

console.log(LCA(bst, 3, 7));


//  Problem 145 Build Trie from Word List
class TrieNode {
  constructor() {
    this.children = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.end = true;
  }
}

let trie = new Trie();
["cat", "car", "dog"].forEach(w => trie.insert(w));
console.log(trie);


//  Problem 146 Word Autocomplete Using Trie
Trie.prototype.autocomplete = function(prefix) {
  let node = this.root;
  for (let ch of prefix) {
    if (!node.children[ch]) return [];
    node = node.children[ch];
  }

  let res = [];
  const dfs = (n, path) => {
    if (n.end) res.push(path);
    for (let c in n.children) dfs(n.children[c], path + c);
  };

  dfs(node, prefix);
  return res;
};

console.log(trie.autocomplete("ca"));


//  Problem 147 Implement LRU Cache
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    let val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size === this.cap)
      this.map.delete(this.map.keys().next().value);

    this.map.set(key, val);
  }
}

let lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // 1
lru.put(3, 3);
console.log(lru.get(2)); // -1


 

//  Problem 148 LFU Cache (O(1) average)
class LFUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.minFreq = 0;
    this.keyMap = new Map(); // key -> {val, freq}
    this.freqMap = new Map(); // freq -> Set(keys)
  }

  get(key) {
    if (!this.keyMap.has(key)) return -1;
    this._updateFreq(key);
    return this.keyMap.get(key).val;
  }

  put(key, val) {
    if (this.cap === 0) return;

    if (this.keyMap.has(key)) {
      this.keyMap.get(key).val = val;
      this._updateFreq(key);
      return;
    }

    if (this.keyMap.size >= this.cap) {
      const evictKey = this.freqMap.get(this.minFreq).values().next().value;
      this.freqMap.get(this.minFreq).delete(evictKey);
      this.keyMap.delete(evictKey);
    }

    this.keyMap.set(key, { val, freq: 1 });
    this.freqMap.set(1, (this.freqMap.get(1) || new Set()).add(key));
    this.minFreq = 1;
  }

  _updateFreq(key) {
    const obj = this.keyMap.get(key);
    const f = obj.freq;
    this.freqMap.get(f).delete(key);
    if (f === this.minFreq && this.freqMap.get(f).size === 0) this.minFreq++;
    obj.freq++;
    this.freqMap.set(obj.freq, (this.freqMap.get(obj.freq) || new Set()).add(key));
  }
}

// demo
const lfu = new LFUCache(2);
lfu.put(1, 1); lfu.put(2, 2);
console.log(lfu.get(1)); // 1
lfu.put(3, 3);
console.log(lfu.get(2)); // -1


 

//  Problem 149 Job Queue Logic
class JobQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(job) {
    this.queue.push(job);
    this.run();
  }

  async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length) {
      const job = this.queue.shift();
      await job();
    }

    this.running = false;
  }
}

// demo
const jq = new JobQueue();
jq.add(() => new Promise(r => setTimeout(() => (console.log("Job 1"), r()), 500)));
jq.add(() => Promise.resolve(console.log("Job 2")));

 

//  Problem 150 Retry Logic with Exponential Backoff
async function retry(fn, retries = 3, delay = 200) {
  try {
    return await fn();
  } catch (e) {
    if (retries === 0) throw e;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

// demo
retry(() => Math.random() > 0.7 ? "OK" : Promise.reject("Fail"))
  .then(console.log)
  .catch(console.error);

 

//  Problem 151 Token Bucket Rate Limiter
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    setInterval(() => {
      this.tokens = Math.min(this.capacity, this.tokens + refillRate);
    }, 1000);
  }

  allow() {
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }
}

// demo
const tb = new TokenBucket(3, 1);
setInterval(() => console.log("Allowed:", tb.allow()), 300);

 

//  Problem 152 Leaky Bucket Rate Limiter
class LeakyBucket {
  constructor(limit, leakRate) {
    this.queue = [];
    setInterval(() => {
      if (this.queue.length) this.queue.shift()();
    }, leakRate);
  }

  add(req) {
    if (this.queue.length >= limit) return false;
    this.queue.push(req);
    return true;
  }
}

// demo
const lb = new LeakyBucket(2, 1000);
console.log(lb.add(() => console.log("Req 1")));
console.log(lb.add(() => console.log("Req 2")));
console.log(lb.add(() => console.log("Rejected")));

 

//  Problem 153 Base64 Encode / Decode
// encode
const encodeBase64 = str =>
  Buffer.from(str, "utf8").toString("base64");

// decode
const decodeBase64 = str =>
  Buffer.from(str, "base64").toString("utf8");

// demo
const encoded = encodeBase64("hello world");
console.log(encoded);
console.log(decodeBase64(encoded));


 

//  Problem 154 Caesar Cipher (Encrypt / Decrypt)
// Caesar Cipher
function caesarCipher(str, shift, decrypt = false) {
  const s = decrypt ? -shift : shift;
  return str.replace(/[a-z]/gi, char => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + s + 26) % 26) + base
    );
  });
}

// Usage
const encrypted = caesarCipher("HelloWorld", 3);
console.log("Encrypted:", encrypted);

const decrypted = caesarCipher(encrypted, 3, true);
console.log("Decrypted:", decrypted);



 

//  Problem 155 XOR Cipher (Encrypt / Decrypt)
// XOR Cipher
function xorCipher(str, key) {
  return str
    .split("")
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join("");
}

// Usage
const xorEncrypted = xorCipher("SecretMessage", "key");
console.log("Encrypted:", xorEncrypted);

const xorDecrypted = xorCipher(xorEncrypted, "key");
console.log("Decrypted:", xorDecrypted);



 

//  Problem 156 Simple Hash Function
// Simple Hash (Fast DJB2 variant)
function simpleHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // unsigned
}

// Usage
console.log("Hash:", simpleHash("HelloWorld"));



 

//  Problem 157 Simulate Database Filtering
// Database Filtering
function filterDB(data, filters) {
  return data.filter(item =>
    Object.keys(filters).every(key => item[key] === filters[key])
  );
}

// Usage
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" }
];

console.log("Filtered:", filterDB(users, { role: "user" }));


 

//  Problem 158 Simulate Table Joins
// Table Join
function joinTables(tableA, tableB, key, type = "inner") {
  const map = new Map(tableB.map(item => [item[key], item]));
  
  return tableA.map(a => {
    const match = map.get(a[key]);
    if (match) return { ...a, ...match };
    if (type === "left") return { ...a };
    return null;
  }).filter(Boolean);
}

// Usage
const orders = [
  { orderId: 1, userId: 1 },
  { orderId: 2, userId: 2 }
];

const customers = [
  { userId: 1, name: "Alice" }
];

console.log("Inner Join:", joinTables(orders, customers, "userId"));
console.log("Left Join:", joinTables(orders, customers, "userId", "left"));


 

//  Problem 159 Simulate User Sessions with Expiry
// Session Manager
class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  create(userId, ttlMs) {
    const token = Math.random().toString(36).slice(2);
    this.sessions.set(token, { userId, expiry: Date.now() + ttlMs });
    return token;
  }

  validate(token) {
    const session = this.sessions.get(token);
    if (!session || session.expiry < Date.now()) {
      this.sessions.delete(token);
      return false;
    }
    return true;
  }
}

// Usage
const sm = new SessionManager();
const token = sm.create("user1", 2000);
console.log("Valid:", sm.validate(token));

setTimeout(() => {
  console.log("After Expiry:", sm.validate(token));
}, 2500);

 

//  Problem 160 Role-Based Access Control (RBAC)
// RBAC
class RBAC {
  constructor() {
    this.roles = {
      admin: ["create", "read", "update", "delete"],
      user: ["read"],
      editor: ["read", "update"]
    };
  }

  can(role, action) {
    return this.roles[role]?.includes(action) || false;
  }
}

// Usage
const rbac = new RBAC();

console.log("Admin delete:", rbac.can("admin", "delete"));
console.log("User delete:", rbac.can("user", "delete"));

 

//  Problem 161 Simulate Locking / Mutex Logic
class Mutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  lock() {
    return new Promise(resolve => {
      if (!this.locked) {
        this.locked = true;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }

  unlock() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.locked = false;
    }
  }
}

// Usage
const mutex = new Mutex();

async function task(name) {
  await mutex.lock();
  console.log(`${name} acquired lock`);
  await new Promise(r => setTimeout(r, 1000));
  console.log(`${name} releasing lock`);
  mutex.unlock();
}

task("A");
task("B");

 

//  Problem 162 Data Deduplication Logic
function dedupeArray(arr) {
  return [...new Set(arr)];
}

// Usage
const nums = [1, 2, 2, 3, 4, 4, 5];
console.log("Deduped:", dedupeArray(nums));

 

//  Problem 163 CSV Parser Logic
function parseCSV(str) {
  const [headerLine, ...rows] = str.trim().split("\n");
  const headers = headerLine.split(",");

  return rows.map(row => {
    const values = row.split(",");
    return headers.reduce((obj, key, i) => {
      obj[key.trim()] = values[i].trim();
      return obj;
    }, {});
  });
}

// Usage
const csv = `name,age
John,25
Jane,30`;

console.log(parseCSV(csv));

 

//  Problem 164 XML Parser Logic
function parseXML(xmlStr) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlStr, "application/xml");

  return {
    name: xml.querySelector("name")?.textContent,
    age: xml.querySelector("age")?.textContent
  };
}

// Usage
const xmlData = `
<person>
  <name>John</name>
  <age>25</age>
</person>`;

console.log(parseXML(xmlData));

 

//  Problem 165 JSON Validation
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// Usage
console.log(isValidJSON('{"name":"John"}')); // true
console.log(isValidJSON('{name:"John"}'));   // false

 

//  Problem 166 Serialize / Deserialize Object Manually
function serialize(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

function deserialize(str) {
  return str.split("&").reduce((obj, pair) => {
    const [k, v] = pair.split("=");
    obj[decodeURIComponent(k)] = decodeURIComponent(v);
    return obj;
  }, {});
}

// Usage
const user = { name: "John", age: 25 };
const serialized = serialize(user);
console.log("Serialized:", serialized);

const parsed = deserialize(serialized);
console.log("Deserialized:", parsed);


//  Problem 167 Generate JWT Manually (HS256)
async function generateJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };

  const base64url = obj =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const encodedHeader = base64url(header);
  const encodedPayload = base64url(payload);
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  );

  const base64Signature = btoa(
    String.fromCharCode(...new Uint8Array(signature))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${base64Signature}`;
}

// Usage
generateJWT({ user: "john", exp: Date.now() }, "secretKey")
  .then(token => console.log("JWT:", token));

  

//  Problem 168 Verify JWT Manually (HS256)
async function verifyJWT(token, secret) {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !signatureB64)
      throw new Error("Invalid token format");

    const base64urlDecode = str =>
      JSON.parse(
        atob(str.replace(/-/g, "+").replace(/_/g, "/"))
      );

    const header = base64urlDecode(headerB64);
    const payload = base64urlDecode(payloadB64);

    if (header.alg !== "HS256")
      throw new Error("Unsupported algorithm");

    const data = `${headerB64}.${payloadB64}`;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const expectedSignature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(data)
    );

    const base64urlEncodeBuffer = buffer =>
      btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    const expectedB64 = base64urlEncodeBuffer(expectedSignature);

    if (expectedB64 !== signatureB64)
      throw new Error("Invalid signature");

    if (payload.exp && Date.now() > payload.exp)
      throw new Error("Token expired");

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

  

//  Problem 169 Generate Secure Random Token
function generateSecureToken(bytes = 32) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Usage
console.log("Secure Token:", generateSecureToken());



  

//  Problem 170 Password Hash Simulation
const crypto = require("crypto");

function hashPassword(password) {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

console.log(hashPassword("MyPass123"));


  

//  Problem 171 Password Verification Simulation
const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password, storedHash) {
  return hashPassword(password) === storedHash;
}

const stored = hashPassword("MyPass123");
console.log(verifyPassword("MyPass123", stored));



  

//  Problem 172 Compute Average Request Time
function averageRequestTime(times) {
  if (!times.length) return 0;

  const total = times.reduce((sum, t) => sum + t, 0);
  return total / times.length;
}

console.log(averageRequestTime([120, 200, 150, 100]));
