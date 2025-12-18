import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 text-center">
            <div className="flex h-full w-full max-w-md flex-col items-center gap-8">
                {/* Abstract Icon/Illustration Placeholder */}
                <div className="relative mb-4 flex items-center justify-center">
                    <div className="absolute h-32 w-32 animate-pulse rounded-full bg-primary/10 blur-2xl md:h-48 md:w-48" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-secondary/5 shadow-inner md:h-32 md:w-32">
                        <AlertCircle className="h-12 w-12 text-primary md:h-16 md:w-16" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl font-display">
                        404
                    </h1>
                    <h2 className="text-xl font-medium text-foreground/80 md:text-2xl">
                        Page Not Found
                    </h2>
                    <p className="text-sm text-foreground/60 md:text-base">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed, renamed, or doesn&apos;t exist.
                    </p>
                </div>

                {/* Action Button */}
                <Link
                    href="/"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                >
                    <div className="absolute inset-0 bg-white/20 transition-transform duration-300 group-hover:scale-105" />
                    <span className="relative flex items-center gap-2">
                        <Home className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        Return Home
                    </span>
                </Link>
            </div>
        </div>
    );
}
