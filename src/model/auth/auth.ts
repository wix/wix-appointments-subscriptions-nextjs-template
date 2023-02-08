import { wixClient, WixClientType } from './create-client';
import { Tokens } from '@wix/api-client';

export type WixSession = {
  wixClient: WixClientType;
  tokensPromise?: Promise<Tokens>;
};

export const createWixVisitorSession = (): WixSession => {
  return {
    wixClient,
    tokensPromise: wixClient?.auth.generateVisitorTokens(),
  };
};
