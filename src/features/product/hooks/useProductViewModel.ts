import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProductViewModel = (id: string) => {
    const productQuery = useQuery({
        queryKey: ['product', id],
        queryFn: () => productService.getProduct(id),
        enabled: !!id,
    });

    const relatedQuery = useQuery({
        queryKey: ['related_products', id],
        queryFn: productService.getRelatedProducts,
    });

    return {
        product: productQuery.data,
        relatedProducts: relatedQuery.data || [],
        isLoading: productQuery.isLoading || relatedQuery.isLoading,
        isError: productQuery.isError || relatedQuery.isError,
    };
};
