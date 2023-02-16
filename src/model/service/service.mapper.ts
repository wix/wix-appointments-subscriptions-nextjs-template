import { ServiceType } from '@model/service/service-types.internal';
import { formatDuration, intervalToDuration } from 'date-fns';
import { services } from '@wix/bookings';
import { mapServiceOfferedAsDto } from '@model/service/service-offered-as.mapper';
import { mapServicePaymentDto } from '@model/service/service-payment.mapper';

export function mapServiceType(service: services.Service): ServiceType {
  return service.type === services.ServiceType.APPOINTMENT
    ? ServiceType.INDIVIDUAL
    : service.type === services.ServiceType.CLASS
    ? ServiceType.GROUP
    : service.type === services.ServiceType.COURSE
    ? ServiceType.COURSE
    : ServiceType.INDIVIDUAL;
}

export type ServiceInfoViewModel = ReturnType<typeof mapServiceInfo>;

export type ServiceImage = services.MediaItem;

export function mapServiceInfo(service: services.Service) {
  let mainMedia = service?.media?.mainMedia ?? service?.media?.items?.[0];
  let coverMedia = service?.media?.coverMedia ?? service?.media?.items?.[0];
  let otherMediaItems = service?.media?.items
    ?.filter((item) => !!item)
    .map(({ image }) => image) as ServiceImage[] | undefined;
  const { name, description, tagLine, _id: id } = service;
  const serviceDuration = getDuration(service);

  return {
    id,
    scheduleId: service?.schedule?._id,
    info: {
      name,
      description,
      tagLine,
      media: {
        mainMedia,
        otherMediaItems,
        coverMedia,
      },
      formattedDuration: serviceDuration ? formatDuration(serviceDuration) : '',
    },
    slug: service!.mainSlug!.name,
    type: mapServiceType(service!),
    categoryId: service!.category!._id!,
    categoryName: service!.category!.name!,
    payment: mapServicePayment(service),
  };
}

export function mapServicePayment(service: services.Service) {
  return {
    offeredAs: mapServiceOfferedAsDto(service),
    paymentDetails: mapServicePaymentDto(service),
  };
}
function getDuration(service?: services.Service) {
  return service?.schedule?.availabilityConstraints?.sessionDurations?.length
    ? intervalToDuration({
        start: 0,
        end:
          service.schedule.availabilityConstraints.sessionDurations[0] *
          60 *
          1000,
      })
    : undefined;
}
