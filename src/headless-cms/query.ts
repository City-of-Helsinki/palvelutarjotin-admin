import { gql } from '@apollo/client/core';

export const MENU_QUERY = gql`
  query Menu($id: ID!, $idType: MenuNodeIdTypeEnum) {
    menu(id: $id, idType: $idType) {
      id
      name
      slug
      menuId
      menuItems {
        nodes {
          connectedNode {
            node {
              ... on Page {
                ...menuPageFields
                children {
                  nodes {
                    ...menuPageFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment menuPageFields on Page {
    ...pageFields
    translations {
      ...pageFields
    }
  }
`;

export const PAGE_QUERY = gql`
  query Page($id: ID!, $idType: PageIdType) {
    page(id: $id, idType: $idType) {
      ...pageFields
      parent {
        node {
          ... on Page {
            ...pageFields
            translations {
              ...pageFields
            }
          }
        }
      }
      children {
        nodes {
          ... on Page {
            ...pageFields
            translations {
              ...pageFields
            }
          }
        }
      }
      translations {
        ...pageFields
      }
    }
  }

  fragment pageFields on Page {
    id
    content
    slug
    title
    uri
    lead
    seo {
      ...seoFields
    }
    language {
      code
      slug
      locale
      name
    }
    featuredImage {
      node {
        mediaItemUrl
        link
        altText
        mimeType
        title
        uri
      }
    }
    sidebar {
      ... on LayoutLinkList {
        anchor
        title
        description
        links {
          target
          title
          url
        }
      }
      ... on LayoutArticles {
        articles {
          id
          title
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      ... on LayoutPages {
        pages {
          id
          title
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }

  fragment seoFields on SEO {
    title
    description
    openGraphTitle
    openGraphDescription
    openGraphType
    twitterTitle
    twitterDescription
  }
`;

export const PAGES_QUERY = gql`
  query Pages {
    pages {
      edges {
        node {
          ...pageFields
        }
      }
    }
  }
`;

export const SUBPAGES_SEARCH_QUERY = gql`
  query SubPagesSearch(
    $id: ID!
    $idType: PageIdType
    $search: String!
    $first: Int
    $after: String
  ) {
    page(id: $id, idType: $idType) {
      id
      children(where: { search: $search }, first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ... on Page {
              ...pageFields
              translations {
                ...pageFields
              }
            }
          }
        }
      }
    }
  }
`;
