'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const ScrollIntoView = ({
  hashName,
  offset = '0',
}: {
  hashName: string;
  offset?: string;
}) => {
  const myRef = useRef<HTMLDivElement | null>(null);
  // since router.events is not supported in next/navigation using this as a WA
  const params = useSearchParams();
  useEffect(() => {
    setTimeout(() => {
      if (window.location.hash === hashName && myRef.current) {
        myRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 10);
  }, [params, hashName, myRef.current?.scrollIntoView]);

  return (
    <div className="relative h-0 w-full opacity-0">
      <div
        className={`absolute left-0 w-full`}
        style={{ top: offset }}
        ref={myRef}
      ></div>
    </div>
  );
};

export default ScrollIntoView;
