import getPageFromUrl from '../getPageFromUrl';

describe('getPageFromUrl function', () => {
  it('should return page number', () => {
    expect(getPageFromUrl('https://localhost:3000/?page=6')).toBe(6);
    expect(
      getPageFromUrl(
        'https://localhost:3000/?data_source=palvelutarjotin&page=6'
      )
    ).toBe(6);
  });
  it("should return 0 when page number doesn't found ", () => {
    expect(getPageFromUrl('https://localhost:3000')).toBe(0);
  });
});
