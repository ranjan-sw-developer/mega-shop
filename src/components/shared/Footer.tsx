import { Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="font-bold text-sm">MS</span>
                            </div>
                            <span className="text-xl font-bold">MegaShop</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your one-stop destination for everything you need. Quality products, fast delivery, and exceptional support.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Deals</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Electronics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Order Status</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Stay Updated</h4>
                        <p className="text-gray-500 text-sm mb-4">Subscribe to get special offers and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors">
                                <span className="sr-only">Subscribe</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© 2025 MegaShop Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Facebook className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
                        <Twitter className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
                        <Instagram className="w-5 h-5 hover:text-gray-600 cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
