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

  it.only('should render fallback meanwhile query is loading', async () => {
    const key: QueryKey = ['test']
    const WrapperProvider = createWrapper()

    const { result } = renderHook(() => testCall(key), {
      wrapper: WrapperProvider
    })

    const Component: React.FC = () => (
      <WrapperProvider>
        <ReactQuerySuspense Fallback={<>test</>} queryKeys={[key]}>
          ttt
        </ReactQuerySuspense>
      </WrapperProvider>
    )

    const { rerender } = render(<Component />)

    // check is loading / fetching
    expect(screen.getByText('test')).toBeDefined()
    expect(result.current.isLoading && result.current.isFetching).toBeTruthy()

    // wait to be done
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // rerender to reflect changes
    rerender(<Component />)

    await waitFor(() => {
      expect(screen.getByText('ttt')).toBeDefined()
    })
  })
})
