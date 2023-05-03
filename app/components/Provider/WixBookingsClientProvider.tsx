'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';
import { getBrowserWixClient } from '@app/model/auth/wix-client.browser';
import { WixSession } from '@app/model/auth/auth';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<WixSession | null>(null);

export const WixBookingsClientProvider = ({
  children,
}: PropsWithChildren<{}>) => (
  <WixSessionContext.Provider value={{ wixClient: getBrowserWixClient() }}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WixSessionContext.Provider>
);
