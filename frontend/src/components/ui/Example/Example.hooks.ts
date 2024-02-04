import { useEffect, useState } from 'react'

interface useExampleReturn {
  example: string
}

export const useExample = (): useExampleReturn => {
  const [example, setExample] = useState('')

  useEffect(() => {
    setExample('example')
  }, [])

  return { example }
}
