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
  },
})

export default theme
