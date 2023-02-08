import ServiceList from '@app/components/ServiceList/ServiceList';
import { getServices } from '@model/service/service-api';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';

export default async function BookNowPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { services } = await getServices({ limit: 250 }, wixSession);
  return (
    <div className="max-w-full-content mx-auto pb-8 px-5">
      <div className="pt-5 pb-12">
        <div className="header-line my-8"></div>
        <h1 className="mb-7 mt-10 tracking-tighter">Services</h1>
      </div>
      <ServiceList categoryId={params?.category} services={services} />
    </div>
  );
}
