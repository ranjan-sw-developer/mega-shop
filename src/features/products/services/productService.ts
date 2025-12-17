import axios from 'axios';
import { Product } from '@/lib/api';

// Extend Product type if needed locally or assume API returns extended fields
// Ideally this should be in a shared types file, but for now:
export interface ProductResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface ProductParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
}

export const productService = {
    getProducts: async (params: ProductParams): Promise<ProductResponse> => {
        const response = await axios.get('/api/products', { params });
        return response.data;
    },

    // Get single product
    getProduct: async (id: string) => {
        const response = await axios.get(`/api/products/${id}`);
        return response.data;
    },

    // Create product
    createProduct: async (data: any) => {
        const response = await axios.post('/api/products', data);
        return response.data;
    },

    // Update product
    updateProduct: async (id: string, data: any) => {
        const response = await axios.put(`/api/products/${id}`, data);
        return response.data;
    },

    // Delete product
    deleteProduct: async (id: string) => {
        const response = await axios.delete(`/api/products/${id}`);
        return response.data;
    }
};
