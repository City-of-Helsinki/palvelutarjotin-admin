import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  collectionDetails: CollectionDetails;
  collectionList: CollectionListResponse;
  eventDetails: EventDetails;
  eventList: EventListResponse;
  eventsByIds: Array<EventDetails>;
  keywordDetails: Keyword;
  keywordList: KeywordListResponse;
  landingPage: LandingPageResponse;
  neighborhoodList: NeighborhoodListResponse;
  organizationDetails: OrganizationDetails;
  placeDetails: Place;
  placeList: PlaceListResponse;
};


export type QueryCollectionDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCollectionListArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};


export type QueryEventDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryEventListArgs = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  endDate?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
};


export type QueryEventsByIdsArgs = {
  ids: Array<Scalars['ID']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryKeywordDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryLandingPageArgs = {
  visibleOnFrontpage?: Maybe<Scalars['Boolean']>;
};


export type QueryOrganizationDetailsArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPlaceDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaceListArgs = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type CollectionDetails = {
   __typename?: 'CollectionDetails';
  id: Scalars['ID'];
  boxColor?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['Int']>;
  curatedEvents: Array<Scalars['String']>;
  curatedEventsTitle: LocalizedObject;
  depth?: Maybe<Scalars['Int']>;
  description: LocalizedObject;
  draftTitle?: Maybe<Scalars['String']>;
  eventListQuery?: Maybe<Scalars['String']>;
  eventListTitle: LocalizedObject;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  heroImage?: Maybe<Scalars['String']>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  linkText: LocalizedObject;
  linkUrl: LocalizedObject;
  live?: Maybe<Scalars['Boolean']>;
  liveRevision?: Maybe<Scalars['Int']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  lockedBy?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  searchDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  socialMediaDescription?: Maybe<LocalizedObject>;
  subtitles: LocalizedObject;
  title: LocalizedObject;
  urlPath?: Maybe<Scalars['String']>;
};

export type LocalizedObject = {
   __typename?: 'LocalizedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type CollectionListResponse = {
   __typename?: 'CollectionListResponse';
  data: Array<CollectionDetails>;
};

export type EventDetails = {
   __typename?: 'EventDetails';
  id: Scalars['ID'];
  location?: Maybe<Place>;
  keywords: Array<Keyword>;
  superEvent?: Maybe<InternalIdObject>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  offers: Array<Offer>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  subEvents: Array<InternalIdObject>;
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  audience: Array<InternalIdObject>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<ExtensionCourse>;
  name: LocalizedObject;
  locationExtraInfo?: Maybe<LocalizedObject>;
  shortDescription?: Maybe<LocalizedObject>;
  provider?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type Place = {
   __typename?: 'Place';
  id: Scalars['ID'];
  divisions?: Maybe<Array<Division>>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  addressRegion?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  parent?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  position?: Maybe<PlacePosition>;
  name?: Maybe<LocalizedObject>;
  description?: Maybe<Scalars['String']>;
  telephone?: Maybe<LocalizedObject>;
  addressLocality?: Maybe<LocalizedObject>;
  streetAddress?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type Division = {
   __typename?: 'Division';
  type: Scalars['String'];
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalizedObject>;
};

export type Image = {
   __typename?: 'Image';
  id: Scalars['ID'];
  license?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type PlacePosition = {
   __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Keyword = {
   __typename?: 'Keyword';
  id: Scalars['ID'];
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  aggregate?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Image>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type InternalIdObject = {
   __typename?: 'InternalIdObject';
  internalId?: Maybe<Scalars['String']>;
};

export type ExternalLink = {
   __typename?: 'ExternalLink';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type Offer = {
   __typename?: 'Offer';
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalizedObject>;
  price?: Maybe<LocalizedObject>;
  infoUrl?: Maybe<LocalizedObject>;
};

export type InLanguage = {
   __typename?: 'InLanguage';
  id?: Maybe<Scalars['ID']>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<LocalizedObject>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse';
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type EventListResponse = {
   __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<EventDetails>;
};

export type Meta = {
   __typename?: 'Meta';
  count: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type KeywordListResponse = {
   __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type LandingPageResponse = {
   __typename?: 'LandingPageResponse';
  data: Array<LandingPage>;
};

export type LandingPage = {
   __typename?: 'LandingPage';
  id: Scalars['ID'];
  path?: Maybe<Scalars['String']>;
  depth?: Maybe<Scalars['Int']>;
  numchild?: Maybe<Scalars['Int']>;
  draftTitle?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  live?: Maybe<Scalars['Boolean']>;
  hasUnpublishedChanges?: Maybe<Scalars['Boolean']>;
  urlPath?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  showInMenus?: Maybe<Scalars['Boolean']>;
  searchDescription?: Maybe<Scalars['String']>;
  goLiveAt?: Maybe<Scalars['String']>;
  expireAt?: Maybe<Scalars['String']>;
  expired?: Maybe<Scalars['Boolean']>;
  locked?: Maybe<Scalars['Boolean']>;
  lockedAt?: Maybe<Scalars['String']>;
  firstPublishedAt?: Maybe<Scalars['String']>;
  lastPublishedAt?: Maybe<Scalars['String']>;
  latestRevisionCreatedAt?: Maybe<Scalars['String']>;
  title?: Maybe<LocalizedObject>;
  description?: Maybe<LocalizedObject>;
  buttonText?: Maybe<LocalizedObject>;
  buttonUrl?: Maybe<LocalizedObject>;
  heroBackgroundImage?: Maybe<LocalizedObject>;
  heroTopLayerImage?: Maybe<LocalizedObject>;
  metaInformation?: Maybe<LocalizedObject>;
  pageTitle?: Maybe<LocalizedObject>;
  contentType?: Maybe<Scalars['Int']>;
  owner?: Maybe<Scalars['Int']>;
  lockedBy?: Maybe<Scalars['Int']>;
  liveRevision?: Maybe<Scalars['Int']>;
};

export type NeighborhoodListResponse = {
   __typename?: 'NeighborhoodListResponse';
  meta: Meta;
  data: Array<Neighborhood>;
};

export type Neighborhood = {
   __typename?: 'Neighborhood';
  id: Scalars['ID'];
  name: LocalizedObject;
};

export type OrganizationDetails = {
   __typename?: 'OrganizationDetails';
  id: Scalars['ID'];
  dataSource?: Maybe<Scalars['String']>;
  classification?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  foundingDate?: Maybe<Scalars['String']>;
  dissolutionDate?: Maybe<Scalars['String']>;
  parentOrganization?: Maybe<Scalars['String']>;
  subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  affiliatedOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  isAffiliated: Scalars['Boolean'];
  replacedBy?: Maybe<Scalars['String']>;
  internalId?: Maybe<Scalars['String']>;
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
};

export type PlaceListResponse = {
   __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
};

export type KeywordDetailsQueryVariables = {
  id: Scalars['ID'];
};


export type KeywordDetailsQuery = (
  { __typename?: 'Query' }
  & { keywordDetails: (
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'id'>
    & { name?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type KeywordListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type KeywordListQuery = (
  { __typename?: 'Query' }
  & { keywordList: (
    { __typename?: 'KeywordListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id'>
      & { name?: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  ) }
);

export type PlaceDetailsQueryVariables = {
  id: Scalars['ID'];
};


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: (
    { __typename?: 'Place' }
    & Pick<Place, 'id'>
    & { name?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )>, streetAddress?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )>, addressLocality?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )>, telephone?: Maybe<(
      { __typename?: 'LocalizedObject' }
      & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
    )> }
  ) }
);

export type PlaceListQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type PlaceListQuery = (
  { __typename?: 'Query' }
  & { placeList: (
    { __typename?: 'PlaceListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id'>
      & { name?: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, streetAddress?: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, addressLocality?: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )>, telephone?: Maybe<(
        { __typename?: 'LocalizedObject' }
        & Pick<LocalizedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  ) }
);


export const KeywordDetailsDocument = gql`
    query KeywordDetails($id: ID!) {
  keywordDetails(id: $id) {
    id
    name {
      fi
      sv
      en
    }
  }
}
    `;
export type KeywordDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordDetailsQuery, KeywordDetailsQueryVariables>
    } & TChildProps;
export function withKeywordDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordDetailsQuery,
  KeywordDetailsQueryVariables,
  KeywordDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordDetailsQuery, KeywordDetailsQueryVariables, KeywordDetailsProps<TChildProps, TDataName>>(KeywordDetailsDocument, {
      alias: 'keywordDetails',
      ...operationOptions
    });
};

/**
 * __useKeywordDetailsQuery__
 *
 * To run a query within a React component, call `useKeywordDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, baseOptions);
      }
export function useKeywordDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordDetailsQuery, KeywordDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordDetailsQuery, KeywordDetailsQueryVariables>(KeywordDetailsDocument, baseOptions);
        }
export type KeywordDetailsQueryHookResult = ReturnType<typeof useKeywordDetailsQuery>;
export type KeywordDetailsLazyQueryHookResult = ReturnType<typeof useKeywordDetailsLazyQuery>;
export type KeywordDetailsQueryResult = ApolloReactCommon.QueryResult<KeywordDetailsQuery, KeywordDetailsQueryVariables>;
export const KeywordListDocument = gql`
    query KeywordList($dataSource: String, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywordList(dataSource: $dataSource, page: $page, pageSize: $pageSize, showAllKeywords: $showAllKeywords, sort: $sort, text: $text) {
    meta {
      count
      next
      previous
    }
    data {
      id
      name {
        fi
        sv
        en
      }
    }
  }
}
    `;
export type KeywordListProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordListQuery, KeywordListQueryVariables>
    } & TChildProps;
export function withKeywordList<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordListQuery,
  KeywordListQueryVariables,
  KeywordListProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordListQuery, KeywordListQueryVariables, KeywordListProps<TChildProps, TDataName>>(KeywordListDocument, {
      alias: 'keywordList',
      ...operationOptions
    });
};

/**
 * __useKeywordListQuery__
 *
 * To run a query within a React component, call `useKeywordListQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useKeywordListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, baseOptions);
      }
export function useKeywordListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordListQuery, KeywordListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordListQuery, KeywordListQueryVariables>(KeywordListDocument, baseOptions);
        }
export type KeywordListQueryHookResult = ReturnType<typeof useKeywordListQuery>;
export type KeywordListLazyQueryHookResult = ReturnType<typeof useKeywordListLazyQuery>;
export type KeywordListQueryResult = ApolloReactCommon.QueryResult<KeywordListQuery, KeywordListQueryVariables>;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($id: ID!) {
  placeDetails(id: $id) {
    id
    name {
      fi
      sv
      en
    }
    streetAddress {
      fi
      sv
      en
    }
    addressLocality {
      fi
      sv
      en
    }
    telephone {
      fi
      sv
      en
    }
  }
}
    `;
export type PlaceDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlaceDetailsQuery, PlaceDetailsQueryVariables>
    } & TChildProps;
export function withPlaceDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceDetailsQuery,
  PlaceDetailsQueryVariables,
  PlaceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceDetailsQuery, PlaceDetailsQueryVariables, PlaceDetailsProps<TChildProps, TDataName>>(PlaceDetailsDocument, {
      alias: 'placeDetails',
      ...operationOptions
    });
};

/**
 * __usePlaceDetailsQuery__
 *
 * To run a query within a React component, call `usePlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaceDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
      }
export function usePlaceDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
        }
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<typeof usePlaceDetailsLazyQuery>;
export type PlaceDetailsQueryResult = ApolloReactCommon.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
export const PlaceListDocument = gql`
    query PlaceList($dataSource: String, $divisions: [String], $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  placeList(dataSource: $dataSource, divisions: $divisions, page: $page, pageSize: $pageSize, showAllPlaces: $showAllPlaces, sort: $sort, text: $text) {
    meta {
      count
      next
      previous
    }
    data {
      id
      name {
        fi
        sv
        en
      }
      streetAddress {
        fi
        sv
        en
      }
      addressLocality {
        fi
        sv
        en
      }
      telephone {
        fi
        sv
        en
      }
    }
  }
}
    `;
export type PlaceListProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlaceListQuery, PlaceListQueryVariables>
    } & TChildProps;
export function withPlaceList<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceListQuery,
  PlaceListQueryVariables,
  PlaceListProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceListQuery, PlaceListQueryVariables, PlaceListProps<TChildProps, TDataName>>(PlaceListDocument, {
      alias: 'placeList',
      ...operationOptions
    });
};

/**
 * __usePlaceListQuery__
 *
 * To run a query within a React component, call `usePlaceListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceListQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      divisions: // value for 'divisions'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePlaceListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, baseOptions);
      }
export function usePlaceListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceListQuery, PlaceListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceListQuery, PlaceListQueryVariables>(PlaceListDocument, baseOptions);
        }
export type PlaceListQueryHookResult = ReturnType<typeof usePlaceListQuery>;
export type PlaceListLazyQueryHookResult = ReturnType<typeof usePlaceListLazyQuery>;
export type PlaceListQueryResult = ApolloReactCommon.QueryResult<PlaceListQuery, PlaceListQueryVariables>;