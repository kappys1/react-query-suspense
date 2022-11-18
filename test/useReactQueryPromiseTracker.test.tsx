import { QueryKey, useQuery } from '@tanstack/react-query'
import { render, waitFor, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { useReactQueryPromiseTracker } from '../src'
import { ReactQueryProvider } from './utils'

describe('useReactQueryPromiseTracker', () => {
  const textLoaded = 'loaded'
  const textLoading = 'loading'

  const TestComponent: React.FC<React.PropsWithChildren<{ queryKey: QueryKey }>> = ({ children, queryKey }) => {
    const { isLoading } = useQuery(
      queryKey,
      async () => await Promise.resolve('test')
    )

    return <>{isLoading ? <div>{textLoading}</div> : <div>{children}</div>}</>
  }

  it('should return true if query are loading passing query key', async () => {
    const queryKey: QueryKey = ['test']

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <ReactQueryProvider><div>{children}</div></ReactQueryProvider>
    )

    const { getAllByText } = render(
      <ReactQueryProvider>
        <TestComponent queryKey={queryKey} >{textLoaded}</TestComponent>
      </ReactQueryProvider>
    )
    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey] }), {
      wrapper
    })

    expect(result.current).toBe(true)
    expect(getAllByText(textLoading)).toBeTruthy()

    await waitFor(() => {
      rerender()
      expect(getAllByText(textLoaded)).toBeTruthy()
      expect(result.current).toBe(false)
    })
  })

  it('should return true if multiple queries are loading', async () => {
    const queryKey: QueryKey = ['test']
    const queryKey2: QueryKey = ['test2']
    const textLoaded = 'loaded'

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <ReactQueryProvider >{children}</ReactQueryProvider>
    )

    const { getAllByText } = render(
      <ReactQueryProvider>
        <TestComponent queryKey={queryKey} >{textLoaded}</TestComponent>
        <TestComponent queryKey={queryKey2} >{textLoaded}</TestComponent>
      </ReactQueryProvider>
    )
    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey, queryKey2] }), {
      wrapper
    })

    expect(result.current).toBe(true)
    expect(getAllByText(textLoading)).toBeTruthy()

    await waitFor(() => {
      rerender()
      expect(getAllByText(textLoaded)).toBeTruthy()
      expect(result.current).toBe(false)
    })
  })

  it('should return false if query are not loading passing query key', async () => {
    const queryKey: QueryKey = ['test']

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <ReactQueryProvider >{children}</ReactQueryProvider>
    )

    const { result } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey] }), {
      wrapper
    })

    expect(result.current).toBe(false)
  })

  it('should return false if multiple queries are not loading', async () => {
    const queryKey: QueryKey = ['test']
    const queryKey2: QueryKey = ['test2']

    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <ReactQueryProvider >{children}</ReactQueryProvider>
    )

    const { result } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey, queryKey2] }), {
      wrapper
    })

    expect(result.current).toBe(false)
  })
})
