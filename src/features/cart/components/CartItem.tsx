'use client';

import { Minus, Plus, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';

interface CartItemProps {
    item: Product & { quantity: number };
}

export default function CartItem({ item }: CartItemProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
            {/* Image */}
            <Link href={`/product/${item.id}`} className="shrink-0">
                <div className="w-full sm:w-32 aspect-square rounded-2xl bg-gray-50 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </Link>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                        <Link href={`/product/${item.id}`}>
                            <h3 className="font-bold text-lg hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        <span className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-1">Color: Matte Black</p>
                    <p className="text-sm text-gray-500 mb-3">Size: One Size</p>

                    <div className="flex items-center gap-2 text-green-600 text-xs font-bold mb-4">
                        <CheckCircle className="w-4 h-4" />
                        <span>In Stock</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center bg-gray-50 rounded-full h-10 px-2">
                        <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-full transition-all"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-full transition-all"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        <button className="text-gray-500 hover:text-black underline decoration-gray-300 underline-offset-4">
                            Save for later
                        </button>
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
