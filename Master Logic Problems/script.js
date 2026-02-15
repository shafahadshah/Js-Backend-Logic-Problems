// Problem 181 Implement Consistent Hashing
class ConsistentHash {
  constructor(nodes = []) {
    this.ring = new Map();
    this.sortedKeys = [];
    nodes.forEach(n => this.addNode(n));
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  addNode(node) {
    const key = this.hash(node);
    this.ring.set(key, node);
    this.sortedKeys.push(key);
    this.sortedKeys.sort((a, b) => a - b);
  }

  getNode(key) {
    const hash = this.hash(key);
    for (let k of this.sortedKeys) {
      if (hash <= k) return this.ring.get(k);
    }
    return this.ring.get(this.sortedKeys[0]);
  }
}

// Usage
const ch = new ConsistentHash(["A", "B", "C"]);
console.log(ch.getNode("user123"));



// Problem 182 Distributed Cache Logic
class DistributedCache {
  constructor(nodes = []) {
    this.hashRing = new ConsistentHash(nodes);
    this.store = new Map(); // node => Map()
    nodes.forEach(n => this.store.set(n, new Map()));
  }

  set(key, value) {
    const node = this.hashRing.getNode(key);
    this.store.get(node).set(key, value);
  }

  get(key) {
    const node = this.hashRing.getNode(key);
    return this.store.get(node).get(key);
  }
}

const cache = new DistributedCache(["Node1", "Node2", "Node3"]);
cache.set("user1", "data");
console.log(cache.get("user1"));



// Problem 183 Advanced Event Emitter
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener); // uniqueness via Set
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  off(event, listener) {
    this.events.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
    return true;
  }
}

// Usage
const emitter = new EventEmitter();

const log = data => console.log("Event:", data);

emitter.on("message", log);
emitter.on("message", log); // duplicate ignored
emitter.emit("message", "Hello");

emitter.once("onceEvent", msg => console.log("Once:", msg));
emitter.emit("onceEvent", "Run 1");
emitter.emit("onceEvent", "Run 2");



// Problem 184 Implement pub/sub system
class PubSub {
  constructor() {
    this.topics = new Map();
  }

  subscribe(topic, listener) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, new Set()); // unique listeners
    }
    this.topics.get(topic).add(listener);

    return () => this.topics.get(topic)?.delete(listener); // unsubscribe
  }

  publish(topic, data) {
    if (!this.topics.has(topic)) return;
    for (const listener of this.topics.get(topic)) {
      listener(data);
    }
  }
}

// ✅ Test
const ps = new PubSub();
const unsub = ps.subscribe("news", msg => console.log("News:", msg));
ps.publish("news", "Hello World");
unsub();
ps.publish("news", "Won't show");



// Problem 185 Build Priority Message Queue
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(value, priority) {
    const node = { value, priority };
    this.heap.push(node);
    this.bubbleUp();
  }

  dequeue() {
    if (!this.heap.length) return null;
    this.swap(0, this.heap.length - 1);
    const removed = this.heap.pop();
    this.bubbleDown();
    return removed.value;
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[p].priority <= this.heap[i].priority) break;
      this.swap(i, p);
      i = p;
    }
  }

  bubbleDown() {
    let i = 0;
    const length = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < length && this.heap[left].priority < this.heap[smallest].priority)
        smallest = left;
      if (right < length && this.heap[right].priority < this.heap[smallest].priority)
        smallest = right;
      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// ✅ Test
const pq = new PriorityQueue();
pq.enqueue("Low", 5);
pq.enqueue("High", 1);
pq.enqueue("Medium", 3);
console.log(pq.dequeue()); // High
console.log(pq.dequeue()); // Medium



// Problem 186 Transaction Rollback Simulation
class Transaction {
  constructor(state = {}) {
    this.state = { ...state };
    this.history = [];
  }

  set(key, value) {
    this.history.push({ key, prev: this.state[key] });
    this.state[key] = value;
  }

  rollback() {
    while (this.history.length) {
      const { key, prev } = this.history.pop();
      if (prev === undefined) delete this.state[key];
      else this.state[key] = prev;
    }
  }
}

// ✅ Test
const tx = new Transaction({ a: 1 });
tx.set("a", 2);
tx.set("b", 3);
console.log(tx.state); // {a:2,b:3}
tx.rollback();
console.log(tx.state); // {a:1}



// Problem 187 Logical Replication Simulation
class Master {
  constructor() {
    this.data = {};
    this.subscribers = new Set();
  }

  subscribe(replica) {
    this.subscribers.add(replica);
  }

  write(key, value) {
    this.data[key] = value;
    for (const replica of this.subscribers) {
      replica.update(key, value);
    }
  }
}

class Replica {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  update(key, value) {
    this.data[key] = value;
  }
}

// ✅ Test
const master = new Master();
const r1 = new Replica("R1");
master.subscribe(r1);
master.write("x", 100);
console.log(r1.data); // {x:100}



// Problem 188 Write-Ahead Log (WAL) Simulation
class WAL {
  constructor() {
    this.log = [];
    this.data = {};
  }

  write(key, value) {
    this.log.push({ key, value }); // log first
    this.apply();
  }

  apply() {
    while (this.log.length) {
      const { key, value } = this.log.shift();
      this.data[key] = value;
    }
  }

  recover() {
    this.apply();
  }
}

// ✅ Test
const wal = new WAL();
wal.write("a", 10);
console.log(wal.data); // {a:10}





// Problem 189 Build URL Crawler Algorithm
async function crawl(startUrl, fetchLinks, limit = 10) {
  const visited = new Set();
  const queue = [startUrl];

  while (queue.length && visited.size < limit) {
    const url = queue.shift();
    if (visited.has(url)) continue;

    console.log("Visiting:", url);
    visited.add(url);

    const links = await fetchLinks(url);
    for (const link of links) {
      if (!visited.has(link)) queue.push(link);
    }
  }

  return [...visited];
}

// ✅ Mock fetch
async function mockFetch(url) {
  const map = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D"],
    D: []
  };
  return map[url] || [];
}

// ✅ Test
crawl("A", mockFetch).then(console.log);




// Problem 190 Sitemap Generator Logic
function generateSitemap(urls) {
  const unique = [...new Set(urls)].sort();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset>
${unique.map(url => `
  <url>
    <loc>${url}</loc>
  </url>`).join("")}
</urlset>`;
}

// ✅ Test
const urls = [
  "https://example.com",
  "https://example.com/about",
  "https://example.com",
];

console.log(generateSitemap(urls));
