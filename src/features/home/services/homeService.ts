import { Product, Category } from '@/lib/api';

export const homeService = {
    getProducts: async (): Promise<Product[]> => {
        // Only fetch Active products for the user-facing home page
        const res = await fetch('/api/products?status=Active');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        return data.products || [];
    },
    getCategories: async (): Promise<Category[]> => {
        // We haven't created /api/categories yet, let's stick to mock for categories or create it.
        // For now, let's just return hardcoded or creating API.
        // Actually, I'll create the route next.
        // Let's assume /api/categories exists or I'll create it now.
        // To be safe and sequential, I'll mock it here or create route.
        // Better: I will use mock for categories for one more step or update this after creating route.
        // Let's just create the route first in next step.
        // For this file, I'll point to API and fail if not ready?
        // Let's keep mock for categories for a moment to avoid break, or better:
        // I already seeded categories. I should create the route.
        // I'll stick to mockApi.getCategories for strict safety until route exists.
        const { mockApi } = await import('@/lib/api');
        return mockApi.getCategories();
    }
};
