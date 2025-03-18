import {
  getCmsUriFromPath,
  normalizeCmsUri,
  removeSurroundingSlashes,
  slugsToUriSegments,
  stripLocaleFromUri,
  uriToBreadcrumbs,
} from '../utils';

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

describe('stripLocaleFromUri', () => {
  test.each([
    {
      uri: '/en/ensdgfdsd/',
      expected: '/ensdgfdsd/',
    },
    {
      uri: '/en/ensdgfdsd/slug',
      expected: '/ensdgfdsd/slug',
    },
    {
      uri: '/svaasdfgds/',
      expected: '/svaasdfgds/',
    },
    {
      uri: '/fi/slug1',
      expected: '/slug1',
    },
    {
      uri: '/sv/slug1/',
      expected: '/slug1/',
    },
    {
      uri: '/sv1/slug1/',
      expected: '/sv1/slug1/',
    },
    {
      uri: '/fiI/slug1/',
      expected: '/fiI/slug1/',
    },
    {
      uri: '/fi10/slug1/',
      expected: '/fi10/slug1/',
    },
  ])('stripLocaleFromUri("$uri") returns $expected', ({ uri, expected }) => {
    expect(stripLocaleFromUri(uri)).toBe(expected);
  });
});

describe('removeSurroundingSlashes', () => {
  test.each([
    {
      uri: '/moi/',
      expected: 'moi',
    },
    {
      uri: '/slug1/slug2/',
      expected: 'slug1/slug2',
    },
  ])(
    'removeSurroundingSlashes("$uri") returns $expected',
    ({ uri, expected }) => {
      expect(removeSurroundingSlashes(uri)).toBe(expected);
    }
  );
});

describe('slugsToUriSegments', () => {
  test.each([
    {
      slugs: [],
      expected: [],
    },
    {
      slugs: ['slug1'],
      expected: ['/slug1/'],
    },
    {
      slugs: ['slug1', 'slug2'],
      expected: ['/slug1/', '/slug1/slug2/'],
    },
    {
      slugs: ['slug1', 'slug2', 'slug3'],
      expected: ['/slug1/', '/slug1/slug2/', '/slug1/slug2/slug3/'],
    },
  ])('slugsToUriSegments("$uri") returns $expected', ({ slugs, expected }) => {
    expect(slugsToUriSegments(slugs)).toEqual(expected);
  });
});

describe('getCmsUriFromPath', () => {
  test.each([
    {
      slugs: '/fi/cms-page/test',
      expected: '/test',
    },
    {
      slugs: '/sv/cms-page/test',
      expected: '/test',
    },
    {
      slugs: '/en/cms-page/test',
      expected: '/test',
    },
    {
      slugs: '/en/cms-page/test/test2',
      expected: '/test/test2',
    },
    {
      slugs: '/en/cms-page/test/test2/test3',
      expected: '/test/test2/test3',
    },
  ])('getCmsUriFromPath("$uri") returns $expected', ({ slugs, expected }) => {
    expect(getCmsUriFromPath(slugs)).toEqual(expected);
  });
});

describe('normalizeCmsUri', () => {
  test.each([
    {
      uri: '/fi/test1/',
      expected: 'test1',
    },
    {
      uri: '/en/test1/test2/',
      expected: 'test1/test2',
    },
    {
      uri: '/sv/test1/test2/test3',
      expected: 'test1/test2/test3',
    },
  ])('normalizeCmsUri("$uri") returns $expected', ({ uri, expected }) => {
    expect(normalizeCmsUri(uri)).toEqual(expected);
  });
});
