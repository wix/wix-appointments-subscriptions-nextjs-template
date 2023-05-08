'use client';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';

export default function ServiceListPreviewView({
  services,
}: {
  services: ServiceInfoViewModel[];
}) {
  const smClassName = (services?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (services?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return services?.length ? (
    <>
      <div
        className={`mx-auto flex flex-wrap my-3 m-auto grid grid-cols-1 gap-4 ${smClassName} ${mdClassName}`}
      >
        {services?.map((service, index) => (
          <ServiceCardPreview service={service} key={service.id} />
        ))}
      </div>
    </>
  ) : null;
}

const ServiceCardPreview = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="w-full rounded-none overflow-hidden mx-auto border-8 border-black relative h-full min-h-[300px]">
      <div className="p-6 pb-20 text-center h-full">
        <a
          href={`/service/${service.slug}`}
          className="font-bold text-xl hover:text-gray-700"
        >
          {service.info.name}
        </a>
        <p className="text-sm mt-2">{service.info.tagLine}</p>
        <div className="border-top border border-black w-full my-6"></div>
        <p className="text-gray-700 text-base">
          {formattedPrice.userFormattedPrice}
        </p>
        <p className="text-gray-700 text-base">
          {service.info.formattedDuration}
        </p>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a href={`/calendar/${service.slug}`} className="btn-main">
          Book Now
        </a>
      </div>
    </div>
  );
};
