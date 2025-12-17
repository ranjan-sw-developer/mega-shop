'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

const SLIDES = [
    {
        id: 1,
        title: <>Refresh Your <br /> Wardrobe with <br /> Style.</>,
        description: 'Get up to 50% off on the latest summer collection. Limited time offers on top brands.',
        tag: 'Summer Sale',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000',
        cta: 'Shop Fashion',
        link: '/#fashion'
    },
    {
        id: 2,
        title: <>Next Gen Tech <br /> for Creators.</>,
        description: 'Upgrade your workshop with premium audio gear. Experience sound like never before.',
        tag: 'New Arrival',
        image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&q=80&w=2000',
        cta: 'Explore Gear',
        link: '/#electronics'
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden mb-12 group">
            <div
                className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {SLIDES.map((slide) => (
                    <div key={slide.id} className="relative w-full h-full shrink-0">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${slide.image}")` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                        <div className="relative h-full container mx-auto px-8 flex flex-col justify-center z-10">
                            <div className="max-w-2xl text-white">
                                <span className="inline-block px-4 py-2 bg-primary text-black font-bold text-xs rounded-full mb-6 w-fit uppercase tracking-wider animate-fade-in">
                                    {slide.tag}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-display">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg font-light">
                                    {slide.description}
                                </p>

                                <button className="group/btn bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 w-fit hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                                    {slide.cta}
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={clsx(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            currentSlide === index ? "w-8 bg-primary" : "bg-white/50 hover:bg-white"
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
