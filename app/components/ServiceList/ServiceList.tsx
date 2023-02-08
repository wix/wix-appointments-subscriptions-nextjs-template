import WixMediaImage from '@app/components/Image/WixMediaImage';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';

const ALL_SERVICES_CATEGORY_ID = 'ALL';

export default function ServiceList({
  categoryId,
  services,
}: {
  categoryId?: string;
  services: ServiceInfoViewModel[];
}) {
  const categories = Object.values(
    services.reduce<{
      [id: string]: {
        id: string;
        name: string;
        selected: boolean;
      };
    }>(
      (acc, service) => {
        acc[service.categoryId] = {
          id: service.categoryId,
          name: service.categoryName,
          selected: service.categoryId === categoryId,
        };
        return acc;
      },
      {
        [ALL_SERVICES_CATEGORY_ID]: {
          id: ALL_SERVICES_CATEGORY_ID,
          name: 'All Services',
          selected: !categoryId || categoryId === ALL_SERVICES_CATEGORY_ID,
        },
      }
    )
  );
  const selectedCategoryId = categoryId ?? ALL_SERVICES_CATEGORY_ID;
  const servicesToDisplay = services.filter(
    (service) =>
      selectedCategoryId === ALL_SERVICES_CATEGORY_ID ||
      service.categoryId === selectedCategoryId
  );

  return (
    <>
      <div className="text-sm text-center text-black">
        <ul className="inline-flex flex-wrap justify-center border-b border-gray-200 mb-8">
          <li className="mr-2 -mb-px ">
            {categories.length > 1
              ? categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/book-now/category/${category.id}`}
                    aria-current={!!selectedCategoryId}
                    className={`inline-block p-4 rounded-t-lg border-b-[3px] hover:text-gray-600 ${
                      category.selected
                        ? 'active border-turquoise-200'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {category.name}
                  </a>
                ))
              : null}
          </li>
        </ul>
      </div>
      <div className="p-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {servicesToDisplay.map((service, index) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </>
  );
}

const ServiceCard = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="w-full rounded-none bg-white overflow-hidden mx-auto border border-white relative h-full min-h-[500px]">
      <a href={`/service/${service.slug}`}>
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={480}
        />
      </a>
      <div className="px-6 py-4 text-center pb-20">
        <a
          href={`/service/${service.slug}`}
          className="font-bold text-xl mb-2 hover:text-gray-700"
        >
          {service.info.name}
        </a>
        <div className="text-sm">
          <p className="my-3">{service.info.tagLine}</p>
          <p className="leading-8">{service.info.formattedDuration}</p>
          <p className="leading-8">{formattedPrice.userFormattedPrice}</p>
        </div>
      </div>
      <div className="w-full mx-auto pb-8 absolute bottom-0 text-center">
        <a href={`/calendar/${service.slug}`} className="btn-main">
          Book Now
        </a>
      </div>
    </div>
  );
};
