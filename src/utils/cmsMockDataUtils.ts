import { faker } from '@faker-js/faker';
import merge from 'lodash/merge';

import { pageInfoMock } from './mockDataUtils';
import {
  Language,
  LanguageCodeEnum,
  MediaItem,
  MenuItem,
  Page,
  Post,
  Seo,
} from '../generated/graphql-cms';

const generateUri = () => faker.word.words().split(' ').join('/');

export const fakeLanguage = (overrides?: Partial<Language>): Language => {
  const languageCode =
    overrides?.code ??
    faker.helpers.arrayElement([
      LanguageCodeEnum.En,
      LanguageCodeEnum.Fi,
      LanguageCodeEnum.Sv,
    ]);
  return merge<Language, typeof overrides>(
    {
      id: faker.string.uuid(),
      code: languageCode,
      locale: languageCode.toLowerCase(),
      slug: languageCode.toLowerCase(),
      name: {
        [LanguageCodeEnum.En]: 'Englanti',
        [LanguageCodeEnum.Fi]: 'Suomi',
        [LanguageCodeEnum.Sv]: 'Ruotsi',
      }[languageCode],
    },
    overrides
  );
};

export const fakeSEO = (overrides?: Partial<Seo>): Seo => {
  return merge<Seo, typeof overrides>(
    {
      canonicalUrl: faker.internet.url(),
      description: faker.lorem.text(),
      title: faker.word.words(),
      twitterDescription: faker.word.words(),
      twitterTitle: faker.word.words(),
      openGraphType: faker.word.words(),
      openGraphDescription: faker.word.words(),
      openGraphTitle: faker.word.words(),
      __typename: 'SEO',
    },
    overrides
  );
};

export const fakeMenuItem = (overrides?: Partial<MenuItem>): MenuItem => {
  return merge<MenuItem, typeof overrides>(
    {
      databaseId: faker.number.int(),
      id: faker.string.sample(),
      path: '',
      __typename: 'MenuItem',
    },
    overrides
  );
};

export const fakeMediaItem = (overrides?: Partial<MediaItem>): MediaItem => {
  return merge<MediaItem, typeof overrides>(
    {
      id: faker.string.uuid(),
      title: faker.word.words(),
      mediaItemId: faker.number.int(),
      databaseId: faker.number.int(),
      mediaItemUrl: faker.internet.url(),
      link: faker.internet.url(),
      altText: faker.word.words(),
      mimeType: faker.word.words(),
      uri: faker.internet.url(),
      isComment: false,
      isFrontPage: false,
      isPostsPage: false,
      isTermNode: false,
      isContentNode: false,
      __typename: 'MediaItem',
      contentTypeName: '',
    },
    overrides
  );
};

export const fakePage = (
  overrides?: Partial<Page>,
  isTranslation?: boolean
): Page => {
  return merge<Page, typeof overrides>(
    {
      id: faker.string.uuid(),
      uri: generateUri(),
      title: faker.word.words(),
      lead: faker.word.words(),
      slug: generateUri(),
      content: faker.word.words(),
      databaseId: faker.number.int(),
      isComment: false,
      isFrontPage: false,
      isPostsPage: false,
      isPrivacyPage: false,
      pageId: faker.number.int(),
      language: fakeLanguage({ code: LanguageCodeEnum.Fi }),
      sidebar: [],
      seo: fakeSEO(),
      // to avoid infinite recursion loop :D
      translations: isTranslation
        ? null
        : [
            fakePage(
              { language: fakeLanguage({ code: LanguageCodeEnum.En }) },
              true
            ),
            fakePage(
              { language: fakeLanguage({ code: LanguageCodeEnum.Sv }) },
              true
            ),
          ],
      featuredImage: {
        node: fakeMediaItem(),
        __typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
      },
      children: {
        edges: [],
        nodes: [],
        __typename: 'HierarchicalContentNodeToContentNodeChildrenConnection',
        pageInfo: {
          ...pageInfoMock,
          __typename:
            'HierarchicalContentNodeToContentNodeChildrenConnectionPageInfo',
        },
      },
      parent: null,
      isContentNode: false,
      isTermNode: false,
      __typename: 'Page',
      contentTypeName: '',
    },
    overrides
  );
};

export const fakePost = (
  overrides?: Partial<Post>,
  isTranslation?: boolean
): Post => {
  return merge<Post, typeof overrides>(
    {
      id: faker.string.uuid(),
      postId: faker.number.int(),
      uri: generateUri(),
      title: faker.word.words(),
      lead: faker.word.words(),
      slug: generateUri(),
      content: faker.word.words(),
      databaseId: faker.number.int(),
      language: fakeLanguage({ code: LanguageCodeEnum.Fi }),
      seo: fakeSEO(),
      isFrontPage: false,
      isComment: false,
      isContentNode: false,
      isPostsPage: false,
      isTermNode: false,
      // to avoid infinite recursion loop :D
      translations: isTranslation
        ? null
        : [
            fakePost(
              { language: fakeLanguage({ code: LanguageCodeEnum.En }) },
              true
            ),
            fakePost(
              { language: fakeLanguage({ code: LanguageCodeEnum.Sv }) },
              true
            ),
          ],
      featuredImage: {
        node: fakeMediaItem(),
        __typename: 'NodeWithFeaturedImageToMediaItemConnectionEdge',
      },
      __typename: 'Post',
      isSticky: false,
      contentTypeName: '',
    },
    overrides
  );
};
