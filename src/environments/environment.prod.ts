import { commonConfig } from './_common';

export const environment = {
  production: true,
  ...commonConfig,
  apiRoot: 'http://api.dev.satkaniacec.info/api/v1'
};
