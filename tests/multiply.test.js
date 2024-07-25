import { multiply } from '../src/multiply';

// Simple test cases
const testCases = [
  { a: 2, b: 3, expected: 6 },
  { a: 0, b: 3, expected: 0 },
  { a: -1, b: 3, expected: -3 },
];

testCases.forEach(({ a, b, expected }) => {
  const result = multiply(a, b);
  if (result === expected) {
    console.log(`Test passed for multiply(${a}, ${b}): ${result} === ${expected}`);
  } else {
    console.error(`Test failed for multiply(${a}, ${b}): ${result} !== ${expected}`);
  }
});



