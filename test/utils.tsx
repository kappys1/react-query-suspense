import { QueryClient, QueryClientProvider, QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query'
import React from 'react'

export const getQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
}

export const createWrapper = (): React.FC<React.PropsWithChildren> => {
  // ✅ creates a new QueryClient for each test
  const queryClient = getQueryClient()
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export const testCall = (queryKey: QueryKey, delay?: number): UseQueryResult => {
  return useQuery(
    queryKey,
    async () => await fetch('https://jsonplaceholder.typicode.com/todos/1').then(async (res) => await res.json()).then((res) => {
      if ((delay ?? 0) !== 0) { return new Promise((resolve) => setTimeout(() => resolve(res), delay)) }
      return res
    })
  )
}
