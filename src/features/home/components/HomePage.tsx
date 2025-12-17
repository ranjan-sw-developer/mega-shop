'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Hero from './Hero';
import CategoryBrowser from './CategoryBrowser';
import FlashSale from './FlashSale';
import ProductGrid from './ProductGrid';
import { useHomeViewModel } from '../hooks/useHomeViewModel';

export default function HomePage() {
    const { products, isLoading } = useHomeViewModel();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <Hero />
                <CategoryBrowser />
                <FlashSale />
                <ProductGrid title="Trending Now" products={products} isLoading={isLoading} />
                {/* Reuse ProductGrid for other sections just to populate the page */}
                <ProductGrid title="Just for You" products={[...products].reverse()} isLoading={isLoading} />
            </main>

            <Footer />
        </div>
    );
}
