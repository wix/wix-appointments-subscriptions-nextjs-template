import { services } from '@wix/bookings';
import { RateType } from '@wix/bookings/build/cjs/src/bookings-services-v2-service.universal';

export type ServicePaymentDto = ReturnType<typeof mapServicePaymentDto>;

type PriceTypeDto = 'dynamic' | 'static' | 'text';

export function mapServicePaymentDto(service: services.Service): {
  defaultPrice?: MoneyDto;
  depositPrice?: MoneyDto;
  minPrice?: MoneyDto;
  maxPrice?: MoneyDto;
  priceType: PriceTypeDto;
  priceText?: string;
} {
  let defaultPrice = undefined;
  let depositPrice = undefined;
  let minPrice = undefined;
  let maxPrice = undefined;
  let priceText = undefined;
  let priceType: PriceTypeDto = 'text';
  switch (service.payment?.rateType) {
    case RateType.FIXED:
      defaultPrice = mapServiceMoneyDto(service?.payment?.fixed?.price);
      depositPrice = mapServiceMoneyDto(service?.payment?.fixed?.price);
      priceType = 'static';
      break;
    case RateType.VARIED:
      defaultPrice = mapServiceMoneyDto(service?.payment?.varied?.defaultPrice);
      depositPrice = mapServiceMoneyDto(service?.payment?.varied?.deposit);
      minPrice = mapServiceMoneyDto(service?.payment?.varied?.minPrice);
      maxPrice = mapServiceMoneyDto(service?.payment?.varied?.minPrice);
      priceType = 'dynamic';
      break;
    case RateType.NO_FEE:
      priceText = service?.payment?.custom?.description ?? undefined;
      break;
    default:
      break;
  }
  return {
    defaultPrice,
    depositPrice,
    priceText,
    priceType,
    maxPrice,
    minPrice,
  };
}

export type MoneyDto = ReturnType<typeof mapServiceMoneyDto>;

export const mapServiceMoneyDto = (money?: services.Money) => {
  return money
    ? {
        currency: money.currency,
        price: Number(money.value),
      }
    : undefined;
};
