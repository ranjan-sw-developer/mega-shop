/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function ImageGallery({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={cn(
                            "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                            selectedImage === img ? "border-primary" : "border-transparent hover:border-gray-200"
                        )}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
                {/* Play Button Mock */}
                <button className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-transparent hover:border-gray-200 text-gray-400">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-square md:aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden relative">
                <img
                    src={selectedImage}
                    alt="Product View"
                    className="w-full h-full object-contain p-8 mix-blend-multiply"
                />
                <span className="absolute top-4 left-4 bg-primary text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    Best Seller
                </span>
            </div>
        </div>
    );
}
