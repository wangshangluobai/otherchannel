import { HashTable } from '../data-structures/HashTable.js';
import { LinkedList } from '../data-structures/LinkedList.js';

describe('HashTable', () => {
  let hashTable;
  const defaultHashSize = 32;

  beforeEach(() => {
    hashTable = new HashTable(defaultHashSize);
  });

  describe('#constructor', () => {
    test('should initialize with default hash size', () => {
      expect(hashTable.buckets.length).toBe(defaultHashSize);
    });

    test('should initialize keys object', () => {
      expect(Object.keys(hashTable.keys)).toHaveLength(0);
    });
  });

  describe('#hash', () => {
    test('should return a valid index for a given key', () => {
      const key = 'testKey';
      const index = hashTable.hash(key);
      expect(index >= 0 && index < defaultHashSize).toBe(true);
    });
  });

  describe('#set', () => {
    test('should set a key-value pair', () => {
      const key = 'key1';
      const value = 'value1';
      hashTable.set(key, value);
      expect(hashTable.get(key)).toBe(value);
    });

    test('should update an existing key-value pair', () => {
      const key = 'key2';
      const initialValue = 'value2';
      const updatedValue = 'updatedValue2';
      hashTable.set(key, initialValue);
      hashTable.set(key, updatedValue);
      expect(hashTable.get(key)).toBe(initialValue);
    });
  });

  describe('#get', () => {
    test('should return the value for a given key', () => {
      const key = 'key3';
      const value = 'value3';
      hashTable.set(key, value);
      expect(hashTable.get(key)).toBe(value);
    });

    test('should return undefined for a non-existent key', () => {
      const key = 'nonExistentKey';
      expect(hashTable.get(key)).toBeUndefined();
    });
  });

  describe('#delete', () => {
    test('should delete a key-value pair', () => {
      const key = 'key4';
      const value = 'value4';
      hashTable.set(key, value);
      const deleted = hashTable.delete(key);
      expect(deleted).toBe(true);
      console.log('%c [ hashTable ]-69', 'font-size:13px; background:#ed6f2b; color:#ffb36f;', hashTable);
      expect(hashTable.has(key)).toBe(false);
    });

    test('should return null for a non-existent key', () => {
      const key = 'nonExistentKey';
      const deleted = hashTable.delete(key);
      expect(deleted).toBe(null);
    });
  });

  describe('#has', () => {
    test('should return true for an existing key', () => {
      const key = 'key5';
      hashTable.set(key, 'value5');
      expect(hashTable.has(key)).toBe(true);
    });

    test('should return false for a non-existent key', () => {
      const key = 'nonExistentKey';
      expect(hashTable.has(key)).toBe(false);
    });
  });

  describe('#getKeys', () => {
    test('should return all stored keys', () => {
      const keys = ['key6', 'key7'];
      keys.forEach(key => hashTable.set(key, 'value'));
      expect(hashTable.getKeys()).toEqual(keys);
    });
  });

  describe('#getValues', () => {
    test('should return all stored values', () => {
      const values = ['value6', 'value7'];
      values.forEach((value, i) => hashTable.set(`key${i + 6}`, value));
      expect(hashTable.getSortedBySetValues()).toEqual(values);
    });
  });
});