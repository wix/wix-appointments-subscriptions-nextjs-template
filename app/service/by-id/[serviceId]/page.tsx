import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { getServiceById } from '@app/model/service/service-api';
import { ServicePageWithFallback } from '@app/service/[slug]/page';

export default async function ServicePage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { data: service } = params.serviceId
    ? await getServiceById(wixSession, params.serviceId)
    : { data: null };

  return <ServicePageWithFallback service={service} />;
}
