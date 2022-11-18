import { QueryClient, QueryKey } from '@tanstack/react-query'

export interface PromisePromiseTrackerParams {
  queryKeys: string[][] | QueryKey[]
  context?: QueryClient
}

export interface ReactQuerySuspenseParams {
  queryKeys: string[][] | QueryKey[]
  Fallback: React.ReactNode
  children: React.ReactNode
  context?: QueryClient
  deferredStart?: boolean
}
