// components/HeroSection.jsx
import React from 'react';
import { useTheme } from '../ThemeContext';
import Button from './Button';

const HeroSection = () => {
    const theme = useTheme();

    return (
        <section 
            className="py-16 px-4 text-center"
            style={{ backgroundColor: theme.colors.primary }}
        >
            <div className="container mx-auto max-w-4xl">
                <h1 
                    className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
                >
                    Kuotaku
                </h1>
                <p className="text-xl text-white opacity-90 mb-4">
                    Website Jual Paket Data Internet Terlengkap dan Termurah
                </p>
                <p className="text-lg text-white opacity-80 mb-8 max-w-2xl mx-auto">
                    Dapatkan berbagai paket data internet dari semua provider dengan harga terbaik. 
                    Proses cepat, aman, dan terpercaya untuk semua kebutuhan internet Anda.
                </p>
                <Button 
                    type="accent" 
                    size="lg"
                    className="mx-auto transform hover:scale-105 transition-transform duration-300"
                >
                    Beli Paket Sekarang
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;