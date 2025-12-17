import { Skeleton } from '@/components/ui/Skeleton';

export function ProductDetailsSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 animate-in fade-in duration-500">
            {/* Gallery Skeleton */}
            <div className="space-y-4">
                <Skeleton className="w-full aspect-square rounded-3xl" />
                <div className="flex gap-4 overflow-hidden">
                    <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                    <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                    <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
                </div>
            </div>

            {/* Info Skeleton */}
            <div className="space-y-8">
                <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-3/4 mb-4" />
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-12 w-32 rounded-full" />
                        <Skeleton className="h-12 w-32 rounded-full" />
                    </div>
                </div>

                <div className="py-6 border-y border-gray-100 space-y-4">
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <div className="flex gap-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Skeleton className="w-32 h-14 rounded-full" />
                    <Skeleton className="flex-1 h-14 rounded-full" />
                </div>

                <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );
}
