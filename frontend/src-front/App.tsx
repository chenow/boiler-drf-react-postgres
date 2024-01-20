import { ThemeProvider } from '@mui/material/styles'

import HomePage from '@pages/HomePage'
import theme from '@services/MUI'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  )
}

export default App
