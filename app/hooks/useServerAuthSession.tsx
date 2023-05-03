import { WixSession } from '@app/model/auth/auth';
import { getServerWixClient } from '@app/model/auth/wix-client.server';
import { cookies as nextCookies } from 'next/headers';
export const useServerAuthSession = (): WixSession => {
  return {
    wixClient: getServerWixClient({ cookieStore: nextCookies() }),
  };
};
