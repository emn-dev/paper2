import { describe, expect, it } from 'vitest';
import { ref as p2 } from '~/globals';

describe('Given: Size Class', () => {
  describe('WHEN new Size(10, 20)', () => {
    it.only('THEN should set props correctly', () => {
      const size = new p2.Size(10, 20);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size([10, 20])', () => {
    it('THEN should set props correctly', () => {
      const size = new p2.Size([10, 20]);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({width: 10, height: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new p2.Size({ width: 10, height: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size(new Point(10, 20))', () => {
    it('THEN should set props correctly', () => {
      const size = new p2.Size(new p2.Point(10, 20));
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({ x: 10, y: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new p2.Size({ x: 10, y: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size("10, 20")', () => {
    it('THEN should set props correctly', () => {
      expect(new p2.Size('10, 20')).toEqual(new p2.Size(10, 20));
      expect(new p2.Size('10,20')).toEqual(new p2.Size(10, 20));
      expect(new p2.Size('10 20')).toEqual(new p2.Size(10, 20));
      // Make sure it's integer values from the string:
      expect(new p2.Size('10 20').add(10)).toEqual(new p2.Size(20, 30));
    });
  });
});
