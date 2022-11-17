/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import { initializeUserInfos, setupStore } from '../redux';
import GlobalStyle from '../styles/GlobalStyle';

import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

setupMSW();

const queryClient = new QueryClient();
export const store = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '""');
    if (!currentUser) return;

    const { ID, NAME } = currentUser;

    store.dispatch(
      initializeUserInfos({
        ID,
        NAME,
        accessToken: '',
      })
    );
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GlobalStyle />
          <Background />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Provider>
        <ToastContainer
          position='top-right'
          autoClose={2500}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
