import { Product } from '@/lib/api';

export const productService = {
    getProduct: async (id: string): Promise<Product | undefined> => {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) return undefined;
        return res.json();
    },
    getRelatedProducts: async (): Promise<Product[]> => {
        const res = await fetch('/api/products?status=Active');
        if (!res.ok) return [];
        const data = await res.json();
        // Handle both legacy array (if any) and new object structure
        const products = Array.isArray(data) ? data : (data.products || []);
        return products.slice(0, 4);
    },
    searchProducts: async (query: string): Promise<Product[]> => {
        const res = await fetch(`/api/products?search=${encodeURIComponent(query)}&status=Active`);
        if (!res.ok) throw new Error('Failed to search products');
        const data = await res.json();
        return data.products || [];
    },
};
