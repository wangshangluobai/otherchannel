
import { LinkedList } from "./LinkedList.js";

/**
 * @class 队列 基于链表
 * @TODO 使用其他数据结构实现队列
 */
export class Queue {
  constructor() {
    // 基于链表实现队列
    this.linkedList = new LinkedList();
  }

  /**
   * @returns {boolean}
   * @description 判断队列是否为空
   */
  isEmpty(){
    return this.linkedList.isEmpty();
  }

  /**
   * @returns {*}
   * @description 获取队列头部元素
   */
  peek(){
    if(this.isEmpty()) return null;
    return this.linkedList.head.value;
  }

  /**
   * @param {*} value
   * @description 入队
   */
  enqueue(value){
    this.linkedList.append(value);
  }

  /**
   * @returns {*}
   * @description 出队
   */
  dequeue(){
    const deleteHead = this.linkedList.deleteHead();
    return deleteHead && deleteHead.value;
  }
}