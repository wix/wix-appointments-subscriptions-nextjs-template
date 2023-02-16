import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from '@model/service/service.mapper';
import { WixSession } from '../auth/auth';
import { safeCall } from '@model/utils';

export const safeGetServices = ({ limit = 100 }, wixSession?: WixSession) =>
  safeCall<{ services: ServiceInfoViewModel[] }>(
    () => getServices({ limit }, wixSession),
    { services: [] },
    'Query Services'
  );

export const getServices = (
  { limit = 100 },
  wixSession?: WixSession
): Promise<{ services: ServiceInfoViewModel[] }> =>
  wixSession!
    .wixClient!.services.queryServices()
    .limit(limit)
    .find()
    .then((result) => {
      return {
        services: result.items?.map(mapServiceInfo) ?? [],
      };
    });

export const getServiceBySlug = (
  serviceSlug: string,
  wixSession?: WixSession
): Promise<ServiceInfoViewModel | null> =>
  wixSession!
    .wixClient!.services.queryServices()
    .limit(1)
    .eq('slug.name', serviceSlug)
    .find()
    .then((result) =>
      result.items?.length ? mapServiceInfo(result.items[0]) : null
    );
