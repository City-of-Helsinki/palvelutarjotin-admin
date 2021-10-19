import formatDate from '../formatDate';

describe('formatDate function', () => {
  it('format date string', () => {
    expect(formatDate(null)).toBe('');

    expect(formatDate(new Date('2019-11-08T12:27:34+02:00'))).toBe('8.11.2019');

    expect(
      formatDate(new Date('2019-11-08T12:27:34+02:00'), 'd.M.yyy hh:mm')
    ).toBe('8.11.2019 12:27');
  });
});
