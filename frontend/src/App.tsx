import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import HomePage from '@pages/showcase/HomePage'
import theme from '@services/MUI'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  )
}

export default App
