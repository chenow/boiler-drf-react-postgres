import { Stack } from '@mui/material'

import LoginFormContainer from '#libs/auth/components/login/LoginForm.container'
import PlaceHolder from '#libs/auth/components/login/PlaceHolder'

const LoginPage = () => {
  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ height: { xs: 'auto', md: '100vh' } }}>
        <PlaceHolder />
        <LoginFormContainer />
      </Stack>
    </>
  )
}

export default LoginPage
