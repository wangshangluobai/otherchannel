

/**
 * @class Heap
 * @description 堆的抽象类
 */
export class Heap {
  constructor() {
    if(new.target === Heap) {
      throw new Error('不允许直接构建 Heap 实例');
    }

    // 堆的数组表示
    this.heapContainer = [];
  }

  /**
   * @param {Number} parentIndex
   * @return {Number}
   * @description 获取左子节点索引
   */
  getLeftChildIndex(parentIndex){
    return (parentIndex << 1) + 1;
  }

  /**
   * @param {Number} parentIndex
   * @return {Number}
   * @description 获取右子节点索引
   */
  getRightChildIndex(parentIndex){
    return (parentIndex << 1) + 2;
  }

  /**
   * @param {Number} childIndex
   * @return {Number}
   * @description 获取父节点索引
   */
  getParentIndex(childIndex){
    return ( --childIndex ) >> 1;
  },

  /** 
   * @param {Number} childIndex
   * @return {Boolean}
   * @description 是否有父节点
   */
  hasParent(childIndex){
    return this.getParentIndex(childIndex) >= 0;
  },

  /**
   * @param {Number} parentIndex
   * @return {Boolean}
   * @description 是否有左子节点
   */
  hasLeftChild(parentIndex){
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {Number} parentIndex
   * @return {Boolean}
   * @description 是否有右子节点
   */
  hasRightChild(parentIndex){
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * @param {Number} parentIndex
   * @return {*}
   * @description 获取左子节点
   */
  leftChild(parentIndex){
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * @param {Number} parentIndex
   * @return {*}
   * @description 获取右子节点
   */
  rightChild(parentIndex){
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * @param {Number} childIndex
   * @return {*}
   * @description 获取父节点
   */
  parent(childIndex){
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * @param {Number} indexFormer
   * @param {Number} indexLatter
   * @description 交换两个节点
   * @TODO 没有做边界校验？
   */
  swap(indexFormer, indexLatter){
    [this.heapContainer[indexFormer], this.heapContainer[indexLatter]] = [this.heapContainer[indexLatter], this.heapContainer[indexFormer]]
  }

  /**
   * @return {*}
   * @description 获取堆顶元素
   */
  peek(){
    if(this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  /**
   * @return {*}
   * @description 删除并返回堆顶元素
   */
  poll(){
    if(this.heapContainer.length === 0) {
      return null;
    }
    if(this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    let root = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();

    this.heapifyDown();

    return root;
  }

  /**
   * @param {*} item
   * @return {Heap}
   * @description 添加元素
   */
  add(item){
    this.heapContainer.push(item);
    this.heapifyUp();

    return this;
  }

  /**
   * @return {Heap}
   * @description 删除元素
   */
  remove(params){
    const { item, callback } = params || {};
    const numberOfToRemove = this.find(item, callback).length;

    for (let i = 0; i < numberOfToRemove; i++) {
                                                                             
      
    }
  }
}