import React from 'react';
import Cookies from 'js-cookie';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import './styles/bootstrap.css'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css';
import { ENUM } from './services/enum';
import { ToastContainer } from 'react-toastify';

const httpLink = new HttpLink({
  uri: ENUM.GRAPH_URL,
});

const logoutLink = onError(({ networkError }: any) => {
  if (networkError.statusCode === 401) {
    Cookies.remove(ENUM.ACCESS_TOKEN);
    window.location.href = '/login';
  }
})

const addAuthorization = setContext((_, { headers }) => {
  const token = Cookies.get(ENUM.ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const saveAuthorization = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const access_token = context.response.headers.get(ENUM.ACCESS_TOKEN);
    const refresh_token = context.response.headers.get(ENUM.REFRESH_TOKEN);
    if (access_token) {
      Cookies.set(ENUM.ACCESS_TOKEN, access_token, { expires: 1 / 96 });
    }
    if (refresh_token) {
      Cookies.set(ENUM.REFRESH_TOKEN, refresh_token, { expires: 15 });
    }
    return response;
  });
});

export const client = new ApolloClient({
  link: logoutLink.concat(addAuthorization).concat(saveAuthorization).concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer closeOnClick />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);