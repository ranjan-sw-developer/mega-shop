'use client';

import { Search, ShoppingCart, User, Menu, LayoutDashboard } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { openAuthModal, logout } from '@/features/auth/slices/authSlice';
import { LogOut } from 'lucide-react';

export default function Header() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const { user } = useAppSelector((state) => state.auth);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowProfileMenu(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <ShoppingBagIcon className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">MegaShop</span>
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products, brands and more..."
                        className="w-full h-12 pl-4 pr-12 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    />
                    <button type="submit" className="absolute right-1 top-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                        <Search className="w-4 h-4 text-black" />
                    </button>
                </form>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link href="#" className="hover:text-black transition-colors">Categories</Link>
                        <Link href="#" className="hover:text-black transition-colors">Deals</Link>
                    </nav>

                    <div className="flex items-center gap-1">
                        <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-2 p-1 pl-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-100"
                                >
                                    <span className="text-sm font-semibold max-w-[100px] truncate">{user.name}</span>
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>

                                {showProfileMenu && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 animate-scale-in">
                                            <div className="px-3 py-2 border-b border-gray-50 mb-1">
                                                <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                                                <p className="text-xs font-bold truncate">{user.email}</p>
                                            </div>

                                            {user.role === 'admin' && (
                                                <Link
                                                    href="/admin/products"
                                                    onClick={() => setShowProfileMenu(false)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium mb-1"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Admin Panel
                                                </Link>
                                            )}

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => dispatch(openAuthModal('signin'))}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <User className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    );
}
