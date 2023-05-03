import MyAccountSection from '@app/components/MyAccount/MyAccountSection';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getMyPlanOrders } from '@app/model/paid-plans/paid-plans-api';
import { format } from 'date-fns';
import PlanOrderActions from '@app/components/MyAccount/PricingPlans/PlanOrderActions';

const DATE_FORMAT = 'MMM dd, yyyy';

const formatDate = (date: Date) => format(new Date(date), DATE_FORMAT);

export default async function MyPlansPage() {
  const wixSession = useServerAuthSession();
  const { data: planOrders } = await getMyPlanOrders(wixSession);
  return (
    <MyAccountSection>
      <h2 className="text-highlight text-4xl">My Plans</h2>
      <div className="text-sm py-2">
        <p className="pt-2">
          View and manage the subscriptions you have purchased
        </p>
      </div>
      <div className="border-t border-white border-opacity-[0.04] mt-14"></div>
      {planOrders?.length ? (
        planOrders?.map((order, index) => (
          <div
            key={order._id}
            className="flex flex-wrap gap-5 py-6 border-b border-white border-opacity-30 hover:border-opacity-80 text-sm"
          >
            <div>{order.planName}</div>
            <div>
              <span>Valid: {formatDate(new Date(order!.startDate!))}</span>
              {order!.endDate! ? (
                <span> - {formatDate(new Date(order!.endDate!))}</span>
              ) : null}
            </div>
            <div className="text-xs">{order.status}</div>
            <div className="ml-auto">
              <PlanOrderActions planOrder={{ _id: order._id }} />
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 text-center">
          <div className="mb-3">
            {"You haven't purchased any subscriptions yet."}
          </div>
          <a href="/plans" className="text-sm text-highlight underline">
            View Plans & Pricing
          </a>
        </div>
      )}
    </MyAccountSection>
  );
}
