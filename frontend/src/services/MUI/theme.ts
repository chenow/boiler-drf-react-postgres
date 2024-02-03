import { createTheme } from '@mui/material/styles'

import PoppinsBold from '@assets/fonts/Poppins-Bold.ttf'
import PoppinsLight from '@assets/fonts/Poppins-Light.ttf'
import PoppinsMedium from '@assets/fonts/Poppins-Medium.ttf'
import PoppinsRegular from '@assets/fonts/Poppins-Regular.ttf'

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: local("Poppins"), url(${PoppinsRegular}) format('TrueType');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url(${PoppinsMedium}) format('TrueType');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url(${PoppinsLight}) format('TrueType');
        }
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(${PoppinsBold}) format('TrueType');
        }
      `,
    },
  },
})

export default theme
