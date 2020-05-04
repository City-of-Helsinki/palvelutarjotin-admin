import { generateHslLink, generateServiceMapLink } from '../utils';

describe('generateHslLink function', () => {
  it('should return valid hsl direction link', () => {
    expect(generateHslLink('Mannerheimintie 123 B', 'Helsinki')).toBe(
      'http://www.reittiopas.fi/fi/?to=Mannerheimintie+123+B,Helsinki'
    );
  });
});

describe('generateServiceMapLink function', () => {
  it('should return valid service map link', () => {
    expect(generateServiceMapLink('tprek:15417')).toBe(
      'https://palvelukartta.hel.fi/fi/unit/15417'
    );
  });
});
