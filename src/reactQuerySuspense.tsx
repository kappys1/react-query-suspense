import React from 'react'
import { ReactQuerySuspenseParams } from './types'
import { useReactQueryPromiseTracker } from './useReactQueryPromiseTracker'

export const ReactQuerySuspense: React.FC<ReactQuerySuspenseParams> = ({
  queryKeys = [[]],
  Fallback,
  deferredStart = false,
  children,
  context
}) => {
  const promiseInProgress = useReactQueryPromiseTracker({ queryKeys, context })
  const refAnyPromiseStarted = React.useRef<boolean>(promiseInProgress)
  if (promiseInProgress) refAnyPromiseStarted.current = true

  if (deferredStart) {
    return <>{!promiseInProgress && refAnyPromiseStarted.current ? children : Fallback}</>
  }

  return <>{promiseInProgress ? Fallback : children}</>
}
