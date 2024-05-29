import { describe, expect, test } from '@jest/globals';
import { Queue } from '../data-structures/Queue';

describe('Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  describe('#isEmpty', () => {
    test('should return true when the queue is empty', () => {
      expect(queue.isEmpty()).toBe(true);
    });

    test('should return false when the queue has elements', () => {
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe('#peek', () => {
    test('should return null when the queue is empty', () => {
      expect(queue.peek()).toBe(null);
    });

    test('should return the first element without removing it', () => {
      queue.enqueue(1);
      expect(queue.peek()).toBe(1);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should return the correct element after enqueuing multiple elements', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
    });
  });

  describe('#enqueue', () => {
    test('should add an element to the queue', () => {
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.peek()).toBe(1);
    });

    test('should add multiple elements to the queue', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isEmpty()).toBe(false);
      expect(queue.peek()).toBe(1);
    });
  });

  describe('#dequeue', () => {
    test('should return null when trying to dequeue from an empty queue', () => {
      expect(queue.dequeue()).toBe(null);
    });

    test('should remove and return the first element from the queue', () => {
      queue.enqueue(1);
      const result = queue.dequeue();
      expect(result).toBe(1);
      expect(queue.isEmpty()).toBe(true);
    });

    test('should dequeue elements in First-In-First-Out (FIFO) order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      const result1 = queue.dequeue();
      expect(result1).toBe(1);
      
      queue.enqueue(3);
      const result2 = queue.dequeue();
      expect(result2).toBe(2);
    });
  });
});