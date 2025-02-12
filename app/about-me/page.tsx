import Image from 'next/image';

export default function AboutMePage() {
  return (
    <>
      <div className="max-w-full-content mx-auto pb-24">
        <div className="px-5">
          <div className="header-line my-8"></div>
          <h1 className="mb-7 mt-10 tracking-tighter">About Me</h1>
        </div>
      </div>
      <div className="bg-white w-full h-full pb-12">
        <div className="relative max-w-full-content mx-auto">
          <div
            className={`
            absolute
            top-[-100px]
            sm:right-0
            sm:w-[319px]
            h-[319px]
            overflow-hidden
            border-white
            border-8
            mx-5
            max-w-[calc(100%-50px)]`}
          >
            <Image
              width={500}
              height={500}
              src="/about-me.jpeg"
              alt="my pic"
              className="max-w-[unset]"
            />
          </div>
          <section className="min-h-max mx-5">
            <p className="text-sm flex-1 leading-7 sm:w-[calc(100%-319px)] sm:pt-24 pt-48">
              I'm Hailey Williams, the owner of Halos Haus of Brows, and I'm dedicated 
              to providing a relaxing and personalized experience for each client. 
              I'm passionate about creating beautiful brows that boost your confidence 
              and enhance your natural beauty. My clients rave about my attention to detail, 
              personalized service, and the transformative power of my brow services. 
              Let's work together to create brows that make you feel amazing!
            </p>
            <p>&nbsp;</p>
            <p className="text-sm flex-1 leading-7">
            </p>
            <div className="sm:flex pb-6">
              <section className="flex-1 pt-6">
                <h3 className="text-xl">Certifications</h3>
                <ul className="text-sm pt-6 list-disc list-inside leading-6">
                  <li>Name of Certification 1</li>
                  <li>Name of Certification 2</li>
                  <li>Name of Certification 3</li>
                </ul>
              </section>
              <section className="flex-1 pt-6">
                <h3 className="text-xl">Qualifications</h3>
                <ul className="text-sm pt-6 list-disc list-inside leading-6">
                  <li>Name of Qualification 1</li>
                  <li>Name of Qualification 2</li>
                  <li>Name of Qualification 3</li>
                </ul>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
