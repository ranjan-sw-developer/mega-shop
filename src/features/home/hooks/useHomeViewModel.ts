import { useQuery } from '@tanstack/react-query';
import { homeService } from '../services/homeService';

export const useHomeViewModel = () => {
    const productsQuery = useQuery({
        queryKey: ['products'],
        queryFn: homeService.getProducts,
    });

    const categoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: homeService.getCategories,
    });

    return {
        products: productsQuery.data || [],
        categories: categoriesQuery.data || [],
        isLoading: productsQuery.isLoading || categoriesQuery.isLoading,
        isError: productsQuery.isError || categoriesQuery.isError,
    };
};
