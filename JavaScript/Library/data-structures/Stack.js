
import { LinkedList } from "./LinkedList";

/**
 * @class Stack
 * @description 基于链表实现栈
 * @TODO 基于其他数据结构实现栈
 */
export class Stack {
  constructor() {
    // 基于链表实现栈
    this.linkedList = new LinkedList();
  }

  /**
   * @description 判断栈是否为空
   * @returns {boolean}
   */
  isEmpty(){
    return this.linkedList.isEmpty();
  }
  /**
   * @description 查看栈顶元素
   * @returns {any}
   */
  peek(){
    if(this.isEmpty()) return null;
    return this.linkedList.head.value;
  }
  /**
   * @param {any} value
   * @description 入栈
   */
  push(value){
    this.linkedList.prepend(value);
  }
  /**
   * @description 出栈
   * @returns {any}
   */
  pop(){
    const deleteHead = this.linkedList.deleteHead();
    return deleteHead ? deleteHead.value : null;
  }
  /**
   * @description 转换为数组
   * @returns {any[]}
   */
  toArray(){
    return this.linkedList.toArray();
  }
}