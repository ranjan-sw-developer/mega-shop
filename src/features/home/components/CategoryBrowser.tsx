import { Smartphone, Shirt, Home as HomeIcon, Watch, Monitor, Car } from 'lucide-react';

const CATEGORIES = [
    { id: '1', name: 'Mobiles', icon: Smartphone },
    { id: '2', name: 'Fashion', icon: Shirt },
    { id: '3', name: 'Home', icon: HomeIcon },
    { id: '4', name: 'Beauty', icon: Watch }, // Using Watch as proxy for Accessories/Beauty
    { id: '5', name: 'Appliances', icon: Monitor }, // Proxy
    { id: '6', name: 'Toys', icon: Car },
];

export default function CategoryBrowser() {
    return (
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">Browse Categories</h2>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1">
                    View All <span aria-hidden="true">&rarr;</span>
                </a>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-full hover:border-black hover:shadow-lg transition-all min-w-max group"
                        >
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                            <span className="font-medium text-gray-700 group-hover:text-black">{cat.name}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
