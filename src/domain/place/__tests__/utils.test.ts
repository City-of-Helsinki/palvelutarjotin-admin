import { generateHslLink, generateServiceMapLink } from '../utils';

describe('generateHslLink function', () => {
  it('should return valid hsl direction link', () => {
    expect(generateHslLink('Mannerheimintie 123 B', 'Helsinki', 'fi')).toBe(
      'https://www.reittiopas.fi/fi/?to=Mannerheimintie+123+B,Helsinki'
    );
    expect(generateHslLink('Mannerheimintie 123 B', 'Helsinki', 'en')).toBe(
      'https://www.reittiopas.fi/en/?to=Mannerheimintie+123+B,Helsinki'
    );
  });
});

describe('generateServiceMapLink function', () => {
  it('should return valid service map link', () => {
    expect(generateServiceMapLink('tprek:15417', 'fi')).toBe(
      'https://palvelukartta.hel.fi/fi/unit/15417'
    );
    expect(generateServiceMapLink('tprek:15417', 'en')).toBe(
      'https://palvelukartta.hel.fi/en/unit/15417'
    );
  });
});
