import { uriToBreadcrumbs } from '../utils';

describe('uriToBreadcrumbs', () => {
  test.each([
    {
      uri: '',
      expected: [],
    },
    {
      uri: '/slug1/',
      expected: ['/slug1/'],
    },
    {
      uri: '/slug1/slug2/',
      expected: ['/slug1/', '/slug1/slug2/'],
    },
    {
      uri: '/slug1/slug2/slug3/',
      expected: ['/slug1/', '/slug1/slug2/', '/slug1/slug2/slug3/'],
    },
    {
      uri: '/slug1/slug2/slug3/slug4/',
      expected: [
        '/slug1/',
        '/slug1/slug2/',
        '/slug1/slug2/slug3/',
        '/slug1/slug2/slug3/slug4/',
      ],
    },
  ])('uriToBreadcrumbs("$uri") returns $expected', ({ uri, expected }) => {
    expect(uriToBreadcrumbs(uri)).toEqual(expected);
  });
});
