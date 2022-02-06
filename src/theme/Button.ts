const Button = {
  baseStyle: {
    fontWeight: 700,
    borderRadius: '10px',
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'lightBlue.800',
      color: 'lightBlue.800',
      fontSize: '13px',
      height: '36px',
      padding: '10px 22px',
    },
    solid: {
      bg: 'lightBlue.800',
      color: 'white',
      fontSize: '13px',
      padding: '10px 22px',
      h: '36px',
      _hover: {
        bg: 'lightBlue.700',
        _disabled: {
          bg: 'lightBlue.800',
        },
      },
    },
    transparent: {
      border: 0,
      borderRadius: 0,
      padding: 0,
      margin: 0,
      height: 'auto',
      minHeight: 'auto',
      textAlign: 'left',
      fontWeight: 'normal',
      bg: 'transparent',
      _hover: {
        bg: 'transparent',
        _disabled: {
          bg: 'transparent',
        },
      },
    },
  },
}

export default Button
