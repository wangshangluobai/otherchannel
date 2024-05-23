// const ARRAY_DATA = [
//   { id: 1, name: 'John', age: 20, friends: [2, 3] },
//   { id: 2, name: 'Jane', age: 21, friends: [1, 3] },
//   { id: 3, name: 'Jim', age: 22, friends: [1, 2] }
// ]

// 链表

/**
 * 链表节点
 * @class Node
 * @param {*} value
 * @param {next} [next=null]
 */
export class Node {
  constructor(value, next = null){
    this.value = value;
    this.next = next;
  }
}

/**
 * 创建一个新的链表实例
 * @class LinkedList
 * @returns {LinkedList}
 */
export class LinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * @param {*} value
   * @returns {LinkedList}
   * @description 头部添加节点
   *  1. 将新节点作为 head
   */
  prepend(value){
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;

    if(!this.tail){
      this.tail = node;
    }
    return this;
  }

  /**
   * @param {*} value
   * @returns {LinkedList}
   * @description 尾部追加节点
   *  1. 将新节点作为 tail 节点
   */
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

  /**
   * @param {*} value
   * @param {*} index
   * @returns {LinkedList}
   * @description 中间插入节点
   *  1. 边界判断， index 不能小于 0 或者大于链表的长度
   *  2. 当 index 等于 0 时，直接调用 append 方法
   *  3. 当 index 等于 size 时，调用 prepend 方法
   *  4. 找到 index 位置的的节点，将新节点添加至该节点后
   */
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
      this.size--;
    }
    

    let currentNode = this.head;
    while (currentNode?.next) {
      if(currentNode.next.value ===  value){
        deleteNodes.push(currentNode.next);
        currentNode.next = currentNode.next.next;
        this.size--;
      }else{
        currentNode = currentNode.next;
      }
    }

    if(this.tail && this.tail.value === value) this.tail = currentNode;

    return deleteNodes;
  }

  /**
   * @param {*} value
   * @returns {Node}
   * @description 查询节点
   *  1. 只查询第一个符合条件的节点
   */
  find(value){
    if(!this.head) return null;
    
    let currentNode = this.head;

    while (currentNode) {

      if(value !== undefined && currentNode.value === value){
        return currentNode;
      }

      currentNode = currentNode.next;
    }
      
    return null;
  }

  /**
   * @returns {Node}
   * @description 删除尾节点
   */
  deleteTail(){
    if(!this.head) return null;

    let deleteTail = this.tail;

    if(this.head === this.tail){
      this.head = null;
      this.tail = null;
      this.size--;
    }

    let currentNode = this.head;
    while(currentNode.next){
      if(currentNode.next.next === null){
        deleteTail = currentNode.next;
        currentNode.next = null;
        this.tail = currentNode;
        this.size--;
      }else{
        currentNode = currentNode.next;
      }
    }
    return deleteTail;
  }

  /**
   * @returns {Node}
   * @description 删除链表头部节点
   */
  deleteHead(){
    if(!this.head) return null;

    let deleteHead = this.head;
    if(this.head.next){
      this.head = this.head.next;
    }else{
      this.head = null;
      this.tail = null;
    }
    this.size--;

    return deleteHead;
  }

  /**
   * @param {Array} value
   * @description 从数组中创建链表
   */
  fromArray(value){},

}

let data = new LinkedList;

data.prepend(1);
data.prepend(2);
data.prepend(3);
data.prepend(4);
// data.append(0);
// data.append(-1);
// data.append(-2);
// data.insert(99, 0);

// data.prepend(1);
// data.insert(2,1);


console.log("linkedList",data, data.deleteTail());


