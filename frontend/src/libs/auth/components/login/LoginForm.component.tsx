import { zodResolver } from '@hookform/resolvers/zod'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { useLogin } from '#libs/auth/api'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Adresse mail non valide' }),
  password: z.string().min(1, { message: 'Champ obligatoire' }),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  const loginMutation = useLogin()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data)
  }
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
      <Stack direction="column">
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword)
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault()
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained">
          Sign In
        </Button>
        {loginMutation.isError && (
          <Typography color="error" fontWeight="bold">
            Échec de la connexion. Veuillez vérifier vos identifiants.
          </Typography>
        )}
        <Typography sx={{ mt: 1, mb: 4 }}>
          <Link to="/resetpassword/ask">Mot de passe oublié ?</Link>
        </Typography>
        <Button type="submit" variant="contained">
          Se connecter
        </Button>
        <Typography
          sx={{
            mt: 5,
            fontSize: '15px',
            textAlign: 'center',
          }}
        >
          Vous n&apos;êtes pas encore inscrit ? <Link to="/register">Créer un compte</Link>
        </Typography>
      </Stack>
    </Box>
  )
}

export default React.memo(LoginForm)
