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




// Problem 191 Text Search Scoring (TF-IDF)
// TF-IDF Scoring
function tfidf(docs, query) {
    const tokenize = text => text.toLowerCase().match(/\w+/g) || [];
    
    const idf = {};
    const N = docs.length;
    
    docs.forEach(doc => {
        const words = new Set(tokenize(doc));
        words.forEach(word => idf[word] = (idf[word] || 0) + 1);
    });
    
    Object.keys(idf).forEach(word => idf[word] = Math.log(N / idf[word]));

    const scores = docs.map(doc => {
        const tf = {};
        tokenize(doc).forEach(word => tf[word] = (tf[word] || 0) + 1);
        return tokenize(query).reduce((sum, word) => sum + (tf[word] || 0) * (idf[word] || 0), 0);
    });
    
    return scores;
}

// Example
const docs = ["The quick brown fox", "jumped over the lazy dog", "brown dog jumps"];
console.log("TF-IDF Scores:", tfidf(docs, "brown dog"));




// Problem 192 Mini Search Engine Index
// Mini Inverted Index
class MiniSearch {
    constructor() { this.index = {}; }
    addDoc(id, text) {
        text.toLowerCase().match(/\w+/g)?.forEach(word => {
            if (!this.index[word]) this.index[word] = new Set();
            this.index[word].add(id);
        });
    }
    search(query) {
        const words = query.toLowerCase().match(/\w+/g) || [];
        return words.reduce((res, w) => res ? new Set([...res].filter(x => this.index[w]?.has(x))) : this.index[w], null) || new Set();
    }
}

// Example
const search = new MiniSearch();
search.addDoc(1, "The quick brown fox");
search.addDoc(2, "jumped over the lazy dog");
search.addDoc(3, "brown dog jumps");
console.log("Search Results for 'brown dog':", [...search.search("brown dog")]);




// Problem 193 Spell Checker Using Levenshtein Distance
function levenshtein(a, b) {
    const dp = Array.from({length:a.length+1}, () => Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++) dp[i][0]=i;
    for(let j=0;j<=b.length;j++) dp[0][j]=j;
    for(let i=1;i<=a.length;i++){
        for(let j=1;j<=b.length;j++){
            dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]);
        }
    }
    return dp[a.length][b.length];
}

function spellCheck(word, dict) {
    let minDist = Infinity, suggestion = null;
    dict.forEach(d => {
        const dist = levenshtein(word, d);
        if(dist < minDist){ minDist=dist; suggestion=d; }
    });
    return suggestion;
}

// Example
const dictionary = ["apple", "orange", "banana", "grape"];
console.log("Suggestion for 'aple':", spellCheck("aple", dictionary));




