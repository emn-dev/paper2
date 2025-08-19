import { describe, expect, it } from 'vitest';
import { Size, Point } from '~/index-core';

describe('Given: Size Class', () => {
  describe('WHEN new Size(10, 20)', () => {
    it('THEN should set props correctly', () => {
      const size = new Size(10, 20);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size([10, 20])', () => {
    it('THEN should set props correctly', () => {
      const size = new Size([10, 20]);
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({width: 10, height: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new Size({ width: 10, height: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size(new Point(10, 20))', () => {
    it('THEN should set props correctly', () => {
      const size = new Size(new Point(10, 20));
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size({ x: 10, y: 20})', () => {
    it('THEN should set props correctly', () => {
      const size = new Size({ x: 10, y: 20 });
      expect(size.toString()).toBe('{ width: 10, height: 20 }');
    });
  });

  describe('WHEN new Size("10, 20")', () => {
    it('THEN should set props correctly', () => {
      expect(new Size('10, 20')).toEqual(new Size(10, 20));
      expect(new Size('10,20')).toEqual(new Size(10, 20));
      expect(new Size('10 20')).toEqual(new Size(10, 20));
      // Make sure it's integer values from the string:
      expect(new Size('10 20').add(10)).toEqual(new Size(20, 30));
    });
  });
});
