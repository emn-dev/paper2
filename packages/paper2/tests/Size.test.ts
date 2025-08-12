import { describe, expect, it } from 'vitest';
import { ref } from '~/globals';
// import { Size } from '~/basic/Size';
// import { Point } from '~/basic/Point';

describe('Given: Size Class', () => {
  describe('WHEN new Size(10, 20)', () => {
    it('THEN should set props correctly', () => {
      const size = new ref.Size(10, 20);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size([10, 20])', () => {
    it('THEN should set props correctly', () => {
      const size = new ref.Size([10, 20]);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({width: 10, height: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new ref.Size({ width: 10, height: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size(new Point(10, 20))', () => {
    it('THEN should set props correctly', () => {
      const size = new ref.Size(new ref.Point(10, 20));
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({ x: 10, y: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new ref.Size({ x: 10, y: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size("10, 20")', () => {
    it('THEN should set props correctly', () => {
      expect(new ref.Size('10, 20')).toEqual(new ref.Size(10, 20));
      expect(new ref.Size('10,20')).toEqual(new ref.Size(10, 20));
      expect(new ref.Size('10 20')).toEqual(new ref.Size(10, 20));
      // Make sure it's integer values from the string:
      expect(new ref.Size('10 20').add(10)).toEqual(new ref.Size(20, 30));
    });
  });
});
