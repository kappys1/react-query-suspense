import { QueryClient } from '@tanstack/react-query'

export interface PromisePromiseTrackerParams {
  queryKeys: string[][]
  context?: QueryClient
}

export interface ReactQuerySuspenseParams {
  queryKeys?: string[][]
  context?: QueryClient
  Fallback: React.ReactNode
  children: React.ReactNode
}
