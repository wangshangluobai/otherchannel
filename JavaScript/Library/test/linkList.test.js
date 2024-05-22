
import { expect } from 'chai';
import { LinkedList, Node } from '../main.js';

// 链表测试
describe('LinkedList', () => {
  let linkedList;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  describe('prepend', () => {
    it('should prepend a node to the list', () => {
      linkedList.prepend(1);
      expect(linkedList.head.value).to.equal(1);
      expect(linkedList.head.next).to.be.null;
      expect(linkedList.size).to.equal(1);
    });
  });

  describe('append', () => {
    it('should append a node to the list', () => {
      linkedList.append(1);
      expect(linkedList.head.value).to.equal(1);
      expect(linkedList.head.next).to.be.null;
      expect(linkedList.size).to.equal(1);
    });
  });

  describe('insert', () => {
    it('should insert a node at the specified index', () => {
      linkedList.append(1);
      // 当前链表长度为 1，当链表长度和插入位置相同时，相当于 prepend
      // 如果插入位置为 0，相当于 append
      linkedList.insert(2, 1);
      expect(linkedList.head.value).to.equal(2);
      expect(linkedList.head.next.value).to.equal(1);
      expect(linkedList.size).to.equal(2);
    });

    it('should throw an error if the index is out of range', () => {
      expect(() => {
        linkedList.insert(2, 1);
      }).to.throw("参数异常-索引错误，值不能添加至错误的位置");
    });
  });
});