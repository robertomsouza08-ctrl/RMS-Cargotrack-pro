
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  styles: { global: { body: { bg: '#0B1B3B', color: 'white' } } },
  colors: { brand: { navy: '#0B1B3B', teal: '#0FA3B1', amber: '#FFC857' } }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>;
}
