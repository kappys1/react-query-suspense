import React from 'react'
import { ReactQuerySuspenseParams } from './types'
import { useReactSuspense } from './useReactSuspense'

export const ReactQuerySuspense: React.FC<ReactQuerySuspenseParams> = ({
  queryKeys,
  Fallback,
  deferredFetch,
  children,
  context
}) => {
  const suspense = useReactSuspense({ queryKeys, context, deferredFetch })
  return <>{suspense ? Fallback : children}</>
}
