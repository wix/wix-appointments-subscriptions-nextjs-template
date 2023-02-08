import {
  GetServiceResponse,
  Rate,
  PaymentOptions,
  ScheduleStatus,
  Money,
} from '@model/service/types';

export type ServicePaymentDto = ReturnType<typeof mapServicePaymentDto>;

export function oneTimePricing(
  paymentOptions: PaymentOptions,
  rate: Rate
): {
  isFree: boolean;
  isVariedPricing?: boolean;
  priceText: string;
  currency: string;
  price: number;
  deposit: number;
} {
  const paymentFromRate = mapPaymentFromRate(rate, paymentOptions);
  return {
    isFree: paymentFromRate.isFree,
    priceText: paymentFromRate.priceText!,
    currency: paymentFromRate.currency!,
    price: paymentFromRate.price,
    deposit: paymentFromRate.minCharge,
    isVariedPricing: paymentFromRate.isVariedPricing,
  };
}

export function mapServicePaymentDto(serviceResponse: GetServiceResponse) {
  const rate = serviceResponse!.schedules!.find(
    (serviceSchedule) => serviceSchedule.status === ScheduleStatus.CREATED
  )!.rate!;
  const { isFree, priceText, currency, price, deposit, isVariedPricing } =
    oneTimePricing(serviceResponse!.service!.paymentOptions!, rate);
  const minPrice = serviceResponse.minPrice
    ? mapServiceMoneyDto(serviceResponse.minPrice)
    : undefined;
  const maxPrice = serviceResponse.maxPrice
    ? mapServiceMoneyDto(serviceResponse.maxPrice)
    : undefined;
  return {
    currency,
    price,
    isFree,
    priceText,
    minCharge: deposit,
    isVariedPricing,
    minPrice,
    maxPrice,
  };
}

export const mapServiceMoneyDto = (money: Money) => {
  return {
    currency: money.currency,
    price: Number(money.value),
    formattedValue: money.formattedValue,
  };
};

export function mapPaymentFromRate(rate: Rate, paymentOptions: PaymentOptions) {
  let currency = null,
    price = 0,
    minCharge = 0,
    isVariedPricing = false;
  const priceText = rate?.priceText;
  if (rate?.labeledPriceOptions?.general) {
    currency = rate.labeledPriceOptions.general.currency;
    price = Number(rate.labeledPriceOptions.general.amount);
    minCharge = Number(rate.labeledPriceOptions.general.downPayAmount);
  }
  if (rate?.defaultVariedPrice) {
    isVariedPricing = true;
    currency = rate.defaultVariedPrice.currency;
    price = Number(rate.defaultVariedPrice.amount);
    minCharge = Number(rate.defaultVariedPrice.downPayAmount);
  }
  const isFree = isFreeService(paymentOptions, price);
  price = isFree ? 0 : price;

  return {
    isFree,
    priceText,
    currency,
    price,
    minCharge,
    isVariedPricing,
  };
}

export function isFreeService(paymentOptions: PaymentOptions, price: number) {
  return !!paymentOptions?.custom || (!price && !paymentOptions?.wixPaidPlan);
}
