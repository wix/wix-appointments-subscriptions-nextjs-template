import './page.css';
import { getServiceBySlug } from '@app/model/service/service-api';
import Calendar from '@app/components/Calendar/Calendar';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import testIds from '@app/utils/test-ids';

export default async function CalendarPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const { data: service } = await getServiceBySlug(wixSession, params.slug);

  return (
    <div className="bg-white max-w-full-content mx-auto">
      {service ? (
        <>
          <section
            className="align-middle box-border p-7 pt-16 text-left"
            data-testid={testIds.CALENDAR_PAGE.HEADER}
          >
            <h1 className="mb-4">{service?.info?.name}</h1>
            <p className="text-sm">
              Check out our availability and book the date and time that works
              for you
            </p>
          </section>

          <div
            key={service.id}
            className="full-w rounded overflow-hidden max-w-7xl mx-auto"
          >
            <Calendar service={service} />
          </div>
        </>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </div>
  );
}
