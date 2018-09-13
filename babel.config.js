module.exports = {
  presets: [
    '@babel/env',
    // 'stage-0',
    '@babel/react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    emotion: {
      plugins: []
    },
    'styled-components': {
      plugins: [
        [ 'transform-rename-import', {
          replacements: [
            { original: 'react-emotion', replacement: 'styled-components' },
            { original: 'emotion', replacement: 'styled-components' },
            { original: 'emotion-theming', replacement: 'styled-components' },
          ]
        } ]
      ]
    }
  }
}
