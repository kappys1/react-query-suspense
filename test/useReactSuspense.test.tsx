import { QueryKey } from '@tanstack/react-query'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useReactSuspense } from '../src/useReactSuspense'
import { createWrapper, testCall } from './utils'
import 'isomorphic-fetch'

describe('useReactSuspense', () => {
  afterEach(() => {
    cleanup()
  })

  it('should return true if query are loading passing query key', async () => {
    const queryKey: QueryKey = ['test', 'new']

    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })

    const { result, rerender } = renderHook(() => useReactSuspense({ queryKeys: [queryKey] }), {
      wrapper
    })

    // check is loading / fetching
    expect(result.current).toBe(true)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))
    expect(resultCall.current.data).toBeDefined()

    // check if its not loading and return false.
    await waitFor(() => {
      rerender()
      expect(resultCall.current.isLoading).toBeFalsy()
      expect(result.current).toBe(false)
    })
  })

  it('should return true if multiple queries are loading', async () => {
    const queryKey: QueryKey = ['test']
    const queryKey2: QueryKey = ['test2']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })
    const { result: resultCall2 } = renderHook(() => testCall(queryKey2, 1000), {
      wrapper
    })
    const { result, rerender } = renderHook(() => useReactSuspense({ queryKeys: [queryKey, queryKey2] }), {
      wrapper
    })

    // check is loading / fetching
    expect(result.current).toBe(true)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()
    expect(resultCall2.current.isLoading && resultCall2.current.isFetching).toBeTruthy()

    // wait the first will be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))
    expect(resultCall.current.data).toBeDefined()

    // check is is still loading because the second is not done yet
    await waitFor(() => {
      rerender()
      expect(resultCall2.current.isLoading && resultCall2.current.isFetching).toBeTruthy()
      expect(resultCall.current.isLoading).toBeFalsy()
      expect(result.current).toBe(true)
    })
  })

  it('should return true if query are loading passing query key and deferred true', async () => {
    const queryKey: QueryKey = ['test']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })

    const { result, rerender } = renderHook(() => useReactSuspense({ queryKeys: [queryKey], deferredFetch: true }), {
      wrapper
    })

    // check is loading / fetching
    expect(result.current).toBe(true)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))
    expect(resultCall.current.data).toBeDefined()

    // check if its not loading and return false.
    await waitFor(() => {
      rerender()
      expect(resultCall.current.isLoading).toBeFalsy()
      expect(result.current).toBe(false)
    })
  })

  it('should return false if query are not loading passing query key', async () => {
    const queryKey: QueryKey = ['test']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })

    const { result } = renderHook(() => useReactSuspense({ queryKeys: [['diferentKey']] }), {
      wrapper
    })

    // check is loading / fetching
    expect(result.current).toBe(false)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()

    // wait the call to be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))
    // check it's loading yet
    expect(result.current).toBe(false)
  })

  it('should return true if query are not loading passing query key and deferred true because deferred put true as default', async () => {
    const queryKey: QueryKey = ['test']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })

    const { result } = renderHook(() => useReactSuspense({ queryKeys: [['diferentKey']], deferredFetch: true }), {
      wrapper: createWrapper()
    })

    // check is loading / fetching but it's deferred so it's loading = return true
    expect(result.current).toBe(true)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()

    // wait the call to be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))

    // check it's loading yet
    expect(result.current).toBe(true)
  })
})
