import { QueryClient, QueryKey } from '@tanstack/react-query'
import React from 'react'

export interface PromisePromiseTrackerParams {
  queryKeys: string[][] | QueryKey[]
  context?: QueryClient
}

export interface UseReactQueryParams extends PromisePromiseTrackerParams {
  deferredFetch?: boolean
}
export interface ReactQuerySuspenseParams extends UseReactQueryParams {
  Fallback: React.ReactNode
  children: React.ReactNode
}
