import {
  interpolateString,
  toCamelCase,
  toPascalCase,
} from '../translateUtils';

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

describe('interpolateString function', () => {
  it('replaces placeholder with string value', () => {
    expect(interpolateString('Hello, ${name}!', { name: 'John' })).toBe(
      'Hello, John!'
    );
  });

  it('replaces placeholder with numeric value', () => {
    expect(interpolateString('Event count ${count} pcs', { count: 123 })).toBe(
      'Event count 123 pcs'
    );
  });

  it('returns non-template string as it is', () => {
    expect(
      interpolateString('non-template string', { unusedKey: 'unusedValue' })
    ).toBe('non-template string');
  });

  it('raises exception if a placeholder is not replaced with a value', () => {
    expect(() =>
      interpolateString('${replaced} and ${notReplaced}', { replaced: 123 })
    ).toThrowError('notReplaced is not defined');
  });

  it('replaces multiple values of different types', () => {
    expect(
      interpolateString('The ${age} y.o. ${item} is still ${adjective}!', {
        age: 150,
        item: 'compass',
        adjective: 'functional',
      })
    ).toBe('The 150 y.o. compass is still functional!');
  });
});
