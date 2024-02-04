import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'bun:test'

import { useExample } from './Example.hooks'

describe('Example.hook', () => {
  it('Should return example', () => {
    const { result } = renderHook(() => useExample())
    expect(result.current.example).toBe('example')
  })
})
