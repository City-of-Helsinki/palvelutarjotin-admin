import sortFavorably from '../sortFavorably';

describe('sortFavorably function', () => {
  it('adds favored items in the beginning and rest of the items alphabetically', () => {
    const favored = ['a', 'b', 'c'];
    [
      [
        ['x', 'c', 'a', 'y'],
        ['a', 'c', 'x', 'y'],
      ],
      [
        ['y', 'b', 'x', 'a'],
        ['a', 'b', 'x', 'y'],
      ],
      [[], []],
      [['b'], ['b']],
      [['y'], ['y']],
    ].forEach(([sortable, result]) =>
      expect(sortFavorably(sortable, favored)).toEqual(result)
    );
  });

  it('should not mutate given parameters', () => {
    const favored = ['a', 'b', 'c'];
    const sortable = ['x', 'c', 'a', 'y'];
    sortFavorably(sortable, favored);
    expect(favored).toEqual(['a', 'b', 'c']);
    expect(sortable).toEqual(['x', 'c', 'a', 'y']);
  });
});
