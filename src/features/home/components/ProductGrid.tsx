import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/api';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/features/cart/slices/cartSlice';
import Link from 'next/link';
import { ProductCardSkeleton } from './skeletons/ProductCardSkeleton';


export default function ProductGrid({ title, products, isLoading }: { title: string, products: Product[], isLoading: boolean }) {
    const dispatch = useAppDispatch();

    if (isLoading) {
        return (
            <section className="mb-20">
                <h2 className="text-2xl font-bold font-display mb-8">{title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array(4).fill(0).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="mb-20">
            <h2 className="text-2xl font-bold font-display mb-8">{title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group bg-white rounded-3xl p-4 transition-all hover:shadow-xl border border-transparent hover:border-gray-100">
                        <Link href={`/product/${product.id}`} className="block relative aspect-square rounded-2xl bg-gray-50 mb-4 overflow-hidden">
                            {product.isNew && (
                                <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
                                    NEW
                                </span>
                            )}
                            {product.originalPrice && (
                                <span className="absolute top-3 left-3 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-full z-10">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                            )}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </Link>

                        <div className="space-y-2">
                            <Link href={`/product/${product.id}`}>
                                <h3 className="font-bold text-lg truncate pr-2 hover:text-primary transition-colors">{product.name}</h3>
                            </Link>
                            <p className="text-sm text-gray-500 truncate">{product.description}</p>

                            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                {Array(5).fill(0).map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                                ))}
                                <span className="text-gray-400 ml-1">({product.reviews})</span>
                            </div>

                            <div className="flex items-center justify-between mt-4 text-black pt-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-xl">₹{product.price.toLocaleString('en-IN')}</span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors active:scale-95 cursor-pointer"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
