import { Stack } from '../data-structures/Stack';

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('#isEmpty', () => {
    test('should return true for a new stack', () => {
      expect(stack.isEmpty()).toBe(true);
    });

    test('should return false after pushing an item', () => {
      stack.push(1);
      expect(stack.isEmpty()).toBe(false);
    });
  });

  describe('#peek', () => {
    test('should return null for an empty stack', () => {
      expect(stack.peek()).toBe(null);
    });

    test('should return the top item without modifying the stack', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.peek()).toBe(2);
      expect(stack.toArray()).toEqual([2, 1]); // 验证栈未改变
    });
  });

  describe('#push', () => {
    test('should add an item to the stack', () => {
      stack.push(1);
      expect(stack.toArray()).toEqual([1]);
    });

    test('should allow adding multiple items', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.toArray()).toEqual([3, 2, 1]);
    });
  });

  describe('#pop', () => {
    test('should return null for an empty stack', () => {
      expect(stack.pop()).toBe(null);
    });

    test('should remove and return the top item', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.toArray()).toEqual([1]);
    });

    test('should handle multiple pops correctly', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      expect(stack.pop()).toBe(3);
      expect(stack.pop()).toBe(2);
      expect(stack.pop()).toBe(1);
      expect(stack.pop()).toBe(null);
    });
  });

  describe('#toArray', () => {
    test('should return an empty array for a new stack', () => {
      expect(stack.toArray()).toEqual([]);
    });

    test('should return the stack as an array in LIFO order', () => {
      stack.push('a');
      stack.push('b');
      stack.push('c');
      expect(stack.toArray()).toEqual(['c', 'b', 'a']);
    });
  });
});