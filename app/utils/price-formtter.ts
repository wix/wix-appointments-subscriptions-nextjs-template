import { ServicePaymentDto } from '@model/service/service-payment.mapper';

export const formatServicePrice = ({
  servicePayment,
  defaultFreeText = 'No Fee',
  dynamicPriceTemplate = 'Starting From ${price}',
}: {
  servicePayment: ServicePaymentDto;
  defaultFreeText?: string;
  dynamicPriceTemplate?: string;
}): {
  userFormattedPrice: string;
  priceType: 'dynamic' | 'static' | 'free';
} => {
  const priceType =
    servicePayment.isFree ||
    (servicePayment.price === 0 && !servicePayment.isVariedPricing)
      ? 'free'
      : servicePayment.isVariedPricing
      ? 'dynamic'
      : 'static';
  let userFormattedPrice = '';
  switch (priceType) {
    case 'dynamic':
      userFormattedPrice = new Function(
        'price',
        `return \`${dynamicPriceTemplate}\`;`
      )(
        formatCurrency(
          servicePayment.minPrice?.price,
          servicePayment.minPrice?.currency
        )
      );
      break;
    case 'free':
      userFormattedPrice = servicePayment.priceText ?? defaultFreeText;
      break;
    case 'static':
      userFormattedPrice = formatCurrency(
        servicePayment.price,
        servicePayment.currency
      );
      break;
  }

  return {
    priceType,
    userFormattedPrice,
  };
};

export const formatCurrency = (
  price: number | string = 0,
  currency: string = 'USD'
) =>
  Intl.NumberFormat('en', { style: 'currency', currency }).format(
    Number(price)
  );

export const formatCurrencyToParts = (
  price: number | string = 0,
  currency: string = 'USD'
) => ({
  currencySign:
    Intl.NumberFormat('en', { style: 'currency', currency })
      .formatToParts(Number(price))
      .find(({ type }) => type === 'currency')?.value ?? '',
  price: String(price),
});
