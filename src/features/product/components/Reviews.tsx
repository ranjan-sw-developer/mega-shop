'use client';

import { Star } from 'lucide-react';
import { Product } from '@/lib/api';

export default function Reviews({ product }: { product: Product }) {
    if (!product.reviewsList) return null;

    return (
        <section className="mb-20">
            <h2 className="text-2xl font-bold font-display mb-8">Customer Reviews</h2>

            <div className="bg-white rounded-3xl p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Summary */}
                    <div className="w-full md:w-1/3">
                        <div className="flex items-end gap-4 mb-2">
                            <span className="text-6xl font-bold font-display">{product.rating}</span>
                            <div className="mb-2">
                                <div className="flex gap-1 text-yellow-400 mb-1">
                                    {Array(5).fill(0).map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500">Based on {product.reviews.toLocaleString()} reviews</p>
                            </div>
                        </div>

                        <div className="space-y-2 mt-6">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-3 text-xs">
                                    <span className="w-2">{star}</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: star === 5 ? '78%' : star === 4 ? '15%' : '5%' }}
                                        />
                                    </div>
                                    <span className="w-8 text-right text-gray-400">{star === 5 ? '78%' : star === 4 ? '15%' : '5%'}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 border border-black rounded-full h-10 font-bold text-sm hover:bg-black hover:text-white transition-colors">
                            Write a Review
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 space-y-8">
                        {product.reviewsList.map((review) => (
                            <div key={review.id} className="bg-gray-50 p-6 rounded-2xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                            {review.avatar || review.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{review.userName}</h4>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                {Array(5).fill(0).map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                </div>
                                <h5 className="font-bold text-sm mb-2">Great experience</h5>
                                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
