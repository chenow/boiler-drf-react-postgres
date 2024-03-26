import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const LeftPlaceHolder = () => {
  return (
    <Box
      flex={6}
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 30,
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <IconButton
          sx={{
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
        />
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textDecoration: 'none',
              display: 'inline',
              ml: 2,
              color: 'secondary.main',
            }}
          >
            Qaptam
          </Typography>
        </Link>
      </Box>
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          mx: { xs: 5, md: 14 },
          my: { xs: 2, md: 0 },
          fontSize: { xs: '20px', md: '50px' },
          lineHeight: { xs: '25px', md: '60px' },
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Connectez-vous à votre espace personnel
      </Typography>
    </Box>
  )
}

export default React.memo(LeftPlaceHolder)
