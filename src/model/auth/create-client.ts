import { createClient, OAuthStrategy } from '@wix/api-client';
import { availabilityCalendar, services } from '@wix/bookings';
import { plans } from '@wix/pricing-plans';
import { redirects } from '@wix/redirects-api';

export const wixClient = process.env.NEXT_PUBLIC_WIX_CLIENT_ID
  ? createClient({
      modules: { availabilityCalendar, redirects, services, plans },
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
    })
  : null;

export type WixClientType = typeof wixClient;
