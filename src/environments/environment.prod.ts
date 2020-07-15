import { commonConfig } from './_common';

export const environment = {
  production: true,
  ...commonConfig,
  apiRoot: 'https://itgaragebd.weartisansbd.com/api/v1'
};
