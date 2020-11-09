import addUrlSlashes from '../addUrlSlashes';

test('works correctly on url with or without protocol', () => {
  expect(addUrlSlashes('http://test.test')).toBe('http://test.test');
  expect(addUrlSlashes('https://test.test')).toBe('https://test.test');
  expect(addUrlSlashes('htp://test.test')).toBe('//htp://test.test');
  expect(addUrlSlashes('test.test')).toBe('//test.test');
  expect(addUrlSlashes('//test.test')).toBe('//test.test');
});
