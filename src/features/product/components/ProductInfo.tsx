'use client';

import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/slices/cartSlice';

export default function ProductInfo({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#000000');

    const handleAddToCart = () => {
        // In a real app we'd pass quantity and color too
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1 text-yellow-400">
                        {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{product.reviews.toLocaleString()} reviews</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                        <>
                            <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Save ₹{product.originalPrice - product.price}</span>
                        </>
                    )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Free shipping on orders over ₹5000. In stock and ready to ship.</p>
            </div>

            <p className="text-gray-600 leading-relaxed">
                {product.description}
            </p>

            {/* Colors */}
            {product.colors && (
                <div>
                    <h3 className="font-bold text-sm mb-3 uppercase tracking-wide">Color</h3>
                    <div className="flex gap-3">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 ring-1 ring-offset-2 ring-transparent transition-all ${selectedColor === color ? 'ring-gray-300' : ''}`}
                                style={{ backgroundColor: color, borderColor: color === '#F5F5F5' ? '#e5e5e5' : 'transparent' }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center bg-gray-50 rounded-full px-4 w-fit">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:text-black text-gray-500"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-black text-gray-500"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-black font-bold h-12 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-200/50"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>

                <button className="flex-1 bg-black text-white font-bold h-12 rounded-full hover:bg-gray-800 transition-colors">
                    Buy Now
                </button>
            </div>

            {/* Features Accordion Mock */}
            <div className="space-y-2 pt-4">
                <div className="border-t border-gray-100 py-3">
                    <button className="flex items-center justify-between w-full font-bold text-sm">
                        Key Features
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="border-t border-gray-100 py-3">
                    <button className="flex items-center justify-between w-full font-bold text-sm">
                        Shipping & Returns
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
