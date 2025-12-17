import { useQuery } from '@tanstack/react-query';
import { productService } from '@/features/product/services/productService';
import { useSearchParams } from 'next/navigation';

export const useSearchViewModel = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('search') || '';

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['search', query],
        queryFn: () => productService.searchProducts(query),
        enabled: !!query,
    });

    return {
        query,
        products,
        isLoading,
        error
    };
};
