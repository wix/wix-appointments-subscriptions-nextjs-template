import { OfferedAsType } from '@app/model/service/service-types.internal';
import type { services } from '@wix/bookings';

export function determinePaymentOptionsBy(service: services.Service) {
  return [
    ...insertIf(
      !!service?.payment?.options?.pricingPlan,
      OfferedAsType.PRICING_PLAN
    ),
    ...insertIf(!!service?.payment?.options?.inPerson, OfferedAsType.OFFLINE),
    ...insertIf(!!service?.payment?.options?.online, OfferedAsType.ONLINE),
  ];
}

export function mapServiceOfferedAsDto(service: services.Service) {
  return determinePaymentOptionsBy(service);
}

function insertIf(condition: boolean, ...elements: any) {
  return condition ? elements : [];
}
