export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: string[];
    category: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    colors?: string[];
    features?: string[];
    reviewsList?: Review[];
}

export interface Category {
    id: string;
    name: string;
    icon?: string;
}

const REVIEWS: Review[] = [
    { id: '1', userName: 'Jane Doe', rating: 5, comment: 'Absolutely amazing sound quality. The noise cancellation is on another level.', date: '2 days ago', avatar: 'JD' },
    { id: '2', userName: 'Mark Smith', rating: 5, comment: 'Great but pricey. These are definitely the best headphones I’ve owned.', date: '1 week ago', avatar: 'MS' },
];

const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise cancellation optimized to you. The WH-1000XM5 headphones feature our new Integrated Processor V1, crystal clear hands-free calling, and up to 30-hour battery life with quick charging.',
        price: 24990.00,
        originalPrice: 29990.00,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500',
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500',
             'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=500',
             'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=500'
        ],
        category: 'Electronics',
        rating: 4.8,
        reviews: 2453,
        colors: ['#000000', '#F5F5F5', '#1F1F39'],
        features: [
            'Industry-leading noise cancellation',
            'Up to 30-hour battery life',
            'Crystal clear hands-free calling',
            'Integrated Processor V1',
            'Ultra-comfortable, lightweight design'
        ],
        reviewsList: REVIEWS,
    },
    {
        id: '2',
        name: 'Nike Air Zoom Pegasus',
        description: "Men's Road Running Shoes",
        price: 9995.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500'],
        category: 'Fashion',
        rating: 4.5,
        reviews: 120,
        isNew: true,
    },
    {
        id: '3',
        name: 'Polaroid Now+',
        description: 'i-Type Instant Camera',
        price: 12999.00,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=500'],
        category: 'Electronics',
        rating: 4.7,
        reviews: 85,
    },
    {
        id: '4',
        name: 'MacBook Air M2',
        description: '13.6-inch Liquid Retina Display',
        price: 99900.00,
        image: 'https://icentralstore.in/wp-content/uploads/2024/07/mba13-m2-midnight-gallery1-202402-scaled.jpg',
        images: ['https://icentralstore.in/wp-content/uploads/2024/07/mba13-m2-midnight-gallery1-202402-scaled.jpg'],
        category: 'Electronics',
        rating: 4.9,
        reviews: 2100,
    },
    {
        id: '5',
        name: 'Apple Watch Series 9',
        description: 'Smartwatch with multiple bands',
        price: 34900.00,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500'],
        category: 'Electronics',
        rating: 4.6,
        reviews: 320,
    },
    {
        id: '6',
        name: 'Dell UltraSharp 27"',
        description: '4K USB-C Monitor',
        price: 38500.00,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500',
        images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500'],
        category: 'Electronics',
        rating: 4.5,
        reviews: 89,
    },
];

const CATEGORIES: Category[] = [
    { id: '1', name: 'Mobiles' },
    { id: '2', name: 'Fashion' },
    { id: '3', name: 'Home' },
    { id: '4', name: 'Beauty' },
    { id: '5', name: 'Appliances' },
    { id: '6', name: 'Toys' },
];

export const mockApi = {
    getProducts: async (): Promise<Product[]> => {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return PRODUCTS;
    },
    getProduct: async (id: string): Promise<Product | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return PRODUCTS.find((p) => p.id === id);
    },
    getCategories: async (): Promise<Category[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return CATEGORIES;
    },
};
