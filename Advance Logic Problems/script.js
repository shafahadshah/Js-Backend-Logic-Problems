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
