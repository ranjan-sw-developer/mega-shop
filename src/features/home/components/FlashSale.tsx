import { ArrowRight } from 'lucide-react';

export default function FlashSale() {
    return (
        <section className="relative rounded-3xl bg-primary overflow-hidden mb-20 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-300/30 rounded-l-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-black text-primary font-bold text-[10px] rounded-sm mb-4 uppercase tracking-widest">
                        Limited Time
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">Flash Sale Ends Soon!</h2>
                    <p className="text-lg font-medium opacity-80 mb-8">Save up to 70% on select electronics and accessories.</p>

                    <div className="flex gap-4 mb-8">
                        <TimeBox val="02" label="HRS" />
                        <TimeBox val="45" label="MIN" />
                        <TimeBox val="12" label="SEC" />
                    </div>
                </div>

                <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-900 transition-all hover:scale-105 shadow-xl">
                    View All Deals
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}

function TimeBox({ val, label }: { val: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl border border-black/5">
            <span className="text-2xl font-bold">{val}</span>
            <span className="text-[10px] uppercase font-bold opacity-60">{label}</span>
        </div>
    );
}
