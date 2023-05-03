import { getServiceBySlug } from '@app/model/service/service-api';
import ImageGallery from '@app/components/Image/ImageGallery/ImageGallery';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import { OfferedAsType } from '@app/model/service/service-types.internal';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';

const offeredAsToPaymentOptions = (offeredAs: string) =>
  offeredAs === OfferedAsType.OFFLINE
    ? 'Offline'
    : offeredAs === OfferedAsType.ONLINE
    ? 'Online'
    : offeredAs === OfferedAsType.PRICING_PLAN
    ? 'Paid Plans'
    : 'Other';

export default async function ServicePage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { data: service } = params.slug
    ? await getServiceBySlug(wixSession, params.slug)
    : { data: null };

  return <ServicePageWithFallback service={service} />;
}

export function ServicePageWithFallback({
  service,
}: {
  service?: ServiceInfoViewModel | null;
}) {
  return (
    <div className="max-w-full-content mx-auto bg-white px-6 sm:px-28">
      {service ? (
        <ServicePageView service={service} />
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </div>
  );
}

function ServicePageView({ service }: { service: ServiceInfoViewModel }) {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="full-w rounded overflow-hidden max-w-7xl mx-auto">
      <div className="mt-14 mb-8 pb-8 border-b border-black w-full">
        <h1 className="font-bold text-4xl mb-2">{service.info.name}</h1>
        <p className="text-sm pt-4 empty:hidden">{service.info.tagLine}</p>
      </div>
      {service.info.description ? (
        <>
          <h2 className="font-lulo">Service Description</h2>
          <p className="text-sm w-full mt-4">{service.info.description}</p>
        </>
      ) : null}
      {service.info.media?.otherMediaItems?.length ? (
        <section className="mt-10">
          <ImageGallery mediaItems={service.info.media.otherMediaItems} />
        </section>
      ) : null}
      <div className="w-full h-full pt-14 pb-10 text-center">
        <div className="table text-base border-collapse mx-auto">
          <div className="table-row">
            <p className="table-cell border border-black p-4 empty:hidden">
              {service.info.formattedDuration}
            </p>
            <p className="table-cell border border-black p-4 empty:hidden">
              {formattedPrice.userFormattedPrice}
            </p>
            <p className="table-cell border border-black p-4 empty:hidden">
              {service.payment.offeredAs
                .map(offeredAsToPaymentOptions)
                .join(', ')}
            </p>
          </div>
        </div>
        <div className="mt-14">
          <a href={`/calendar/${service.slug}`} className="btn-main">
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* uncomment in order to generate static content */
// export async function generateStaticParams() {
//   const wixSession = createWixVisitorSession();
//   // create static pages for first 5 services
//   const { services } = await getServices({ limit: 5 }, wixSession);
//   return services.map(({ slug }) => ({ slug }));
// }
