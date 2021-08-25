/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_CMS_URI,
  cache: new InMemoryCache(),
  headers: {    
    authorization: "",
  }
});
export default apolloClient;
