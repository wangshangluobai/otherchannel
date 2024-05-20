// const ARRAY_DATA = [
//   { id: 1, name: 'John', age: 20, friends: [2, 3] },
//   { id: 2, name: 'Jane', age: 21, friends: [1, 3] },
//   { id: 3, name: 'Jim', age: 22, friends: [1, 2] }
// ]

// 链表

class Node {
  constructor(data, next = null){
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  prepend(value){
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;

    if(!this.tail){
      this.tail = node;
    }
    return this;
  }
}

let data = new LinkedList;
data.prepend(1);
data.prepend(2);
data.prepend(3);
data.prepend(4);

console.log("linkedList",data )