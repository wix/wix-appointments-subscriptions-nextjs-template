import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetPaidPlans } from '@app/model/paid-plans/paid-plans-api';
import { formatCurrencyToParts } from '@app/utils/price-formtter';
import { getCheckoutUrl } from '@app/model/paid-plans/paid-plans-checkout';
import PlanSelect from '@app/components/Plan/PlanSelect';
import { plans } from '@wix/pricing-plans';
import testIds from '@app/utils/test-ids';

const durationPeriodFormatter = (
  period: plans.PeriodUnit = plans.PeriodUnit.UNDEFINED
): { plural: string; singular: string } => {
  switch (period) {
    case plans.PeriodUnit.DAY:
      return { plural: 'Days', singular: 'Day' };
    case plans.PeriodUnit.WEEK:
      return { plural: 'Weeks', singular: 'Week' };
    case plans.PeriodUnit.MONTH:
      return { plural: 'Months', singular: 'Month' };
    case plans.PeriodUnit.YEAR:
      return { plural: 'Years', singular: 'Year' };
    case plans.PeriodUnit.UNDEFINED:
    default:
      return { plural: '', singular: '' };
  }
};

const formatOneTimePlanDuration = (duration: plans.Duration) => {
  const periodFormat = durationPeriodFormatter(duration.unit);
  return `${duration.count ?? 0} ${
    duration.count === 1 ? periodFormat.singular : periodFormat.plural
  }`;
};

const formatRecurringPlanDuration = (recurrence: plans.Recurrence) => {
  const periodFormat = durationPeriodFormatter(recurrence?.cycleDuration?.unit);
  return recurrence?.cycleDuration?.count === 1
    ? periodFormat.singular
    : `${recurrence?.cycleDuration?.count ?? 0} ${periodFormat.plural}`;
};

function formatPlanDuration(plan: plans.Plan) {
  return plan.pricing?.singlePaymentUnlimited
    ? 'Unlimited'
    : plan.pricing?.singlePaymentForDuration
    ? `Valid for ${formatOneTimePlanDuration(
        plan.pricing?.singlePaymentForDuration!
      )}`
    : plan?.pricing?.subscription
    ? `Recurring every ${formatRecurringPlanDuration(
        plan!.pricing!.subscription!
      )}`
    : '';
}

// opt out static rendering because of https://github.com/vercel/next.js/issues/43077
export const dynamic = 'force-dynamic';

export default async function PlansPage({
  searchParams,
}: {
  searchParams: { [_: string]: string };
}) {
  const { planIds, checkoutData } = searchParams;
  const wixSession = useServerAuthSession();
  const { data: plans } = await safeGetPaidPlans(wixSession, {
    planIds: planIds ? planIds?.split(',') : undefined,
  });
  return (
    <div className="max-w-full-content mx-auto pb-8">
      <div className="px-5">
        <div className="pt-5 pb-12" data-testid={testIds.PLANS_PAGE.HEADER}>
          <div className="header-line my-8"></div>
          <h1 className="mb-2 mt-10 tracking-tighter">
            Choose the Plan for You
          </h1>
          <p className="text-sm leading-6">
            I offer coaching, consulting, and support for your personal and
            professional development.
          </p>
        </div>
        {plans?.length ? (
          <div
            className="p-3 pt-8 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            data-testid={testIds.PLAN_LIST.CONTAINER}
          >
            {plans.map((plan) => {
              const priceParts = formatCurrencyToParts(
                plan.pricing?.price?.value,
                plan.pricing?.price?.currency
              );
              return (
                <li
                  data-testid={testIds.PLAN_ITEM.CONTAINER}
                  key={plan._id}
                  className="w-full list-none rounded-none bg-white overflow-hidden mx-auto border-black border-2 m-0 p-0 bg-opacity-50 flex flex-col"
                >
                  <div className="text-center px-9 py-7 flex flex-grow flex-col justify-start items-center w-full border-b-2 border-black">
                    <h2 className="pb-3">{plan.name}</h2>
                    <div className="relative pb-3">
                      <span className="text-sm align-top">
                        {priceParts.currencySign}
                      </span>
                      <span className="text-6xl">{priceParts.price}</span>
                    </div>
                    <div className="text-sm pb-2 flex-grow">
                      {plan.description}
                    </div>
                    <div className="text-xs">{formatPlanDuration(plan)}</div>
                    <PlanSelect
                      checkoutUrl={getCheckoutUrl({
                        plan,
                        checkoutData,
                      })}
                    >
                      <div className="btn-main w-full cursor-pointer mt-5">
                        Select
                      </div>
                    </PlanSelect>
                  </div>
                  <div className="bg-white px-9 py-5 flex flex-col justify-start items-center w-full h-56 overflow-y-auto">
                    <ul>
                      {plan.perks?.values?.map((perk, index) => (
                        <li key={index} className="py-1">
                          <BenefitPrefix />
                          <span className="text-xs pl-2 align-middle">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </div>
        ) : (
          <>
            No plans are offered at the moment. Click{' '}
            <a
              href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fpricing-plans%3FreferralInfo%3DHeadless"
              target="_blank"
              rel="noreferrer"
              className="text-turquoise-200"
            >
              here
            </a>{' '}
            to go to the business dashboard to add plans. Once added, they will
            appear here.
          </>
        )}
      </div>
    </div>
  );
}

const BenefitPrefix = () => (
  <svg
    role="img"
    width="21"
    height="21"
    viewBox="0 0 24 24"
    className="fill-green-600 inline-block"
  >
    <path
      fillRule="evenodd"
      d="M10.785 14.961L8 12.176L8.707 11.469L10.785 13.547L15.293 9.039L16 9.746L10.785 14.961ZM12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.419 20 20 16.418 20 12C20 7.582 16.419 4 12 4Z"
    ></path>
  </svg>
);
