import { Skeleton } from '@/components/ui/Skeleton';

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl p-4 border border-transparent">
            {/* Image Skeleton */}
            <Skeleton className="w-full aspect-square rounded-2xl mb-4" />

            <div className="space-y-2">
                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4" />

                {/* Description Skeleton */}
                <Skeleton className="h-4 w-full" />

                {/* Rating Skeleton */}
                <div className="flex gap-1 py-1">
                    <Skeleton className="h-3 w-20" />
                </div>

                {/* Price and Button Skeleton */}
                <div className="flex items-center justify-between mt-4 pt-2">
                    <div className="flex items-baseline gap-2">
                        <Skeleton className="h-7 w-24" />
                    </div>
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
            </div>
        </div>
    );
}
