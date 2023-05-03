import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from '@app/model/service/service.mapper';
import { WixSession } from '../auth/auth';
import { safeCall } from '@app/model/utils';

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
): Promise<{
  data: ServiceInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ServiceInfoViewModel | null>(
    () =>
      wixSession
        .wixClient!.services.queryServices()
        .eq('mainSlug.name', decodeURIComponent(serviceSlug))
        .find()
        .then((result) =>
          result.items?.length ? mapServiceInfo(result.items[0]) : null
        ),
    null,
    'Get Service By Slug'
  );

export const getServiceById = (
  wixSession: WixSession,
  serviceId: string
): Promise<{
  data: ServiceInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ServiceInfoViewModel | null>(
    () =>
      wixSession.wixClient!.services.getService(serviceId).then(mapServiceInfo),
    null,
    'Get Service By Id'
  );
