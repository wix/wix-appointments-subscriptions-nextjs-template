import type { ServicePaymentDto } from '@app/model/service/service-payment.mapper';
import { formatServicePrice } from '@app/utils/price-formtter';

export const useServiceFormattedPrice = (
  servicePayment: ServicePaymentDto
): {
  userFormattedPrice: string;
  priceType: ServicePaymentDto['priceType'];
} => formatServicePrice({ servicePayment });
