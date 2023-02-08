'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';
import { createWixVisitorSession, WixSession } from '@model/auth/auth';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<WixSession | null>(null);

export const WixBookingsClientProvider = ({
  children,
}: PropsWithChildren<{}>) => (
  <WixSessionContext.Provider value={createWixVisitorSession()}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WixSessionContext.Provider>
);
