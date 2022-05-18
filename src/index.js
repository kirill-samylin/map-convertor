import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import {App} from './components/App';
import {ConvertorMapProvider} from './lib/ConvertorMapProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <ConvertorMapProvider>
      <App />
    </ConvertorMapProvider>
  </ChakraProvider>
);
