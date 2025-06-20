// @ts-check
import path from 'node:path'

import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    react: 'next',
    fileCase: 'kebabCase',
  },
  {
    settings: {
      tailwindcss: {
        config: path.join(import.meta.dirname, 'src/styles/globals.css'),
      },
    },
  },
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'react-refresh/only-export-components': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/no-nested-component-definitions': 'off',
    },
  },
)
