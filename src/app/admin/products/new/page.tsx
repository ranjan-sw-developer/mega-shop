'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { productService } from '@/features/products/services/productService';
import ProductForm from '@/features/admin/components/ProductForm';

export default function AddProductPage() {
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            await productService.createProduct(data);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to create product', error);
            alert('Failed to create product');
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
                        <p className="text-sm text-gray-500 mt-1">Create a new product for your store.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/products" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
                        Discard
                    </Link>
                </div>
            </div>

            <ProductForm onSubmit={onSubmit} />
        </div>
    );
}
