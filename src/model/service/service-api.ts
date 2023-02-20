import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from '@model/service/service.mapper';
import { WixSession } from '../auth/auth';
import { safeCall } from '@model/utils';

export const safeGetServices = (
  wixSession?: WixSession,
  { limit = 100, categoryId = '' } = {}
) =>
  safeCall<{ services: ServiceInfoViewModel[] }>(
    () => getServices(wixSession, { limit, categoryId }),
    { services: [] },
    'Query Services'
  );

export const getServices = (
  wixSession?: WixSession,
  { limit = 100, categoryId = '' } = {}
): Promise<{ services: ServiceInfoViewModel[] }> => {
  let queryBuilder = wixSession!
    .wixClient!.services.queryServices()
    .limit(limit);
  if (categoryId) {
    queryBuilder = queryBuilder.eq('category.id', categoryId);
  }
  return queryBuilder.find().then((result) => {
    return {
      services:
        (result.items?.map(mapServiceInfo) as ServiceInfoViewModel[]) ?? [],
    };
  });
};

export const getServiceBySlug = (
  wixSession: WixSession,
  serviceSlug: string
): Promise<ServiceInfoViewModel | null> =>
  wixSession
    .wixClient!.services.queryServices()
    .limit(1)
    // TODO: uncomment when filter in bookings sdk is fixed
    // .eq('mainSlug.name', serviceSlug)
    .find()
    .then((result) =>
      result.items?.length
        ? mapServiceInfo(
            result.items.find((item) => item.mainSlug?.name === serviceSlug)
          )
        : null
    );
