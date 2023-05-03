import { ServicePaymentDto } from '@app/model/service/service-payment.mapper';

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
  priceType: ServicePaymentDto['priceType'];
} => {
  const priceType = servicePayment.priceType;
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
    case 'text':
      userFormattedPrice = servicePayment.priceText ?? defaultFreeText;
      break;
    case 'static':
      userFormattedPrice = formatCurrency(
        servicePayment?.defaultPrice?.price,
        servicePayment?.defaultPrice?.currency
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
