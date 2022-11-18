import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  }
})
export const ReactQueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient} >{children}</QueryClientProvider>
}
