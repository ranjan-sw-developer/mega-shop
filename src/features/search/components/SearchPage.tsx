'use client';

import { useSearchViewModel } from '../hooks/useSearchViewModel';
import ProductGrid from '@/features/home/components/ProductGrid';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function SearchPage() {
    const { query, products, isLoading } = useSearchViewModel();

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            <main className="container mx-auto px-4 py-8 mb-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display mb-2">
                        {isLoading ? 'Searching...' : `Results for "${query}"`}
                    </h1>
                    <p className="text-gray-500">
                        {isLoading ? 'Please wait' : `Found ${products.length} products`}
                    </p>
                </div>

                <ProductGrid
                    title=""
                    products={products}
                    isLoading={isLoading}
                />

                {!isLoading && products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No products found matching your criteria.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
