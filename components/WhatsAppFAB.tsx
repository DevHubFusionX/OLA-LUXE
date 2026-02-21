import Image from 'next/image';

export default function WhatsAppFAB() {
    return (
        <a
            href="https://wa.me/2349120491702"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        >
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                width={32}
                height={32}
                className="brightness-0 invert"
            />
        </a>
    );
}
