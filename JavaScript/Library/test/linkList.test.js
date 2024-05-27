import { describe, expect, test } from '@jest/globals';
import { LinkedList, Node } from '../main.js';

/**
 * 单向列表测试
 */
describe('LinkedList', () => {
  let linkedList;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  // Test cases for prepend method
  test('prepend should add a node at the beginning when list is empty', () => {
    linkedList.prepend(1);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next).toBeNull();
    expect(linkedList.size).toBe(1);
  });

  test('prepend should add a node at the beginning when list has one node', () => {
    linkedList.append(1);
    linkedList.prepend(2);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.head.next.value).toBe(1);
    expect(linkedList.size).toBe(2);
  });

  // Test cases for append method
  test('append should add a node at the end when list is empty', () => {
    linkedList.append(1);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.tail.next).toBeNull();
    expect(linkedList.size).toBe(1);
  });

  test('append should add a node at the end when list has one node', () => {
    linkedList.append(1);
    linkedList.append(2);
    expect(linkedList.tail.value).toBe(2);
    expect(linkedList.tail.next).toBeNull();
    expect(linkedList.size).toBe(2);
  });

  // Test cases for insert method
  test('insert should add a node at the beginning when index is 0', () => {
    linkedList.append(1);
    linkedList.insert(0, 0);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next.value).toBe(0);
    expect(linkedList.size).toBe(2);
  });

  test('insert should add a node at the end when index equals size', () => {
    linkedList.append(1);
    linkedList.insert(1, 1);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.head.next.value).toBe(1);
    expect(linkedList.size).toBe(2);
  });

  test('insert should throw an error for invalid index', () => {
    expect(() => linkedList.insert(1, -1)).toThrow('参数异常-索引错误，值不能添加至错误的位置');
    expect(() => linkedList.insert(1, 2)).toThrow('参数异常-索引错误，值不能添加至错误的位置');
  });

  // Test cases for delete method
  test('delete should remove all occurrences of a value', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(1);
    const deletedNodes = linkedList.delete(1);
    expect(deletedNodes.length).toBe(2);
    expect(linkedList.size).toBe(1);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.head.next).toBeNull();
  });

  test('delete should not affect the list if value is not present', () => {
    linkedList.append(1);
    linkedList.delete(2);
    expect(linkedList.size).toBe(1);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.head.next).toBeNull();
  });

  // Test cases for find method
  test('find should return the first node with the given value', () => {
    linkedList.append(1);
    linkedList.append(2);
    const foundNode = linkedList.find(2);
    expect(foundNode.value).toBe(2);
  });

  test('find should return null if the value is not in the list', () => {
    linkedList.append(1);
    const foundNode = linkedList.find(2);
    expect(foundNode).toBeNull();
  });

  // Test cases for deleteTail method
  test('deleteTail should remove the tail node when list has more than one node', () => {
    linkedList.append(1);
    linkedList.append(2);
    const deletedTail = linkedList.deleteTail();
    expect(deletedTail.value).toBe(2);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.size).toBe(1);
  });

  test('deleteTail should set head to null when deleting the only node', () => {
    linkedList.append(1);
    const deletedTail = linkedList.deleteTail();
    expect(deletedTail.value).toBe(1);
    expect(linkedList.head).toBeNull();
    expect(linkedList.size).toBe(0);
  });

  // Test cases for deleteHead method
  test('deleteHead should remove the head node and set the next node as head', () => {
    linkedList.append(1);
    linkedList.append(2);
    const deletedHead = linkedList.deleteHead();
    expect(deletedHead.value).toBe(1);
    expect(linkedList.head.value).toBe(2);
    expect(linkedList.size).toBe(1);
  });

  test('deleteHead should set head and tail to null when deleting the only node', () => {
    linkedList.append(1);
    const deletedHead = linkedList.deleteHead();
    expect(deletedHead.value).toBe(1);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.size).toBe(0);
  });

  // Test cases for fromArray method
  test('fromArray should create a linked list from an array', () => {
    const arr = [1, 2, 3];
    linkedList.fromArray(arr);
    expect(linkedList.head.value).toBe(1);
    expect(linkedList.tail.value).toBe(3);
    expect(linkedList.size).toBe(3);
  });

  test('fromArray should throw an error for non-array input', () => {
    expect(() => linkedList.fromArray({})).toThrow('参数类型异常-应为 Array ');
  });

  // Test cases for toArray method
  test('toArray should convert the linked list to an array', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    const arr = linkedList.toArray();
    expect(arr).toEqual([1, 2, 3]);
  });

  test('toArray should accept a callback function to modify values', () => {
    linkedList.append(1);
    linkedList.append(2);
    const arr = linkedList.toArray({ callback: (value) => value + 1 });
    expect(arr).toEqual([2, 3]);
  });

  // Test cases for reverse method
  test('reverse should reverse the order of nodes in the list', () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.reverse();
    expect(linkedList.head.value).toBe(3);
    expect(linkedList.tail.value).toBe(1);
    expect(linkedList.size).toBe(3);
  });

  test('reverse should work correctly for an empty list', () => {
    linkedList.reverse();
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.size).toBe(0);
  });
});