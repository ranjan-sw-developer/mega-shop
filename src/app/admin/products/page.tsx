'use client';

import { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/features/products/services/productService';
import Link from 'next/link';

export default function ProductInventory() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [status, setStatus] = useState('All Status');
    const [activeActionId, setActiveActionId] = useState<string | null>(null);

    // Simple debounce would be better but let's just pass search for now or use a custom hook if available.
    // If no custom hook, we can just fetch on change or use a timeout.
    // Let's implement a simple local debounce to avoid too many requests.
    // const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce effect
    // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const val = e.target.value;
    //     setSearch(val);
    //     // Simple timeout debounce
    //     const timeoutId = setTimeout(() => setDebouncedSearch(val), 500);
    //     return () => clearTimeout(timeoutId);
    // };

    // We need useEffect for cleanup if we want proper debounce, 
    // but here I'll just use the `search` state directly in query key with a keepPreviousData equivalent or just refetch.
    // To keep it simple and clean without extra hooks:
    // We will query based on `search` but user types in `tempSearch`.
    // Actually, let's just bind input to `search` and let React Query handle it (it might spam a bit without debounce).

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin-products', page, search, category, status],
        queryFn: () => productService.getProducts({
            page,
            limit: 10,
            search,
            category: category === 'All Categories' ? undefined : category,
            status: status === 'All Status' ? undefined : status
        }),
    });

    const products = data?.products || [];
    const pagination = data?.pagination;

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">Inventory</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Inventory</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your product catalog, prices, and stock levels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Add New Product
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[300px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Reset page on search
                        }}
                        placeholder="Search by name, SKU, or tag..."
                        className="w-full h-10 pl-10 pr-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setPage(1);
                        }}
                        className="h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500"
                    >
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Accessories</option>
                        <option>Home & Garden</option>
                    </select>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                        <option>Draft</option>
                    </select>
                    <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center h-full min-h-[400px] text-red-500">
                        Failed to load products.
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
                        <p className="font-medium">No products found</p>
                        <p className="text-sm">Try adjusting your filters or add a new product.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-4 w-10">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        </th>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product: any, index: number) => {
                                        const isLastResults = index >= products.length - 3;
                                        return (
                                            <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}>
                                                            {/* Placeholder if image fails or is missing could go here */}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{product.name}</p>
                                                            <p className="text-xs text-gray-500">{product.sku || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600">{product.category}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="w-full max-w-[100px]">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span className="font-medium text-gray-900">{product.stock || 0}</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                            <div
                                                                className={clsx("h-full rounded-full transition-all",
                                                                    (product.stock || 0) > 20 ? "bg-green-500" :
                                                                        (product.stock || 0) > 5 ? "bg-yellow-400" : "bg-red-500"
                                                                )}
                                                                style={{ width: `${Math.min(product.stock || 0, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-gray-900">₹{product.price.toFixed(2)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={clsx(
                                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                        product.status === 'Active' ? "bg-green-100 text-green-700" :
                                                            product.status === 'Low Stock' ? "bg-yellow-100 text-yellow-700" :
                                                                product.status === 'Out of Stock' ? "bg-red-100 text-red-700" :
                                                                    "bg-gray-100 text-gray-700"
                                                    )}>
                                                        <span className={clsx("w-1.5 h-1.5 rounded-full mr-1.5",
                                                            product.status === 'Active' ? "bg-green-500" :
                                                                product.status === 'Low Stock' ? "bg-yellow-500" :
                                                                    product.status === 'Out of Stock' ? "bg-red-500" : "bg-gray-400"
                                                        )}></span>
                                                        {product.status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setActiveActionId(activeActionId === product.id ? null : product.id)}
                                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        >
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>

                                                        {/* Dropdown Menu */}
                                                        {activeActionId === product.id && (
                                                            <>
                                                                <div
                                                                    className="fixed inset-0 z-40"
                                                                    onClick={() => setActiveActionId(null)}
                                                                ></div>
                                                                <div className={clsx(
                                                                    "absolute right-0 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-50",
                                                                    isLastResults ? "bottom-full mb-1" : "top-full mt-1"
                                                                )}>
                                                                    <div className="py-1">
                                                                        <Link
                                                                            href={`/admin/products/${product.id}`}
                                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left w-full"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <button
                                                                            onClick={async () => {
                                                                                try {
                                                                                    await productService.deleteProduct(product.id);
                                                                                    queryClient.invalidateQueries({ queryKey: ['admin-products'] });
                                                                                    setActiveActionId(null);
                                                                                } catch (e) {
                                                                                    alert('Failed to delete');
                                                                                }
                                                                            }}
                                                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left w-full"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        {pagination && (
                            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-medium text-gray-900">{((page - 1) * 10) + 1}</span> to <span className="font-medium text-gray-900">{Math.min(page * 10, pagination.total)}</span> of <span className="font-medium text-gray-900">{pagination.total}</span> results
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>

                                    {/* Simple Pagination Logic (Just show current page) */}
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-500 bg-blue-50 text-blue-600 font-medium">{page}</button>

                                    <button
                                        onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                        disabled={page === pagination.pages || pagination.pages === 0}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
