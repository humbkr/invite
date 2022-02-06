import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Invite from './modules/invite/screens/Invite'
import theme from './theme'

import '@fontsource/lato'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Invite />
    </ChakraProvider>
  );
}

export default App;
