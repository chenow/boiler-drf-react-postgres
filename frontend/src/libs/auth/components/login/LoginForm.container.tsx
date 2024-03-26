import { Box, Container, Typography } from '@mui/material'
import React from 'react'

import LoginForm from './LoginForm.component'

const LoginFormContainer = () => {
  return (
    <Box
      flex={7}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          fontSize: { xs: '18px', md: '30px' },
          mt: { xs: 4, md: 2 },
          mb: { xs: 2, md: 15 },
        }}
      >
        Rentrez vos identifiants
      </Typography>
      <Container
        sx={{
          width: { xs: '80%', md: '60%' },
          mt: { xs: 2, md: 0 },
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  )
}

export default React.memo(LoginFormContainer)
