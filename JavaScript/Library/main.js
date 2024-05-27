
// 链表

/**
 * 链表节点
 * @class LinkedNode
 * @param {*} value
 * @param {next} [next=null]
 */
export class LinkedNode {
  constructor(value, next = null){
    this.value = value;
    this.next = next;
  }
}

/**
 * 双向链表节点
 * @class DoubleLinkedNode
 * @param {*} value
 * @param {next} [next=null]
 * @param {previous} [previous=null]
 */
export class DoubleLinkedNode extends LinkedNode {
  constructor(value, next = null, previous = null){
    super(value, next);
    this.previous = previous;
  }
}

/**
 * 创建一个新的链表实例
 * @class LinkedList
 * @param {object} [config={}]
 * @param {string} [config.type='LinkedNode']
 * @returns {LinkedList}
 * @TODO 通过参数配置设置 链表类型-头尾链接或其他扩展
 */
export class LinkedList {
  #NODE;
  constructor(config){
    const { type = 'LinkedList' } = config || {};

    switch (type) {
      case 'LinkedList':
        this.#NODE = LinkedNode;
        break;

      case 'DoubleLinkedList':
        this.#NODE = DoubleLinkedNode;
        this.previous = null;
        break;

      default:
        this.#NODE = LinkedNode;
        break;
    }

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
    const node = new this.#NODE(value, this.head);
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
    const node = new this.#NODE(value);

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
      let node = new this.#NODE(value);
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
   * @returns {[#NODE]}
   * @description 删除节点
   *  1. 将链表中所有的value值删除
   * @TODO 如果链表中存在多个重复的值，通过设置来决定移除哪一项
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
   * @returns {#NODE}
   * @description 查询节点
   *  1. 只查询第一个符合条件的节点
   * @TODO 参数可以接受函数， 通过此函数判断链表节点值是否为查询值
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
   * @returns {#NODE}
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
    while(currentNode?.next){
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
   * @returns {#NODE}
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
   * @return {LinkedList}
   * @TODO 该方法需要可以从 LinkedList 类上直接调用
   */
  fromArray(value){
    if(!Array.isArray(value)) throw new Error("参数类型异常-应为 Array ");

    value.length && value.forEach((i) => this.append(i));

    return this;
  }

  /**
   * @param {Object} [params] -参数对象
   * @param {Function} [callback] -为每一个链表节点值都将作为参数传入此回调
   * @return {LinkedListNode[]}
   * @description 将链表转为数组
   */
  toArray(params){
    let List = [];
    if(!this.head) return List;

    const { callback } = params || {};

    let currentNode = this.head;
    while(currentNode){
      if(callback && Object.prototype.toString.call(callback) === "[object Function]"){
        List.push(callback(currentNode.value));
      }else{
        List.push(currentNode.value)
      }

      currentNode = currentNode.next;
    }

    return List;
  }

  /**
   * @return {LinkedList}
   * @description 将链表节点顺序反转
   */
  reverse(){
    if(!this.head) return this;

    let currentNode = this.head;
    let nextNode = null;
    let prevNode = null;

    while(currentNode) {
      // 取原链表顺序下的下节点记录
      nextNode = currentNode.next;
      // 处理当前节点的下节点为 null || 已经逆转过的链表
      currentNode.next = prevNode;

      // 将处理过的链表记录，待下轮使用
      prevNode = currentNode;
      // 更新下轮处理节点
      currentNode = nextNode;
    }

    // 逆转链表尾部即是原链表头部
    this.tail = this.head;
    // 新链表的头部即是最后处理的节点，但当前节点是 null ，所以取处理过的链表记录
    this.head = prevNode;

    return this;
  }

}

// #region 单向链表测试
// let data = new LinkedList;

/* 
// fromArray 测试
data.prepend(1);
data.prepend(2);
data.prepend(3);
data.prepend(4);
data.fromArray(['a', 'b'])
data.fromArray([])
*/

/*
// toArray 测试
data.prepend(1);
data.prepend(2);
data.prepend(3);
data.prepend(4);
console.log('%c [ data.toArray(); ]-274', 'font-size:13px; background:#97d08a; color:#dbffce;', data.toArray());
*/

/*
// reverse 测试
data.prepend(1);
data.prepend(2);
data.prepend(3);
data.prepend(4);
console.log('%c [ data.reverse() ]-305', 'font-size:13px; background:#8dc344; color:#d1ff88;', data.reverse());
*/
//#endregion

//#region 双向链表测试
let data = new LinkedList({type: "DoubleLinkedList"});
/*
data.prepend(1);
 */
console.log("DoubleLinkedNode",data);
//#endregion



