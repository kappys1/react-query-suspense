import { QueriesObserver, useQueryClient } from '@tanstack/react-query'
import { PromisePromiseTrackerParams } from './types'

export const useReactQueryPromiseTracker = ({ queryKeys, context }: PromisePromiseTrackerParams): boolean => {
  const queryClient = context != null ? context : useQueryClient()
  const observer = new QueriesObserver(
    queryClient,
    queryKeys.map((key) => ({ queryKey: key }))
  )

  const promiseInProgress = observer
    .getCurrentResult()
    // eslint-disable-next-line no-mixed-operators
    .map((v) => (v.fetchStatus === 'fetching' && v.status === 'loading') || v.isError)
    .some((v) => v)
  return promiseInProgress
}
