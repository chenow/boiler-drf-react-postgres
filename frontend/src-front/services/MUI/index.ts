import PoppinsBold from '@assets/fonts/Poppins-Bold.ttf'
import PoppinsLight from '@assets/fonts/Poppins-Light.ttf'
import PoppinsMedium from '@assets/fonts/Poppins-Medium.ttf'
import PoppinsRegular from '@assets/fonts/Poppins-Regular.ttf'
import { createTheme } from '@mui/material/styles'

const dark_main = '#1B1B1B'
const dark_light = '#1B1B1B88'

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: 64,
      lineHeight: '96px',
    },
    h2: {
      fontWeight: 700,
      fontSize: 35,
      lineHeight: '130%',
      letterSpacing: ' -0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: 30,
      lineHeight: '35px',
    },

    h6: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '20px',
    },
    body1: {
      fontWeight: 500,
      fontSize: 15,
      lineHeight: '24px',
    },
  },
  palette: {
    background: {
      default: '#FBFBFB',
    },
    primary: {
      main: '#068FFF', // MARRON CI
      light: '#A36D6D33', // MARRON CI 20 (20% opacity)
    },
    secondary: {
      main: '#FBFBFB', // GRIS CI
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          src: local("Poppins"), url(${PoppinsRegular}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          src: url(${PoppinsMedium}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 300;
          src: url(${PoppinsLight}) format('truetype');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 700;
          src: url(${PoppinsBold}) format('truetype');
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '5px 35px 5px 35px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          fontWeight: 700,
          textTransform: 'none',
        },
        contained: {
          '&:hover': {
            backgroundColor: '#1B1B1B88',
            color: '#FBFBFB',
          },
        },
        outlined: {
          border: '2px solid #1B1B1B',
          '&:hover': {
            border: '2px solid #1B1B1B88',
            color: '#1B1B1B88',
            backgroundColor: '#FBFBFB',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px',
              transition: 'all 0.2s ease-in-out',
              borderColor: dark_main, // Customize the default border color
            },
            '&.Mui-focused fieldset': {
              borderColor: dark_light, // Customize the border color when focused
            },
          },
        },
      },
    },
  },
})

export default theme
