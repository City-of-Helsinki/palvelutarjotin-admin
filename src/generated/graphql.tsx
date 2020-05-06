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
  events?: Maybe<EventListResponse>;
  event?: Maybe<Event>;
  places?: Maybe<PlaceListResponse>;
  place?: Maybe<Place>;
  keywords?: Maybe<KeywordListResponse>;
  keyword?: Maybe<Keyword>;
  eventsSearch?: Maybe<EventSearchListResponse>;
  placesSearch?: Maybe<PlaceSearchListResponse>;
};


export type QueryEventsArgs = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  locations?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPlacesArgs = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordsArgs = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryKeywordArgs = {
  id: Scalars['ID'];
};


export type QueryEventsSearchArgs = {
  input: Scalars['String'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPlacesSearchArgs = {
  input: Scalars['String'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type EventListResponse = {
   __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type Meta = {
   __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type Event = {
   __typename?: 'Event';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  location?: Maybe<Place>;
  keywords: Array<Keyword>;
  superEvent?: Maybe<IdObject>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  offers: Array<Offer>;
  subEvents: Array<IdObject>;
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  audience: Array<IdObject>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<ExtensionCourse>;
  name: LocalisedObject;
  localizationExtraInfo?: Maybe<LocalisedObject>;
  shortDescription?: Maybe<LocalisedObject>;
  provider?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description?: Maybe<LocalisedObject>;
};

export type Place = {
   __typename?: 'Place';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Division>>>;
  customData?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  addressRegion?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  position?: Maybe<PlacePosition>;
  name?: Maybe<LocalisedObject>;
  description?: Maybe<Scalars['String']>;
  telephone?: Maybe<LocalisedObject>;
  addressLocality?: Maybe<LocalisedObject>;
  streetAddress?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
};

export type Division = {
   __typename?: 'Division';
  type: Scalars['String'];
  /** Open Civic Data ID */
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalisedObject>;
};

export type LocalisedObject = {
   __typename?: 'LocalisedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type PlacePosition = {
   __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Keyword = {
   __typename?: 'Keyword';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  aggregate?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Int']>;
  name?: Maybe<LocalisedObject>;
};

export type IdObject = {
   __typename?: 'IdObject';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
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
  description?: Maybe<LocalisedObject>;
  price?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
};

export type Image = {
   __typename?: 'Image';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
};

export type InLanguage = {
   __typename?: 'InLanguage';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<LocalisedObject>;
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse';
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type PlaceListResponse = {
   __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type KeywordListResponse = {
   __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type EventSearchListResponse = {
   __typename?: 'EventSearchListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type PlaceSearchListResponse = {
   __typename?: 'PlaceSearchListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type Mutation = {
   __typename?: 'Mutation';
  addEventMutation?: Maybe<AddEventMutation>;
  updateEventMutation?: Maybe<UpdateEventMutation>;
  deleteEventMutation?: Maybe<DeleteEventMutation>;
};


export type MutationAddEventMutationArgs = {
  event?: Maybe<AddEventMutationInput>;
};


export type MutationUpdateEventMutationArgs = {
  event?: Maybe<UpdateEventMutationInput>;
};


export type MutationDeleteEventMutationArgs = {
  eventId?: Maybe<Scalars['String']>;
};

export type AddEventMutation = {
   __typename?: 'AddEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type EventMutationResponse = {
   __typename?: 'EventMutationResponse';
  statusCode: Scalars['Int'];
  body?: Maybe<Event>;
};

export type AddEventMutationInput = {
  location: IdObjectInput;
  keywords: Array<IdObjectInput>;
  superEvent?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks?: Maybe<Array<Scalars['String']>>;
  offers: Array<OfferInput>;
  subEvents?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<IdObjectInput>>;
  inLanguage?: Maybe<Array<IdObjectInput>>;
  audience?: Maybe<Array<IdObjectInput>>;
  datePublished?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<IdObjectInput>;
  name: LocalisedObjectInput;
  localizationExtraInfo?: Maybe<LocalisedObjectInput>;
  shortDescription: LocalisedObjectInput;
  provider?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObjectInput;
};

export type IdObjectInput = {
  internalId?: Maybe<Scalars['String']>;
};

export type OfferInput = {
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalisedObjectInput>;
  price?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
};

export type LocalisedObjectInput = {
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type UpdateEventMutation = {
   __typename?: 'UpdateEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UpdateEventMutationInput = {
  location: IdObjectInput;
  keywords: Array<IdObjectInput>;
  superEvent?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks?: Maybe<Array<Scalars['String']>>;
  offers: Array<OfferInput>;
  subEvents?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<IdObjectInput>>;
  inLanguage?: Maybe<Array<IdObjectInput>>;
  audience?: Maybe<Array<IdObjectInput>>;
  datePublished?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<IdObjectInput>;
  name: LocalisedObjectInput;
  localizationExtraInfo?: Maybe<LocalisedObjectInput>;
  shortDescription: LocalisedObjectInput;
  provider?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObjectInput;
  id: Scalars['String'];
};

export type DeleteEventMutation = {
   __typename?: 'DeleteEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type KeywordQueryVariables = {
  id: Scalars['ID'];
};


export type KeywordQuery = (
  { __typename?: 'Query' }
  & { keyword?: Maybe<(
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'id' | 'internalId'>
    & { name?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )> }
  )> }
);

export type KeywordsQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type KeywordsQuery = (
  { __typename?: 'Query' }
  & { keywords?: Maybe<(
    { __typename?: 'KeywordListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  )> }
);

export type PlaceQueryVariables = {
  id: Scalars['ID'];
};


export type PlaceQuery = (
  { __typename?: 'Query' }
  & { place?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'internalId'>
    & { name?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, streetAddress?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, addressLocality?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, telephone?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )> }
  )> }
);

export type PlacesQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type PlacesQuery = (
  { __typename?: 'Query' }
  & { places?: Maybe<(
    { __typename?: 'PlaceListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, streetAddress?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, addressLocality?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, telephone?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  )> }
);


export const KeywordDocument = gql`
    query Keyword($id: ID!) {
  keyword(id: $id) {
    id
    name {
      fi
      sv
      en
    }
    internalId
  }
}
    `;
export type KeywordProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordQuery, KeywordQueryVariables>
    } & TChildProps;
export function withKeyword<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordQuery,
  KeywordQueryVariables,
  KeywordProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordQuery, KeywordQueryVariables, KeywordProps<TChildProps, TDataName>>(KeywordDocument, {
      alias: 'keyword',
      ...operationOptions
    });
};

/**
 * __useKeywordQuery__
 *
 * To run a query within a React component, call `useKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, baseOptions);
      }
export function useKeywordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, baseOptions);
        }
export type KeywordQueryHookResult = ReturnType<typeof useKeywordQuery>;
export type KeywordLazyQueryHookResult = ReturnType<typeof useKeywordLazyQuery>;
export type KeywordQueryResult = ApolloReactCommon.QueryResult<KeywordQuery, KeywordQueryVariables>;
export const KeywordsDocument = gql`
    query Keywords($dataSource: String, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywords(dataSource: $dataSource, page: $page, pageSize: $pageSize, showAllKeywords: $showAllKeywords, sort: $sort, text: $text) {
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
      internalId
    }
  }
}
    `;
export type KeywordsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordsQuery, KeywordsQueryVariables>
    } & TChildProps;
export function withKeywords<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordsQuery,
  KeywordsQueryVariables,
  KeywordsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordsQuery, KeywordsQueryVariables, KeywordsProps<TChildProps, TDataName>>(KeywordsDocument, {
      alias: 'keywords',
      ...operationOptions
    });
};

/**
 * __useKeywordsQuery__
 *
 * To run a query within a React component, call `useKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordsQuery({
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
export function useKeywordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, baseOptions);
      }
export function useKeywordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, baseOptions);
        }
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
export type KeywordsQueryResult = ApolloReactCommon.QueryResult<KeywordsQuery, KeywordsQueryVariables>;
export const PlaceDocument = gql`
    query Place($id: ID!) {
  place(id: $id) {
    id
    internalId
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
export type PlaceProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlaceQuery, PlaceQueryVariables>
    } & TChildProps;
export function withPlace<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceQuery,
  PlaceQueryVariables,
  PlaceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceQuery, PlaceQueryVariables, PlaceProps<TChildProps, TDataName>>(PlaceDocument, {
      alias: 'place',
      ...operationOptions
    });
};

/**
 * __usePlaceQuery__
 *
 * To run a query within a React component, call `usePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
      }
export function usePlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceQueryResult = ApolloReactCommon.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const PlacesDocument = gql`
    query Places($dataSource: String, $divisions: [String], $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  places(dataSource: $dataSource, divisions: $divisions, page: $page, pageSize: $pageSize, showAllPlaces: $showAllPlaces, sort: $sort, text: $text) {
    meta {
      count
      next
      previous
    }
    data {
      id
      internalId
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
export type PlacesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlacesQuery, PlacesQueryVariables>
    } & TChildProps;
export function withPlaces<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlacesQuery,
  PlacesQueryVariables,
  PlacesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlacesQuery, PlacesQueryVariables, PlacesProps<TChildProps, TDataName>>(PlacesDocument, {
      alias: 'places',
      ...operationOptions
    });
};

/**
 * __usePlacesQuery__
 *
 * To run a query within a React component, call `usePlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlacesQuery({
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
export function usePlacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
        return ApolloReactHooks.useQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, baseOptions);
      }
export function usePlacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, baseOptions);
        }
export type PlacesQueryHookResult = ReturnType<typeof usePlacesQuery>;
export type PlacesLazyQueryHookResult = ReturnType<typeof usePlacesLazyQuery>;
export type PlacesQueryResult = ApolloReactCommon.QueryResult<PlacesQuery, PlacesQueryVariables>;