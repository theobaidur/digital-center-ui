import { commonConfig } from './_common';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ...commonConfig,
  apiRoot: 'http://127.0.0.1:8000/api/v1',
};

/**
 * EAAOB96qLmxABADsPAxSTBPBX9PKTKFj1zcnwUZCQqC5NZBF6GYeokKb70KH70FAUmq3Nf1WiXsGAipOw3q77WVTmjKzUn5HJYNxmb0GEYJBvZAxHmKRKvoEemKaAqy5rhzOoW5a1NCw2N47G3sAZAP4rdcuYkByWo4b3jpxZCsVOaWwMWaZC0X
 */

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
