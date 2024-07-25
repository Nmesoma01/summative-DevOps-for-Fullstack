/* eslint-env jest */
const { multiply } = require('../src/multiply');

test('multiply(2, 3) returns 6', () => {
  expect(multiply(2, 3)).toBe(6);
});
