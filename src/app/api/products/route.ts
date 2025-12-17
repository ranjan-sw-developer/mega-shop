import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ProductModel } from '@/lib/models';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        await connectToDatabase();

        let query: any = {};

        if (search) {
            const regex = new RegExp(search, 'i');
            query.$or = [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { sku: { $regex: regex } }
            ];
        }

        if (category && category !== 'All Categories') {
            query.category = category;
        }

        if (status && status !== 'All Status') {
            query.status = status;
        }

        const products = await ProductModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await ProductModel.countDocuments(query);

        return NextResponse.json({
            products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();

        if (!data.name || !data.price) {
            return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
        }

        const id = data.sku || Math.random().toString(36).substr(2, 9);

        const newProduct = await ProductModel.create({
            ...data,
            id,
            reviews: 0,
            rating: 0,
            reviewsList: []
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
