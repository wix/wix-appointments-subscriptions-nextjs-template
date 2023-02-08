import {
  GetServiceResponse,
  PricingPlanStatus,
  ScheduleStatus,
} from '@model/service/types';

export function mapServicePricingPlansDto(
  serviceResponse: GetServiceResponse,
  options: { onlyActive?: boolean } = {
    onlyActive: false,
  }
) {
  const schedule = serviceResponse!.schedules!.find(
    (serviceSchedule) => serviceSchedule.status === ScheduleStatus.CREATED
  );
  let pricingPlans = serviceResponse.pricingPlans || [];
  if (options.onlyActive) {
    pricingPlans = pricingPlans.filter(
      (pricingPlan) => pricingPlan.status === PricingPlanStatus.ACTIVE
    );
  }
  const pricingPlansDto = pricingPlans.map((pricingPlan) => ({
    id: pricingPlan.id,
    name: pricingPlan.name,
    visible: pricingPlan.visible,
  }));
  return {
    displayText: schedule!.rate?.priceText,
    pricingPlans: pricingPlansDto,
  };
}
