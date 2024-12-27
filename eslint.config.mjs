// @ts-check
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig(
  {
    fileCase: 'kebabCase',
    formatting: {
      braceStyle: '1tbs',
    },
  },
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
)
