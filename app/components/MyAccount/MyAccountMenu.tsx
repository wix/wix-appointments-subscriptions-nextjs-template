'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LinkProps } from 'next/link';
import { StyledNavLink } from '@app/components/Layout/NavBar/NavBar';

const navbarItems = [
  { scroll: true, ref: '/account/my-account', label: 'My Account' },
  { scroll: true, ref: '/account/my-bookings', label: 'My Bookings' },
  { scroll: true, ref: '/account/my-plans', label: 'My Plans' },
];

export default function MyAccountMenu() {
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname!);
  return (
    <ul className="flex flex-row md:flex-col gap-6 md:gap-4 start text-md leading-[22px]">
      {navbarItems.map(({ ref, label, scroll }) => (
        <li key={ref} className="relative">
          <StyledNavLink
            isActive={ref === linkRef}
            href={ref}
            onClick={() => {
              setLinkRef(ref);
            }}
            scroll={scroll}
            className="normal-case"
          >
            {label}
          </StyledNavLink>
        </li>
      ))}
    </ul>
  );
}
