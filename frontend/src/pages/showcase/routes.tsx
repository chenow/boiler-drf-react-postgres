import type { RouteObject } from 'react-router-dom'

import HomePage from './HomePage'
import LoginPage from './LoginPage'

const showcaseRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  { path: '/login', element: <LoginPage /> },
]

export default showcaseRoutes
