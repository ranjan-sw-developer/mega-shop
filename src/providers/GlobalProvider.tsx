'use client';

import { SessionProvider } from 'next-auth/react';
import AuthSync from '@/features/auth/components/AuthSync';
import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReduxProvider>
                <QueryProvider>
                    <AuthSync />
                    {children}
                </QueryProvider>
            </ReduxProvider>
        </SessionProvider>
    );
}
