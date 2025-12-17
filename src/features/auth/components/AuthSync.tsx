'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess, logout } from '@/features/auth/slices/authSlice';

export default function AuthSync() {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            // Sync NextAuth session to Redux
            dispatch(loginSuccess({
                id: (session.user as any).id,
                name: session.user.name || '',
                email: session.user.email || '',
                role: (session.user as any).role || 'user',
                avatar: session.user.image || undefined,
            }));
        } else if (status === 'unauthenticated') {
            // If NextAuth says unauthenticated, ensure Redux matches
            // dispatch(logout()); 
            // CAUTION: This might cause a loop if valid token exists in local storage 
            // but next-auth session expired. For now, trust manual logout 
            // or let the session expiry handle it.
            // Actually, if we use next-auth as source of truth, we should sync logout.
        }
    }, [session, status, dispatch]);

    // Also listen to storage for cross-tab sync if needed, but NextAuth handles this well.
    return null;
}
