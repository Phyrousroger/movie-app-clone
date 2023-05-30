import { getApiConfiguration, getGeneres } from "@/store/reducers/homeSlice";
import { RootState, store } from "@/store/store";
import "@/styles/globals.css";
import { fetchDataFromApi } from "@/utils/api";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useCallback, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    </>
  );
}
