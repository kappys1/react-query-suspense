import { cleanup, render, renderHook, screen, waitFor } from '@testing-library/react'
import React from 'react'

import 'isomorphic-fetch'
import { ReactQuerySuspense } from '../src/reactQuerySuspense'
import { QueryKey } from '@tanstack/react-query'
import { createWrapper, testCall } from './utils'

describe('ReactQuerySuspense', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render fallback meanwhile query is loading', async () => {
    const key: QueryKey = ['test']
    const WrapperProvider = createWrapper()

    const { result } = renderHook(() => testCall(key), {
      wrapper: WrapperProvider
    })

    const Component: React.FC = () => (
      <WrapperProvider>
        <ReactQuerySuspense Fallback={<>loading</>} queryKeys={[key]}>
          test
        </ReactQuerySuspense>
      </WrapperProvider>
    )

    const { rerender } = render(<Component />)

    // check is loading / fetching
    expect(screen.getByText('loading')).toBeDefined()
    expect(result.current.isLoading && result.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // rerender to reflect changes
    rerender(<Component />)

    await waitFor(() => {
      expect(screen.getByText('test')).toBeDefined()
    })
  })

  it('should wait to render the component until multiple calls are loaded', async () => {
    const key: QueryKey = ['test']
    const WrapperProvider = createWrapper()

    const { result } = renderHook(() => testCall(key), {
      wrapper: WrapperProvider
    })
    const { result: result2 } = renderHook(() => testCall(key), {
      wrapper: WrapperProvider
    })

    const Component: React.FC = () => (
      <WrapperProvider>
        <ReactQuerySuspense Fallback={<>loading</>} queryKeys={[key]}>
          test
        </ReactQuerySuspense>
      </WrapperProvider>
    )

    const { rerender } = render(<Component />)

    // check is loading / fetching
    expect(screen.getByText('loading')).toBeDefined()
    expect(result.current.isLoading && result.current.isFetching).toBeTruthy()
    expect(screen.getByText('loading')).toBeDefined()
    expect(result2.current.isLoading && result2.current.isFetching).toBeTruthy()
    // wait to be done
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    await waitFor(() => expect(result2.current.isSuccess).toBe(true))

    // rerender to reflect changes
    rerender(<Component />)

    await waitFor(() => {
      // component is loading
      expect(screen.getByText('test')).toBeDefined()
    })
  })

  it('should render fallback meanwhile query is loading multiple calls', async () => {
    const key: QueryKey = ['test']
    const key2: QueryKey = ['test2']
    const WrapperProvider = createWrapper()

    const { result } = renderHook(() => testCall(key), {
      wrapper: WrapperProvider
    })

    const { result: result2 } = renderHook(() => testCall(key2, 2000), {
      wrapper: WrapperProvider
    })

    const Component: React.FC = () => (
      <WrapperProvider>
        <ReactQuerySuspense Fallback={<>loading</>} queryKeys={[key, key2]}>
          test
        </ReactQuerySuspense>
      </WrapperProvider>
    )

    const { rerender } = render(<Component />)

    // check is loading / fetching
    expect(screen.getByText('loading')).toBeDefined()
    expect(result.current.isLoading && result.current.isFetching).toBeTruthy()
    expect(screen.getByText('loading')).toBeDefined()
    // wait to be done
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // rerender to reflect changes
    rerender(<Component />)

    await waitFor(() => {
      // second call is still loading because has a 2000s delay
      expect(result2.current.isSuccess).toBe(false)
      expect(screen.getByText('loading')).toBeDefined()
    })
  })

  it('should render fallback if the call throws an error', async () => {
    const key: QueryKey = ['test']
    const WrapperProvider = createWrapper()

    const { result } = renderHook(() => testCall(key, 0, true), {
      wrapper: WrapperProvider
    })

    const Component: React.FC = () => (
      <WrapperProvider>
        <ReactQuerySuspense Fallback={<>loading</>} queryKeys={[key]}>
          test
        </ReactQuerySuspense>
      </WrapperProvider>
    )

    const { rerender } = render(<Component />)

    // check is loading / fetching
    expect(screen.getByText('loading')).toBeInTheDocument()
    expect(result.current.isLoading && result.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(result.current.isError).toBe(true))

    // rerender to reflect changes
    rerender(<Component />)

    await waitFor(() => {
      expect(screen.getByText('loading')).toBeDefined()
    })
  })
})
