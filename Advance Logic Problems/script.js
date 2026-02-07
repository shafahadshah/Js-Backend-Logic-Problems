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
