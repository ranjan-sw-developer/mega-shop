import mongoose, { Schema, model, models } from 'mongoose';
import { Product, Category } from '@/lib/api'; // Use existing interfaces

// Review Schema
const ReviewSchema = new Schema({
    id: String,
    userName: String,
    rating: Number,
    comment: String,
    date: String,
    avatar: String,
    userId: String, // Added userId to link review
});

// Product Schema
const ProductSchema = new Schema<Product>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    image: { type: String, required: true },
    images: [String],
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isNew: Boolean,
    colors: [String],
    features: [String],
    reviewsList: [ReviewSchema],
    sku: { type: String, unique: true, sparse: true },
    stock: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Draft', 'Low Stock', 'Out of Stock'], default: 'Draft' },
});

// Category Schema
const CategorySchema = new Schema<Category>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    icon: String,
});

// User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Optional for Google users
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: String
}, { timestamps: true });

// Singleton models to prevent overwrite on hot reload
// We delete the model if it exists to ensure new schema changes are picked up during development
if (mongoose.models.Product) {
    delete mongoose.models.Product;
}
if (mongoose.models.Category) {
    delete mongoose.models.Category;
}
if (mongoose.models.User) {
    delete mongoose.models.User;
}

export const ProductModel = model('Product', ProductSchema);
export const CategoryModel = model('Category', CategorySchema);
export const UserModel = model('User', UserSchema);
