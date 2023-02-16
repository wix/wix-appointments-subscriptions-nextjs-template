import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import ClientPrinter from '@app/test/ClientComp';

export default async function ServicePage({ params }: any) {
  const wixSession = useServerAuthSession();
  const services = await wixSession!
    .wixClient!.services.queryServices()
    .limit(100)
    .find();
  return (
    <>
      <ClientPrinter data={services.items}></ClientPrinter>
    </>
  );
}
