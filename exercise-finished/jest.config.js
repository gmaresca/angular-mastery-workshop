module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/projects/customer-admin-app/jest-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/customer-admin-app/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['<rootDir>/node_modules/jest-preset-angular/InlineHtmlStripStylesTransformer']
    }
  },
  testPathIgnorePatterns: ['.*e2e-spec.ts$']
};
