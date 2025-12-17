'use client';

import { useAppSelector } from '@/store/hooks';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import ProductGrid from '@/features/home/components/ProductGrid';
import { useHomeViewModel } from '@/features/home/hooks/useHomeViewModel';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function CartPage() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // Reuse home view model to get some products for "You might also like"
    const { products, isLoading } = useHomeViewModel();

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />

            <main className="container mx-auto px-4 py-8 mb-20">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Shopping Cart</h1>
                <p className="text-gray-500 mb-8">You have {cartCount} items in your cart</p>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Cart Items */}
                        <div className="flex-1 space-y-4">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:w-[400px] shrink-0">
                            <OrderSummary items={cartItems} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <a href="/" className="inline-block bg-primary text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors">
                            Start Shopping
                        </a>
                    </div>
                )}

                {/* Recommendations */}
                <div className="mt-24">
                    <ProductGrid title="You might also like" products={products.slice(0, 4)} isLoading={isLoading} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
