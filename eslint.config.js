import jestPlugin from '@openreachtech/eslint-rules-default-jest'

export default [
  {
    ...jestPlugin,

    rules: {
      ...jestPlugin.rules,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      
        "jest/require-hook": [
          "0",
          {
            "allowedFunctionCalls": ["enableAutoDestroy"]
          }
        ],

      'jest/consistent-test-it': [
        'error',
        {
          fn: 'test',
          withinDescribe: 'test', // 'it'
        },
      ],
      'jest/prefer-lowercase-title': [
        'error',
        {
          ignore: [],
          allowedPrefixes: [],
          ignoreTopLevelDescribe: true, // true
        },
      ],
    },
  },
]

