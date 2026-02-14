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
