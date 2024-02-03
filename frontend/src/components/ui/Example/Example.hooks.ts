interface useExampleReturn {
  example: string
}

export const useExample = (): useExampleReturn => {
  return {
    example: 'example',
  }
}
