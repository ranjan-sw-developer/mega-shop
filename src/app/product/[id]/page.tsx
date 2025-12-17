import ProductDetailsPage from '@/features/product/components/ProductDetailsPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductDetailsPage id={id} />;
}
