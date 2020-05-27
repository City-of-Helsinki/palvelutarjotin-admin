import formatDate from '../formatDate';

describe('formatDate function', () => {
  it('format date string', () => {
    expect(formatDate(null)).toBe('');

    expect(formatDate(new Date('2019-11-08T12:27:34+02:00'))).toBe(
      '08.11.2019'
    );

    expect(
      formatDate(new Date('2019-11-08T12:27:34+02:00'), 'dd.MM.yyy hh:mm')
    ).toBe('08.11.2019 12:27');
  });
});
