'use client';

import { ArrowRight, Lock, CreditCard } from 'lucide-react';
import { Product } from '@/lib/api';

export default function OrderSummary({ items }: { items: (Product & { quantity: number })[] }) {
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 0; // Free for now
    const tax = subtotal * 0.08; // 8% mock tax
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold font-display mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>Shipping Estimate</span>
                    <span className="font-medium text-black">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                    <span>Tax Estimate</span>
                    <span className="font-medium text-black">₹{tax.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Promo Code</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 bg-gray-50 border-0 rounded-full px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Enter code"
                    />
                    <button className="bg-gray-100 px-6 py-2 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-colors">
                        Apply
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-100">
                <span className="text-xl font-bold font-display">Order Total</span>
                <span className="text-2xl font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button className="w-full bg-primary text-black font-bold h-14 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-200/50 mb-6 group active:scale-95">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex flex-col items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span className="font-medium">Secure Checkout</span>
                </div>
                <div className="flex gap-2 opacity-50 grayscale">
                    {/* Mock Payment Icons */}
                    <div className="px-2 py-1 bg-gray-100 rounded">VISA</div>
                    <div className="px-2 py-1 bg-gray-100 rounded">MC</div>
                    <div className="px-2 py-1 bg-gray-100 rounded">AMEX</div>
                    <div className="px-2 py-1 bg-gray-100 rounded">PAY</div>
                </div>
            </div>
        </div>
    );
}
