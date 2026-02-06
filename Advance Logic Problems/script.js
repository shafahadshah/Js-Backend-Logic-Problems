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
