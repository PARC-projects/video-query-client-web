// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://104.42.172.217:8000',
  confirmQueryChart: 1,
  mailToAddress: 'video_query2_admin@parc.com',
  fileStoreRoot: 'assets/videos/'
};
