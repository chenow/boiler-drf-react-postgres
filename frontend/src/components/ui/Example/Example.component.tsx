import { Typography } from '@mui/material'

import { useExample } from './Example.hooks'

function Example() {
  const { example } = useExample()

  return <Typography>Example.component {example}</Typography>
}

export default Example
