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
