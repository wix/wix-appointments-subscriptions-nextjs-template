'use client';
import { NavLink } from './NavLink';
import { useCallback, useState } from 'react';
import type { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import Login from '@app/components/Login/Login';

const navbarItems = [
  { ref: '/#about', label: 'About' },
  { ref: '/book-now', label: 'Services' },
  { ref: '/plans', label: 'Plans' },
  { ref: '/guides', label: 'Guides' },
  { ref: '/#contact', label: 'Contact' },
  { ref: '/account/my-account', label: 'Account', prefetch: false },
];

export const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ''} ${
      isActive ? 'text-turquoise-200' : 'hover:text-turquoise-200'
    }`}
    {...linkProps}
  />
);

export function NavBar() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  const toggleOpen = useCallback(
    () => setIsMenuShown(!isMenuShown),
    [isMenuShown]
  );
  return (
    <>
      <button
        className="block md:hidden float-right relative z-50"
        onClick={toggleOpen}
      >
        <div className="space-y-2 absolute top-0 right-5">
          {(isMenuShown
            ? [
                'rotate-45 translate-y-[13px]',
                'opacity-0 h-0',
                '-rotate-45 translate-y-[-13px]',
              ]
            : ['', '', '']
          ).map((className, index) => (
            <span
              key={index}
              className={
                'block h-[4px] w-8 bg-gray-600 transform transition duration-500 ease-in-out ' +
                className
              }
            ></span>
          ))}
        </div>
      </button>
      <nav
        className={`${
          isMenuShown
            ? 'max-md:w-full max-md:opacity-100'
            : 'max-md:w-0 max-md:opacity-0'
        } transition-all duration-500 ease-in-out md:block overflow-hidden max-md:absolute max-md:animate-sideways-once max-md:h-screen max-md:bg-white max-md:pt-24 z-40 top-0 right-0`}
      >
        <ul className="flex flex-col items-center md:flex-row gap-10 md:gap-4 min-[900px]:gap-5 lg:gap-8 justify-end text-sm md:text-[15px] leading-[22px]">
          {navbarItems.map(({ ref, label, prefetch }) => (
            <li key={ref} className="relative">
              <StyledNavLink
                isActive={ref === linkRef}
                href={ref}
                onClick={() => {
                  setLinkRef(ref);
                  setIsMenuShown(false);
                }}
                prefetch={prefetch}
              >
                {label}
              </StyledNavLink>
              <span className="absolute -bottom-5 md:hidden border-b-2 w-48 left-[calc(50%_-_theme(space.24))]" />
            </li>
          ))}
          <li className="order-first md:order-last justify-end">
            <div className="flex flex-nowrap text-turquoise-200 gap-2 justify-center items-center">
              <Login onActionClick={() => setIsMenuShown(false)} />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
