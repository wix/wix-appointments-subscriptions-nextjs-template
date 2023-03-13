import { wixClient, WixClientType } from './create-client';
import { Tokens } from '@wix/api-client';

export type WixSession = {
  wixClient: WixClientType;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    wixClient,
  };
};
