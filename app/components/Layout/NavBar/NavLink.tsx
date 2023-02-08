'use client';
import Link, { LinkProps } from 'next/link';

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  className: string;
};

export function NavLink(props: NavLinkProps) {
  const { children, ...linkProps } = props;

  return <Link {...linkProps}>{props.children}</Link>;
}
