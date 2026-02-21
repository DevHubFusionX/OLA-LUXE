import Image from 'next/image';

export default function WhatsAppFAB() {
    return (
        <a
            href="https://wa.me/2349120491702"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 group flex items-center gap-3 z-50"
        >
            <div className="bg-white/80 backdrop-blur-sm border border-anchor-espresso/10 py-2 px-4 rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-deep-charcoal">Chat with us</p>
            </div>
            <div className="w-14 h-14 bg-cta-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ring-4 ring-cta-whatsapp/20">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    width={30}
                    height={30}
                    className="brightness-0 invert"
                />
            </div>
        </a>
    );
}
