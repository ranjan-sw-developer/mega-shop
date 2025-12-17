'use client';

import { useProductViewModel } from '../hooks/useProductViewModel';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import Reviews from './Reviews';
import { ProductDetailsSkeleton } from './skeletons/ProductDetailsSkeleton';

import ProductGrid from '@/features/home/components/ProductGrid';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function ProductDetailsPage({ id }: { id: string }) {
    const { product, relatedProducts, isLoading } = useProductViewModel(id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <ProductDetailsSkeleton />
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <span>Home</span> / <span>{product.category}</span> / <span className="text-black font-medium">{product.name}</span>
                </nav>

                {/* Top Section: Gallery & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <ImageGallery images={product.images || [product.image]} />
                    <ProductInfo product={product} />
                </div>

                {/* Related Products */}
                <ProductGrid title="You might also like" products={relatedProducts} isLoading={false} />

                {/* Reviews */}
                <Reviews product={product} />
            </main>

            <Footer />
        </div>
    );
}
