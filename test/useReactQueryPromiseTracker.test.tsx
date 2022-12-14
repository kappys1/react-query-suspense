import { QueryKey } from '@tanstack/react-query'
import { waitFor, renderHook, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useReactQueryPromiseTracker } from '../src'
import 'isomorphic-fetch'
import { createWrapper, getQueryClient, testCall } from './utils'

describe('useReactQueryPromiseTracker', () => {
  afterEach(() => {
    cleanup()
  })

  it('should return true if query are loading passing query key', async () => {
    const queryKey: QueryKey = ['test']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })
    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey] }), {
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

    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey, queryKey2] }), {
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

  it('should return false if query are not loading passing query key', async () => {
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(['call']), {
      wrapper
    })

    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [['test']] }), {
      wrapper
    })

    // check is loading / fetching and return false because is not listening this query
    expect(result.current).toBe(false)
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

  it('should return false if multiple queries are not loading', async () => {
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(['call']), {
      wrapper
    })

    const { result } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [['test'], ['test2']] }), {
      wrapper
    })

    // check is loading / fetching and return false because is not listening this query
    expect(result.current).toBe(false)
    expect(resultCall.current.isLoading && resultCall.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(resultCall.current.isSuccess).toBe(true))
    expect(resultCall.current.data).toBeDefined()

    // check if its not loading and return false.
    await waitFor(() => {
      expect(resultCall.current.isLoading).toBeFalsy()
      expect(result.current).toBe(false)
    })
  })

  it('should return false if are listening same query but different context', async () => {
    const queryKey: QueryKey = ['test']
    const wrapper = createWrapper()

    const { result: resultCall } = renderHook(() => testCall(queryKey), {
      wrapper
    })
    const { result, rerender } = renderHook(() => useReactQueryPromiseTracker({ queryKeys: [queryKey], context: getQueryClient() }), {
      wrapper
    })

    // check is loading / fetching
    expect(result.current).toBe(false)
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
})
