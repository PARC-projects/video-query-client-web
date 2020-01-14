// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

enum AuthenticationTypeEnum {
  SingleHeaderToken
}

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  confirmQueryChart: 1,
  mailToAddress: 'test@test.com',
  fileStoreRoot: 'assets/videos/',
  externalSource: {
    root: 'https://elasticbeanstalk-us-west-1-326964612130.s3-us-west-1.amazonaws.com/',
    authentication: {
      type: AuthenticationTypeEnum.SingleHeaderToken,
      uiMessage: 'This video comes from the Acme System and requires a token to access. Please provide the token assigned to you below.',
      header: {
        name: 'Video-Query'
      },
      authEndpoint: 'https://stac.vtti.vt.edu/api/collections',
      developmentToken: null
    }
  }
};
