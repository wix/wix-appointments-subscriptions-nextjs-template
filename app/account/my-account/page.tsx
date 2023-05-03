import MyAccountSection from '@app/components/MyAccount/MyAccountSection';

export default function MyAccountPage() {
  return (
    <MyAccountSection>
      <h2 className="text-highlight text-4xl">My Account</h2>
      <div className="text-sm py-2">
        <p className="pt-2">
          Here you can manage your orders for both pricing plans and bookings
          and view your member details
        </p>
      </div>
    </MyAccountSection>
  );
}
