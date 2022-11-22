import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'react query suspense',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  clean: true,
  dts: true,
  splitting: false,
  treeshake: true,
  sourcemap: true,
  external: [
    'react',
    '@tanstack/react-query'
  ]
})
