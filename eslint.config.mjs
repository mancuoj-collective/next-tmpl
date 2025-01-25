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
      'unused-imports/no-unused-vars': 'off',
      'unicorn/no-useless-undefined': 'off',
      '@eslint-react/no-forward-ref': 'off',
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
    },
  },
  {
    files: ['package.json'],
    rules: {
      'package-json/valid-package-definition': 'off',
    },
  },
)
