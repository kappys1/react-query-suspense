<p align="center">
  <a href="https://github.com/kappys1/react-query-suspense" target="\_parent"><img src="https://i.imgur.com/ms2ObQV.png" alt="Factory emoji" height="130"></a>
</p>

<h1 align="center">React Query Suspense</h1>

<p align="center">
  <a href="https://github.com/kappys1/react-query-suspense/actions/workflows/test.yml" target="\_parent"><img src="https://github.com/kappys1/react-query-suspense/actions/workflows/test.yml/badge.svg?branch=main" alt="Latest build"></a>
  <a href="https://www.npmjs.com/package/@kappys/react-query-suspense" target="\_parent"><img src="https://badgen.net/npm/v/@kappys/react-query-suspense" alt="Latest published version"></a>
  <a href="https://bundlephobia.com/package/@kappys/react-query-suspense@latest" target="\_parent"><img src="https://badgen.net/bundlephobia/minzip/@kappys/react-query-suspense" alt="Bundlephobia"></a>
  <a href="https://bundlephobia.com/package/@kappys/react-query-suspense@latest" target="\_parent"><img src="https://badgen.net/bundlephobia/tree-shaking/@kappys/react-query-suspense" alt="Tree shaking available"></a>
  <a href="https://github.com/kappys1/react-query-suspense" target="\_parent"><img src="https://badgen.net/npm/types/@kappys/react-query-suspense" alt="Types included"></a>
  <a href="https://www.npmjs.com/package/@kappys/react-query-suspense" target="\_parent"><img src="https://badgen.net/npm/license/@kappys/react-query-suspense" alt="License"></a>
  <a href="https://www.npmjs.com/package/@kappys/react-query-suspense" target="\_parent"><img src="https://badgen.net/npm/dt/@kappys/react-query-suspense" alt="Number of downloads"></a>
  <a href="https://github.com/kappys1/react-query-suspense" target="\_parent"><img src="https://img.shields.io/github/stars/kappys1/react-query-suspense.svg?style=social&amp;label=Star" alt="GitHub Stars"></a>
</p>

<p align="center">
  <strong>another way to suspense the <a href="https://tanstack.com/query" target="\_parent">@tanstack/query</a> calls by queryKeys with multiples possibilities</strong>
</p>

<p align="center">
  we bring you the possibility to use a hook's or Component<br/> to suspense your components by <strong>QueryKeys</strong>
</p>


## 📦 Install
React Query Suspense is available as a package on NPM, install with your favorite package manager:

```dircolors
npm install @kappys/react-query-suspense
```

## ⚡ Quick start

```ts
import { QueryKey, useQuery } from '@tanstack/react-query'
import React from 'react'
import { ReactQuerySuspense } from '@kappys/react-query-suspense'

const key: QueryKey = ['test']
const key2: QueryKey = ['test2']

export const TestComponent: React.FC<React.PropsWithChildren<{ keys: QueryKey[] }>> = ({ children, keys }) => {
  return (
    <ReactQuerySuspense Fallback={<>loading</>} queryKeys={keys}>
      {children}
    </ReactQuerySuspense>
  )
}

export const useCall = (): { data: any, data2: any } => {
  const baseUrl = 'https://jsonplaceholder.typicode.com'
  const query = '/todos/1'
  const query2 = '/todos/2'
  const { data } = useQuery(key, async () => await fetch(`${baseUrl}${query}`).then(async (res) => await res.json()))
  const { data: data2 } = useQuery(
    key2,
    async () => await fetch(`${baseUrl}${query2}`).then(async (res) => await res.json())
  )

  return { data, data2 }
}

export const Container: React.FC = () => {
  const { data, data2 } = useCall()
  return (
    <>
      <TestComponent keys={[key]}> {JSON.stringify(data)} </TestComponent>
      <TestComponent keys={[key2]}> {JSON.stringify(data2)} </TestComponent>
      <TestComponent keys={[key, key2]}>
        {JSON.stringify(data)}
        <br />
        {JSON.stringify(data2)}
      </TestComponent>
    </>
  )
}



```
