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

---

<p align="center">
  <strong>another way to suspense the <a href="https://tanstack.com/query" target="\_parent">@tanstack/query</a> calls by queryKeys with multiples possibilities.
  <br/>
  Suspense your component wherever you want just passing a query key call.</strong>
</p>


---

## 📦 Install
React Query Suspense is available as a package on NPM, install with your favorite package manager:

```dircolors
npm install @kappys/react-query-suspense
```

## ⚡ Quick start

start wrapping the content that you want suspense until the call is ready to render.


#### Simple way wrapping a component with `ReactQuerySuspense` waiting the example query key call.

Is not necessary pass isLoading or isSuccess, just pass the queryKey and forget all things.

```ts
import React from "react";
import { ReactQuerySuspense, QueryKey } from '@kappys/react-query-suspense'

export const SampleComponent: React.FC<React.PropsWithChildren<{
  keys: QueryKey[];
}>> = ({ children, keys }) => {

  const key: QueryKey = ["example"];

  return (
    <ReactQuerySuspense Fallback={<>loading</>} queryKeys={keys}>
      <div>{children}</div>
    </ReactQuerySuspense>
  );
};
```

#### Example with `ReactQuerySuspense` in real world waiting multiples calls


[![Edit react-query-suspense](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-query-suspense-qrjvtm?fontsize=14&hidenavigation=1&theme=dark&view=editor)


## 📝 Features

`Important: On Error fetch, this library will keep loading, in a future we will implement FallbackError`

#### Suspense

```ts
<ReactQuerySuspense Fallback={<>loading</>} queryKeys={['query', 'key']}>
  <div>Test</div>
</ReactQuerySuspense>
```

#### Suspense with deferred fetch option
- it will force to put the loading in the first rendering.
```ts
<ReactQuerySuspense Fallback={<>loading</>} queryKeys={['query', 'key']} deferredFetch>
  <div>Test</div>
</ReactQuerySuspense>
```

#### Suspense waiting multiples calls
```ts
const keys1 = ['query', 'key1'];
const keys2 = ['query', 'key2'];

<ReactQuerySuspense Fallback={<>loading</>} queryKeys={[[keys1], [keys2]]}>
  <div>Test</div>
</ReactQuerySuspense>
```


#### Hook to know if the call is fetching or not.

```ts

const suspense: boolean = useReactQuerySuspense({ queryKeys })
```


## 📘 API Reference

#### ReactQuerySuspense

Attributes

- `Fallback: React.ReactNode`
  - Required
- `queryKeys: QueryKey[]`
  - Required
  - QueryKey that you are using to identify your calls in `useQuery` and `useMutation`
- `context?: QueryClient`
  - Optional
  - Possibility to pass another context to listen, the context is provided when you call `new QueryClient`
- `deferredFetch?: boolean`
  - Optional
  - it provides you the possibility to render the Fallback first.

#### useReactQuerySuspense

Options

- `queryKeys: QueryKey[]`
  - Required
  - QueryKey that you are using to identify your calls in `useQuery` and `useMutation`
- `context?: QueryClient`
  - Optional
  - Possibility to pass another context to listen, the context is provided when you call `new QueryClient`
- `deferredFetch?: boolean`
  - Optional
  - It provides you the possibility to render the Fallback first.

Return

- `suspense: boolean`
  - Return a boolean with the status of suspense.


## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## LICENSE

MIT


