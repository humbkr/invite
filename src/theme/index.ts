import { extendTheme } from '@chakra-ui/react'
import Button from './Button'
import Tooltip from './Tooltip'

const theme = extendTheme({
  fonts: {
    heading: 'Lato',
    body: 'Lato',
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    blue: {
      100: '#DBE1E6',
      300: '#8C9DB5',
      400: '#5a739a',
      450: '#475a77',
      500: '#434765',
      600: '#383C56',
      700: '#31354b',
      800: '#272D45',
      900: '#202437',
      1000: '#1b1e2f',
    },
    lightBlue: {
      700: '#4165ec',
      800: '#2C54EA',
    },
    red: {
      200: '#EE748F',
      300: '#a45063',
    },
    gray: {
      // ...
      400: 'rgba(255, 255, 255, .7)',
      600: 'rgba(255, 255, 255, .5)',
      700: 'rgba(255, 255, 255, .3)',
    },
    // ...
  },
  components: {
    Button,
    Tooltip,
  },
})

export default theme
