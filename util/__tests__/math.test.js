import { sum } from '../math';

test('adds two numbers together', () => {
  expect(sum(1, 1)).toBe(2);
});

test('throws on non-numbers', () => {
  expect(() => sum('1', 2)).toThrow();
});
