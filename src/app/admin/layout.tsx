'use client';

import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/features/admin/components/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading: authLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Wait for auth to initialize (simple check: if no user and not loading, redirect)
        // Better: check if user is admin whenever user state changes.

        if (!authLoading) {
            if (!user || user.role !== 'admin') {
                router.replace('/');
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, authLoading, router]);

    if (authLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F9FAFB]">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
                {/* Admin Header / Top Bar could go here if needed, but per design sidebar is full height */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