// Problem 194 Advanced CSV Parser
function parseCSV(csv) {
    const lines = csv.split(/\r?\n/);
    return lines.map(line => {
        const result = [];
        let match;
        const regex = /("([^"]*(?:""[^"]*)*)"|[^,]+)/g;
        while(match = regex.exec(line)) {
            let value = match[2] !== undefined ? match[2].replace(/""/g,'"') : match[1];
            result.push(value);
        }
        return result;
    });
}

// Example
const csvData = `name,age,quote
Alice,30,"Hello, world!"
Bob,25,"I said ""Hi"""`;
console.log("CSV Parsed:", parseCSV(csvData));




// Problem 195 Advanced XML Parser
function parseXML(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");
    function traverse(node){
        let obj = {};
        if(node.nodeType===1){
            [...node.attributes].forEach(attr => obj[attr.name]=attr.value);
            [...node.childNodes].forEach(child => {
                if(child.nodeType===3) obj['text'] = child.nodeValue.trim();
                else obj[child.nodeName] = traverse(child);
            });
        }
        return obj;
    }
    return traverse(xmlDoc.documentElement);
}

// Example
const xml = `<person age="30"><name>Alice</name></person>`;
console.log("XML Parsed:", parseXML(xml));




// Problem 196 RLE Compression & Decompression
// RLE Compression
function rleCompress(str) {
    return str.replace(/(.)\1*/g, (match, char) => match.length + char);
}

// RLE Decompression
function rleDecompress(str) {
    return str.replace(/(\d+)(.)/g, (_, count, char) => char.repeat(count));
}

// Example usage
const rleText = "AAABBBCC";
const rleCompressed = rleCompress(rleText);
const rleDecompressed = rleDecompress(rleCompressed);

console.log("RLE Original:", rleText);
console.log("RLE Compressed:", rleCompressed);
console.log("RLE Decompressed:", rleDecompressed);




// Problem 197 LZW Compression & Decompression
// LZW Compression
function lzwCompress(input) {
    const dict = {};
    const data = input.split("");
    const result = [];
    let dictSize = 256;

    // Initialize dictionary
    for (let i = 0; i < 256; i++) dict[String.fromCharCode(i)] = i;

    let w = "";
    for (let c of data) {
        const wc = w + c;
        if (dict[wc] !== undefined) w = wc;
        else {
            result.push(dict[w]);
            dict[wc] = dictSize++;
            w = c;
        }
    }
    if (w !== "") result.push(dict[w]);
    return result;
}

// LZW Decompression
function lzwDecompress(compressed) {
    const dict = {};
    let dictSize = 256;

    for (let i = 0; i < 256; i++) dict[i] = String.fromCharCode(i);

    let w = String.fromCharCode(compressed[0]);
    let result = w;

    for (let i = 1; i < compressed.length; i++) {
        const k = compressed[i];
        const entry = dict[k] !== undefined ? dict[k] : w + w[0];
        result += entry;
        dict[dictSize++] = w + entry[0];
        w = entry;
    }
    return result;
}

// Example usage
const lzwText = "AAABBBCC";
const lzwCompressed = lzwCompress(lzwText);
const lzwDecompressed = lzwDecompress(lzwCompressed);

console.log("LZW Original:", lzwText);
console.log("LZW Compressed:", lzwCompressed);
console.log("LZW Decompressed:", lzwDecompressed);




// Problem 198 Load Balancer – Round Robin
class RoundRobin {
  constructor(servers) {
    this.servers = servers;
    this.index = 0;
  }

  next() {
    const server = this.servers[this.index];
    this.index = (this.index + 1) % this.servers.length;
    return server;
  }
}

// Test
const rr = new RoundRobin(["S1", "S2", "S3"]);
console.log(rr.next()); // S1
console.log(rr.next()); // S2
console.log(rr.next()); // S3
console.log(rr.next()); // S1




// Problem 199 Load Balancer – Least Connections
class LeastConnections {
  constructor(servers) {
    this.servers = servers.map(s => ({ name: s, connections: 0 }));
  }

  next() {
    let minServer = this.servers.reduce((a, b) =>
      a.connections <= b.connections ? a : b
    );
    minServer.connections++;
    return minServer.name;
  }

  release(serverName) {
    const server = this.servers.find(s => s.name === serverName);
    if (server && server.connections > 0) server.connections--;
  }
}

// Test
const lc = new LeastConnections(["S1", "S2", "S3"]);
console.log(lc.next());
console.log(lc.next());
console.log(lc.next());




// Problem 200 Load Balancer – Weighted
class WeightedBalancer {
  constructor(servers) {
    this.pool = [];
    servers.forEach(({ name, weight }) => {
      for (let i = 0; i < weight; i++) {
        this.pool.push(name);
      }
    });
    this.index = 0;
  }

  next() {
    const server = this.pool[this.index];
    this.index = (this.index + 1) % this.pool.length;
    return server;
  }
}

// Test
const wb = new WeightedBalancer([
  { name: "S1", weight: 1 },
  { name: "S2", weight: 3 }
]);

for (let i = 0; i < 6; i++) {
  console.log(wb.next());
}




// Problem 201 Version Control – Diff Engine
function diff(oldText, newText) {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  const result = [];

  const all = new Set([...oldLines, ...newLines]);

  all.forEach(line => {
    if (!oldLines.includes(line)) {
      result.push(`+ ${line}`);
    } else if (!newLines.includes(line)) {
      result.push(`- ${line}`);
    }
  });

  return result;
}

// Test
console.log(diff("a\nb\nc", "a\nc\nd"));




// Problem 202 Event Sourcing Logic
class EventStore {
  constructor() {
    this.events = [];
  }

  add(event) {
    this.events.push(event);
  }

  replay(initialState = {}) {
    return this.events.reduce((state, event) => {
      return { ...state, ...event };
    }, initialState);
  }
}

// Test
const store = new EventStore();
store.add({ balance: 100 });
store.add({ balance: 150 });
console.log(store.replay());




// Problem 203 CQRS Simulation
class CQRS {
  constructor() {
    this.writeModel = [];
    this.readModel = [];
  }

  command(data) {
    this.writeModel.push(data);
    this.readModel = [...this.writeModel]; // Sync read model
  }

  query() {
    return this.readModel;
  }
}

// Test
const system = new CQRS();
system.command({ id: 1, name: "Item1" });
system.command({ id: 2, name: "Item2" });

console.log(system.query());




// Problem 204 Cluster Leader Election
class Node {
  constructor(id, nodes) {
    this.id = id;
    this.nodes = nodes;
  }

  electLeader() {
    const highest = Math.max(...this.nodes.map(n => n.id));
    return highest;
  }
}

// Test
const nodes = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

const clusterNode = new Node(1, nodes);
console.log("Leader:", clusterNode.electLeader());




// Problem 205 Gossip Protocol Simulation
class GossipNode {
  constructor(id) {
    this.id = id;
    this.messages = new Set();
  }

  receive(msg) {
    if (!this.messages.has(msg)) {
      this.messages.add(msg);
      return true;
    }
    return false;
  }
}

function gossipSimulation() {
  const nodes = [0, 1, 2].map(id => new GossipNode(id));

  // Initial message
  nodes[0].receive("Hello");

  nodes.forEach(sender => {
    nodes.forEach(receiver => {
      if (sender !== receiver) {
        sender.messages.forEach(msg => {
          if (receiver.receive(msg)) {
            console.log(`Node ${sender.id} -> Node ${receiver.id}: ${msg}`);
          }
        });
      }
    });
  });

  console.log("Final State:");
  nodes.forEach(n => console.log(`Node ${n.id}`, [...n.messages]));
}

gossipSimulation();




// Problem 206 Vector Clock Implementation
class VectorClock {
  constructor(id, size) {
    this.id = id;
    this.clock = new Array(size).fill(0);
  }

  tick() {
    this.clock[this.id]++;
  }

  merge(otherClock) {
    this.clock = this.clock.map((v, i) =>
      Math.max(v, otherClock[i])
    );
  }
}

function vectorClockDemo() {
  const nodes = [0, 1, 2].map(id => new VectorClock(id, 3));

  nodes[0].tick();
  nodes[1].merge(nodes[0].clock);

  nodes.forEach(n =>
    console.log(`Node ${n.id} clock:`, n.clock)
  );
}

vectorClockDemo();




// Problem 207 Conflict Resolution (Last Write Wins)
class LWWStore {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ts) {
    const existing = this.store.get(key);
    if (!existing || ts > existing.ts) {
      this.store.set(key, { value, ts });
    }
  }

  print() {
    this.store.forEach((v, k) =>
      console.log(`${k} => ${v.value} @${v.ts}`)
    );
  }
}

