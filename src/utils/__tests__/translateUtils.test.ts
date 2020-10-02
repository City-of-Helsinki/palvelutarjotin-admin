import { toCamelCase, toPascalCase } from '../translateUtils';

describe('toCamelCase function', () => {
  it('convert snake case string to camel case', () => {
    expect(toCamelCase('STRING_TO_CAMEL_CASE')).toBe('stringToCamelCase');
  });
});

describe('toPascalCase function', () => {
  it('convert snake case string to pascal case', () => {
    expect(toPascalCase('STRING_TO_PASCAL_CASE')).toBe('StringToPascalCase');
  });
});
