import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const useViewport = () => {
  const deviceType = userAgent({ headers: headers() }).device.type;

  return {
    isMobile: deviceType === 'mobile',
  };
};