function conflictDemo() {
  const db = new LWWStore();
  db.set("user", "Alice", 1);
  db.set("user", "Bob", 2); // wins
  db.print();
}

conflictDemo();




// Problem 208 Key-Value Database Engine
class KeyValueDB {
  constructor() {
    this.data = Object.create(null);
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key] ?? null;
  }

  print() {
    Object.keys(this.data).forEach(k =>
      console.log(k, ":", this.data[k])
    );
  }
}

function kvDemo() {
  const db = new KeyValueDB();
  db.set("a", 10);
  db.set("b", 20);
  db.print();
  console.log("Get a:", db.get("a"));
}

kvDemo();




// Problem 209 In-Memory SQL-like Parser
class SimpleSQL {
  constructor() {
    this.table = [];
  }

  insert(row) {
    this.table.push(row);
  }

  select(col, val) {
    return this.table.filter(r => r[col] === val);
  }
}

function sqlDemo() {
  const db = new SimpleSQL();
  db.insert({ id: 1, name: "Alice" });
  db.insert({ id: 2, name: "Bob" });

  const result = db.select("name", "Alice");

  result.forEach(r => console.log("Found:", r));
}

sqlDemo();




// Problem 210 Offline Sync Logic
class SyncEngine {
  constructor() {
    this.local = new Map();
    this.remote = new Map();
  }

  updateLocal(key, value) {
    this.local.set(key, { value, synced: false });
  }

  sync() {
    this.local.forEach((v, k) => {
      if (!v.synced) {
        this.remote.set(k, v.value);
        v.synced = true;
        console.log("Synced:", k);
      }
    });
  }

  printRemote() {
    this.remote.forEach((v, k) =>
      console.log("Remote:", k, v)
    );
  }
}

function syncDemo() {
  const engine = new SyncEngine();
  engine.updateLocal("task1", "done");
  engine.updateLocal("task2", "pending");
  engine.sync();
  engine.printRemote();
}

syncDemo();




// Problem 211 Job Scheduling Engine
class JobScheduler {
  constructor() {
    this.jobs = [];
  }

  add(name, priority) {
    this.jobs.push({ name, priority });
  }

  run() {
    this.jobs
      .sort((a, b) => b.priority - a.priority)
      .forEach(job =>
        console.log("Running:", job.name, "Priority:", job.priority)
      );
  }
}

function schedulerDemo() {
  const scheduler = new JobScheduler();
  scheduler.add("LowTask", 1);
  scheduler.add("MediumTask", 3);
  scheduler.add("HighTask", 5);
  scheduler.run();
}

