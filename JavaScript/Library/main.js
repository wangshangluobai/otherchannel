// const ARRAY_DATA = [
//   { id: 1, name: 'John', age: 20, friends: [2, 3] },
//   { id: 2, name: 'Jane', age: 21, friends: [1, 3] },
//   { id: 3, name: 'Jim', age: 22, friends: [1, 2] }
// ]

// 链表

export class Node {
  constructor(value, next = null){
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 头部添加节点
  prepend(value){
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;

    if(!this.tail){
      this.tail = node;
    }
    return this;
  }

  // 尾部追加节点
  append(value){
    const node = new Node(value);

    this.size++;

    if(!this.tail){
      this.head = node;
      this.tail = node;
    }else{
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  // 中间插入节点
  insert(value, index){
    if(index < 0 || index > this.size){
      throw new Error("参数异常-索引错误，值不能添加至错误的位置");
    }else if(index === 0){
      this.append(value);
    }else if(index === this.size){
      this.prepend(value);
    }else{
      let currentNode = this.head;
      let currentIndex = this.size;
      let node = new Node(value);
      while (currentNode && currentIndex > 1) {
        if(currentIndex === index) break;
        currentNode = currentNode.next;
        currentIndex--;
      }

      node.next = currentNode.next;
      currentNode.next = node;
      
    }
    
    return this;
  }

  /**
   * @param {*} value 
   * @returns {[Node]}
   * @description 删除节点
   *  1. 将链表中所有的value值删除
   */ 
  delete(value){
    if(!this.head) return null;

    let deleteNodes = [];

    while(this.head && this.head.value === value){
      deleteNodes.push(this.head);
      this.head = this.head.next;
    }
    

    let currentNode = this.head;
    let node_
  }

  // 查询节点
  // find(params){
  //   if(!this.head) return null;
  //   const { value, index, callback } = params || {};

    
  //   // const checkParams = (index) => index && true;
    
  //   let currentNode = this.head;
  //   let node_index = this.size;

  //   while (currentNode) {
  //     node_index--;

  //     if(value !== undefined && currentNode.value === value){
  //       return currentNode;
  //     }
  //     if(index === node_index){
  //       return currentNode;
  //     }

  //     if(callback && callback(currentNode.value)){
  //       return currentNode;
  //     }

  //     currentNode = currentNode.next;
  //   }
      
  //     // console.error("参数异常-缺少查询依据")
  //     // return null;
  // }


}

let data = new LinkedList;

// data.prepend(1);
// data.prepend(2);
// data.prepend(3);
// data.prepend(4);
// // data.append(0);
// // data.append(-1);
// // data.append(-2);
// data.insert(99, 0);
data.prepend(1);
data.insert(2,1);


console.log("linkedList",data);


