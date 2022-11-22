import React from 'react'
import { ReactQuerySuspenseParams } from './types'
import { useReactQuerySuspense } from './useReactQuerySuspense'

export const ReactQuerySuspense: React.FC<ReactQuerySuspenseParams> = ({
  queryKeys,
  Fallback,
  deferredFetch,
  children,
  context
}) => {
  const suspense = useReactQuerySuspense({ queryKeys, context, deferredFetch })
  return <>{suspense ? Fallback : children}</>
}
