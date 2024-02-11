import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'

import appRouter from '@pages/router'
import theme from '@services/MUI'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  )
}

export default App
