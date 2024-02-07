import { LanguageCodeEnum } from 'react-helsinki-headless-cms';

import getLanguageCode from '../getLanguageCode';

describe('getLanguageCode function', () => {
  it('should map En/Fi/Sv to same language', () => {
    expect(getLanguageCode('en')).toBe(LanguageCodeEnum.En);
    expect(getLanguageCode('fi')).toBe(LanguageCodeEnum.Fi);
    expect(getLanguageCode('sv')).toBe(LanguageCodeEnum.Sv);
  });
});
