'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { productService } from '@/features/products/services/productService';
import ProductForm from '@/features/admin/components/ProductForm';
import { Product } from '@/lib/api';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // We use getProduct which fetches by custom ID
                const data = await productService.getProduct(id);
                if (data) {
                    setProduct(data);
                } else {
                    alert('Product not found');
                    router.push('/admin/products');
                }
            } catch (error) {
                console.error('Failed to fetch product', error);
                alert('Failed to fetch product');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, router]);

    const onSubmit = async (data: any) => {
        try {
            await productService.updateProduct(id, data);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to update product', error);
            alert('Failed to update product');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Product</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage product details, pricing, and inventory.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/products" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
                        Discard
                    </Link>
                </div>
            </div>

            <ProductForm
                initialData={product}
                onSubmit={onSubmit}
                buttonLabel="Save Changes"
            />
        </div>
    );
}
