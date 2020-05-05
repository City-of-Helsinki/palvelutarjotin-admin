import getLocalizedString from '../getLocalizedString';

const dummyLocalizedObj = {
  en: 'text en',
  fi: 'text fi',
};

describe('getLocalisedString function', () => {
  it('should return localised string', () => {
    expect(getLocalizedString(dummyLocalizedObj, 'en')).toBe('text en');
    expect(getLocalizedString(dummyLocalizedObj, 'fi')).toBe('text fi');
  });
  it('should return string in default language when localised string is not found', () => {
    expect(getLocalizedString(dummyLocalizedObj, 'sv')).toBe('text fi');
  });
});
