import { createWixVisitorSession, WixSession } from '@model/auth/auth';

export const useServerAuthSession = (): WixSession => {
  return createWixVisitorSession();
};
