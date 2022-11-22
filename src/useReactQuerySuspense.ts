import React from 'react'
import { UseReactQueryParams } from './types'
import { useReactQueryPromiseTracker } from './useReactQueryPromiseTracker'

export const useReactQuerySuspense = ({ context, queryKeys, deferredFetch = false }: UseReactQueryParams): boolean => {
  const promiseInProgress = useReactQueryPromiseTracker({ queryKeys, context })
  const refAnyPromiseStarted = React.useRef<boolean>(promiseInProgress)

  if (promiseInProgress) refAnyPromiseStarted.current = true

  if (deferredFetch) {
    return !(!promiseInProgress && refAnyPromiseStarted.current)
  }

  return promiseInProgress
}
