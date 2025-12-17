'use client';

import { useForm } from 'react-hook-form';
import { Save, Upload, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    isSubmitting?: boolean;
    buttonLabel?: string;
}

export default function ProductForm({ initialData, onSubmit, isSubmitting, buttonLabel = 'Save Product' }: ProductFormProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialData || {
            stock: 0,
            price: 0,
            status: 'Draft',
            category: 'Electronics'
        }
    });

    const [mediaUrl, setMediaUrl] = useState(initialData?.image || '');

    // Update form when initialData loads (for edit mode)
    useEffect(() => {
        if (initialData) {
            reset(initialData);
            setMediaUrl(initialData.image || '');
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data: any) => {
        // Enforce types and handle specific fields
        const formattedData = {
            ...data,
            price: parseFloat(data.price),
            originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
            stock: parseInt(data.stock) || 0,
            sku: data.sku && data.sku.trim() !== '' ? data.sku.trim() : undefined, // Send undefined if empty to avoid unique index error
            image: mediaUrl || '/images/products/placeholder.jpg',
            images: mediaUrl ? [mediaUrl] : [],
        };

        // Remove _id if it exists to prevent 'immutable field' errors during updates
        if (formattedData._id) {
            delete formattedData._id;
        }

        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Information */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">General Information</h2>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                placeholder="e.g. Wireless Headphones Pro"
                                className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                            />
                            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                {...register('description', { required: true })}
                                rows={6}
                                placeholder="Product description..."
                                className="w-full p-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm resize-none"
                            ></textarea>
                            {errors.description && <span className="text-red-500 text-xs">Description is required</span>}
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Media</h2>
                            <button type="button" className="text-sm text-blue-600 font-medium hover:underline">Download all</button>
                        </div>

                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                            {mediaUrl ? (
                                <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setMediaUrl('')}
                                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-red-50 text-red-500"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900">Click to upload or drag and drop</h3>
                                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>

                                    {/* Temporary URL Input fallback since no real upload */}
                                    <div className="mt-4 w-full max-w-sm">
                                        <input
                                            type="text"
                                            placeholder="Or paste image URL here..."
                                            value={mediaUrl}
                                            onChange={(e) => setMediaUrl(e.target.value)}
                                            className="w-full h-9 px-3 text-xs border border-gray-200 rounded-lg"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">Inventory</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">SKU</label>
                                <input
                                    {...register('sku')}
                                    type="text"
                                    placeholder="e.g. PROD-001"
                                    className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                                <input
                                    {...register('stock', { required: true, min: 0 })}
                                    type="number"
                                    placeholder="0"
                                    className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</h2>
                        <select
                            {...register('status')}
                            className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                        >
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs text-gray-500">Product will be visible in store.</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pricing</h2>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    {...register('price', { required: true, min: 0 })}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full h-11 pl-8 pr-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Compare at Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    {...register('originalPrice')}
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full h-11 pl-8 pr-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium"
                                />
                            </div>
                            <p className="text-xs text-gray-400">Add a higher price to show a discount.</p>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Organization</h2>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                {...register('category')}
                                className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                            >
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home & Garden">Home & Garden</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tags</label>
                            <input
                                type="text"
                                placeholder="e.g. wireless, sale"
                                className="w-full h-11 px-4 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
                        >
                            <Save className="w-4 h-4" />
                            {isSubmitting ? 'Saving...' : buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
