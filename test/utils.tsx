import { QueryClient, QueryClientProvider, QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query'
import React from 'react'

export const getQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console for tests
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
  })
}

export const createWrapper = (): React.FC<React.PropsWithChildren> => {
  // ✅ creates a new QueryClient for each test
  const queryClient = getQueryClient()
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const testCall = (queryKey: QueryKey, delay: number = 0, throwError: boolean = false): UseQueryResult => {
  const baseUrl = 'https://jsonplaceholder.typicode.com'
  const query = '/todos/1'
  return useQuery(
    queryKey,
    async () => await fetch(`${baseUrl}${query}`).then(async (res) => await res.json())
      .then((res) => {
        if ((delay ?? 0) !== 0) { return new Promise((resolve) => setTimeout(() => resolve(res), delay)) }
        if (throwError) { throw new Error('test error') }
        return res
      })
  )
}
