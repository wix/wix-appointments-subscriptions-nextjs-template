import { formatDuration, intervalToDuration } from 'date-fns';
import { services } from '@wix/bookings';
import { mapServiceOfferedAsDto } from '@app/model/service/service-offered-as.mapper';
import { mapServicePaymentDto } from '@app/model/service/service-payment.mapper';

export type ServiceInfoViewModel = NonNullable<
  ReturnType<typeof mapServiceInfo>
>;

export type ServiceImage = services.MediaItem;

export function mapServiceInfo(service?: services.Service) {
  if (!service) {
    return null;
  }
  let mainMedia = service?.media?.mainMedia ?? service?.media?.items?.[0];
  let coverMedia = service?.media?.coverMedia ?? service?.media?.items?.[0];
  let otherMediaItems = service?.media?.items?.filter((item) => !!item) as
    | ServiceImage[]
    | undefined;
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
    type: service!.type!,
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
