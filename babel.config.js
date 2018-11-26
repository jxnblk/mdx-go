module.exports = {
  presets: [
    [ '@babel/env', { modules: false } ],
    '@babel/react'
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/syntax-dynamic-import',
  ]
}
