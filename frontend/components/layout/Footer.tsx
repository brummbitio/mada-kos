import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
export const Footer = () => {
    return (
        <footer className="bg-primary-violet text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-40 h-10 overflow-hidden">
                            <Image
                                src="/assets/logo-hospitality.png" // Ganti dengan path logo kamu (misal logo-only.png)
                                alt="Mada Logo"
                                fill
                                className="object-contain" // Menjaga proporsi gambar agar tidak gepeng
                                priority
                            />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-neutral-300">Contact Us</span>
                        </div>
                        <a href="mailto:officialmada.id@gmail.com" className="flex items-center gap-3 hover:text-primary-yellow transition-colors">
                            <Mail size={18} />
                            <span className="text-sm">officialmada.id@gmail.com</span>
                        </a>
                        <a href="tel:+6282337777452" className="flex items-center gap-3 hover:text-primary-yellow transition-colors">
                            <Phone size={18} />
                            <span className="text-sm">+62 8233-7777-452</span>
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} Mada Hospitality. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
