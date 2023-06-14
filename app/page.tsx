import './page.css';
import ServiceListPreview from '@app/components/ServiceList/ServiceListPreview';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { safeGetServices } from '@app/model/service/service-api';
import testIds from '@app/utils/test-ids';

export default async function Home() {
  const wixSession = useServerAuthSession();
  const {
    data: { services },
  } = await safeGetServices(wixSession, { limit: 3 });
  return (
    <div>
      <div
        className="text-center w-full min-h-screen relative"
        data-testid={testIds.HOME_PAGE.HEADER}
      >
        <video autoPlay muted loop className="video-background">
          <source
            src="https://video.wixstatic.com/video/11062b_9de2dbff3dda403b944bb98c41cb5764/1080p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
        <div className="text-center px-3">
          <div className="font-sans font-bold uppercase tracking-widest pt-16">
            Ambition is the first step towards
          </div>
          <div className="font-lulo text-4xl sm:text-6xl md:text-8xl pt-4">
            Success
          </div>
          <div className="text-xl pt-6 tracking-wider">
            Now Available for Online Coaching
          </div>
          <div className="pt-7">
            <a
              className="btn-main"
              href="/book-now"
              data-testid={testIds.HOME_PAGE.BOOK_NOW_CTA}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[-175px]">
        <ScrollIntoView hashName="#about" offset="-128px" />
        <div className="w-full bg-white h-full relative">
          <div className="max-w-full-content mx-auto h-full">
            <div className="pl-5 py-2 pr-5 sm:w-2/4 sm:pr-24 sm:pr-0">
              <div className="header-line my-8"></div>
              <h2 className="mb-7 mt-10 tracking-tighter max-w-xs title">
                About me
              </h2>
              <p className="text-sm flex-1 leading-7">
                My name is Allan Johnson and I am a personal coach. My goal is
                to assist people identify and overcome obstacles in their lives
                and to maximize their potential. Through my coaching, I help
                people set goals, build the confidence and skills they need to
                achieve success and develop a positive mindset and a sense of
                self-worth.
              </p>
              <p>&nbsp;</p>
              <p className="text-sm flex-1 leading-7">
                As the famous American author, salesman and motivational speaker
                Zig Ziglar once said: “Success is the doing, not the getting; in
                the trying, not the triumph. Success is a personal standard,
                reaching for the highest that is in us, becoming all that we can
                be. If we do our best, we are a success.
              </p>
              <div className="mt-11 mb-20">
                <a href="/about-me" className="btn-main">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full sm:absolute sm:top-0 sm:left-2/4 sm:w-2/4 h-full">
            <div className="bg-[url('/about-me.jpeg')] w-full h-full bg-cover min-h-[320px]"></div>
          </div>
        </div>
      </div>
      <div className="parallax-background">
        {services?.length ? (
          <div
            className="max-w-full-content mx-auto bg-transparent p-5"
            data-testid={testIds.HOME_PAGE.SERVICES_SECTION}
          >
            <div className="header-line my-8"></div>
            <h2 className="mb-7 mt-10 tracking-tighter title max-w-xs">
              How I Can Help You
            </h2>

            <>
              <ServiceListPreview services={services} />
              <div className="flex my-8 justify-center">
                <a className="btn-main" href="/book-now">
                  More Services
                </a>
              </div>
            </>
          </div>
        ) : null}
      </div>
    </div>
  );
}
