import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ProductModel, CategoryModel } from '@/lib/models';
import { mockApi } from '@/lib/api';

export async function POST() {
    try {
        await connectToDatabase();

        // Clear existing data
        await ProductModel.deleteMany({});
        await CategoryModel.deleteMany({});

        // Fetch mock data
        const products = await mockApi.getProducts();
        const categories = await mockApi.getCategories();

        // Seed data
        await ProductModel.insertMany(products);
        await CategoryModel.insertMany(categories);

        return NextResponse.json({ message: 'Database seeded successfully', productsCount: products.length });
    } catch (error) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
