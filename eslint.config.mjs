// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    react: 'next',
    fileCase: 'kebabCase',
    tailwindCSS: false,
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
