// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Footer = () => {
    const theme = useTheme();

    return (
        <footer 
            className="bg-gray-800 text-white py-8 mt-auto"
            style={{ backgroundColor: theme.colors.text }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold" style={{ color: theme.colors.secondary }}>
                            Kuotaku
                        </h3>
                        <p className="text-gray-300 mt-2">Website jual paket data internet terpercaya</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            Tentang Kami
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            Kontak
                        </Link>
                        <Link to="/privacy" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            Kebijakan Privasi
                        </Link>
                        <Link to="/terms" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                            Syarat & Ketentuan
                        </Link>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6 text-center">
                    <p className="text-gray-400">
                        &copy; 2024 Kuotaku. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;