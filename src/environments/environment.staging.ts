import { commonConfig } from './_common';

export const environment = {
  production: true,
  ...commonConfig,
  apiRoot: 'https://api.staging.satkaniacec.info/api/v1'
};