schedulerDemo();




// Problem 212 Background Task Queue
class BackgroundTaskQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    add(task) {
        this.queue.push(task);
        this.run();
    }

    async run() {
        if (this.running) return;
        this.running = true;

        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }

        this.running = false;
    }
}

// ==== EXECUTION ====
const bg = new BackgroundTaskQueue();

bg.add(async () => {
    console.log("Task 1 started");
    await new Promise(r => setTimeout(r, 500));
    console.log("Task 1 finished");
});

bg.add(async () => {
    console.log("Task 2 executed");
});




// Problem 213 Dependency Resolver
class DependencyResolver {
    constructor() {
        this.graph = {};
        this.visited = new Set();
    }

    add(task, deps = []) {
        this.graph[task] = deps;
    }

    resolve(task) {
        if (this.visited.has(task)) return;

        for (let dep of this.graph[task] || []) {
            this.resolve(dep);
        }

        this.visited.add(task);
        console.log("Executing:", task);
    }
}

// ==== EXECUTION ====
const resolver = new DependencyResolver();

resolver.add("Build", ["Compile", "Test"]);
resolver.add("Test", ["Compile"]);
resolver.add("Compile");

resolver.resolve("Build");




// Problem 214 Priority Scheduler
class PriorityScheduler {
    constructor() {
        this.tasks = [];
    }

    add(task, priority) {
        this.tasks.push({ task, priority });
        this.tasks.sort((a, b) => b.priority - a.priority);
    }

    run() {
        while (this.tasks.length) {
            const t = this.tasks.shift();
            console.log("Running:", t.task, "| Priority:", t.priority);
        }
    }
}

// ==== EXECUTION ====
const scheduler = new PriorityScheduler();

scheduler.add("Low Task", 1);
scheduler.add("High Task", 5);
scheduler.add("Medium Task", 3);

scheduler.run();




// Problem 215 Resource Allocation Algorithm
class RoundRobin {
    constructor(tasks, quantum) {
        this.queue = [...tasks];
        this.quantum = quantum;
    }

    execute() {
        while (this.queue.length) {
            const task = this.queue.shift();
            console.log(`Processing ${task} for ${this.quantum}ms`);
        }
    }
}

// ==== EXECUTION ====
const rrr = new RoundRobin(["T1", "T2", "T3"], 2);
rrr.execute();




// Problem 216 Throttling Logic
class Throttler {
    constructor(limitMs) {
        this.limitMs = limitMs;
        this.lastRun = 0;
    }

    run(task) {
        const now = Date.now();
        if (now - this.lastRun >= this.limitMs) {
            task();
            this.lastRun = now;
        } else {
            console.log("Throttled");
        }
    }
}

// ==== EXECUTION ====
const throttle = new Throttler(1000);

throttle.run(() => console.log("Task Executed"));
setTimeout(() => throttle.run(() => console.log("Task Executed")), 500);
setTimeout(() => throttle.run(() => console.log("Task Executed")), 1200);




// Problem 217 Token Bucket Advanced
class TokenBucket {
    constructor(capacity, refillPerSec) {
        this.capacity = capacity;
        this.tokens = capacity;

        setInterval(() => {
            this.tokens = Math.min(this.capacity, this.tokens + refillPerSec);
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

// ==== EXECUTION ====
const bucket1 = new TokenBucket(3, 1);

let i = 1;
const interval = setInterval(() => {
    console.log("Request", i, ":", bucket1.allow());
    i++;
    if (i > 6) clearInterval(interval);
}, 300);




// Problem 218 Leaky Bucket (Advanced)
class LeakyBucket {
  constructor(capacity, leakRatePerSec) {
    this.capacity = capacity;
    this.leakRate = leakRatePerSec;
    this.water = 0;
    this.lastCheck = Date.now();
  }

  leak() {
    const now = Date.now();
    const elapsed = (now - this.lastCheck) / 1000;
    const leaked = elapsed * this.leakRate;

    this.water = Math.max(0, this.water - leaked);
    this.lastCheck = now;
  }

  addRequest(amount = 1) {
    this.leak();

    if (this.water + amount > this.capacity) {
      console.log("❌ Rejected");
      return false;
    }

    this.water += amount;
    console.log("✅ Accepted | Current:", this.water.toFixed(2));
    return true;
  }
}

// ✅ Test
const bucket = new LeakyBucket(10, 2); // cap=10, leak=2/sec

bucket.addRequest(5);
setTimeout(() => bucket.addRequest(4), 1000);
setTimeout(() => bucket.addRequest(6), 2000);