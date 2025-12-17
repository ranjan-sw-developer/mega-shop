'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/features/auth/slices/authSlice';
import { useRouter } from 'next/navigation';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">MegaShop</span>
                </Link>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive 
                                    ? "bg-blue-50 text-blue-600" 
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-blue-500" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 space-y-1">
                <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
                >
                    <Settings className="w-5 h-5 text-gray-400" />
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                    <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
