
import { LinkedList } from "./LinkedList.js";

const defaultHashSize = 32;

/**
 * @class HashTable
 * @description 哈希表
 * @param {number} hashSize - 哈希表桶的数量
 */
export class HashTable {
  constructor(hashSize = defaultHashSize){
    // 根据参数长度创建桶，桶中每项为链表
    this.buckets = Array(hashSize).fill(null).map(() => new LinkedList());
    
    // 记录写入的键
    this.keys = new Map();
  }

  /**
   * @param {string} key - 键
   * @description 哈希函数
   * @returns {number}
   * 
   */
  hash(key){
    const hash = Array.from(key).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key - 键
   * @description 设置键值对
   */
  set(key, value){
    const index = this.hash(key);
    this.keys.set(key, index);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({ callback: node => node.value.key === key })

    if(node){
      node.value.value = value;
    }else{
      bucketLinkedList.append({ key, value });
    }
  }

  /**
   * @param {string} key - 键
   * @description 获取键值对
   * @returns {any}
   */
  get(key){
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({ callback: node => node.value.key === key });
    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key - 键
   * @description 删除键值对
   * @returns {boolean}
   */
  delete(key){
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({ callback: node => node.key === key });
    if(node){
      const DEL_ARRAY = bucketLinkedList.delete({ callback: node => node.key === key });
      this.keys.delete(key);
      return (DEL_ARRAY && DEL_ARRAY.length) ? true : false;
    }
    return null;
  }

  /**
   * @param {string} key - 键
   * @description 根据键获取值
   * @returns {any}
   */
  get(key){
    const index = this.hash(key);
    const bucketLinkedList = this.buckets[index];
    const node = bucketLinkedList.find({ callback: node => node.key === key });
    return node?.value?.value;
  }

  /**
   * @param {string} key - 键
   * @description 判断是否存在该键
   * @returns {boolean}
   */
  has(key, value){
    return this.keys.has(key);
  }

  /**
   * @description 获取所有键
   * @returns {Array}
   */
  getKeys(){
    return Array.from(this.keys.keys());
  }
  
  /**
   * @description 获取所有值
   * @returns {Array}
   */
  getValues(){
    return this.buckets.reduce((acc, cur) => acc.concat(cur.toArray({callback: (target) => target.value})), []);
  }

  /**
   * @description 按照插入顺序，获取所有值
   */
  getSortedBySetValues(){
    return this.getKeys().map(i => this.get(i));
  }
}