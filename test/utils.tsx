import { QueryClient, QueryClientProvider, QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query'
import React from 'react'
// const nock = require('nock')

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

export const testCall = (queryKey: QueryKey, delay: number = 0, throwError: boolean = false): UseQueryResult => {
  const baseUrl = 'https://jsonplaceholder.typicode.com'
  const query = '/todos/1'
  // nock(baseUrl)
  //   .get(query)
  //   .delay(delay)
  //   .reply(200, { test: true })

  // setTimeout(() => nock.cleanAll(), 1000)
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
