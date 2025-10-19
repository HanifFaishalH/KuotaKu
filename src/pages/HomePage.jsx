// pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const HomePage = () => {
    return (
        <div className="py-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Selamat Datang di Kuotaku
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Temukan paket data internet terbaik dari semua provider dengan harga spesial. 
                    Tidak perlu login untuk melihat-lihat paket yang tersedia!
                </p>
                <Link to="/packages">
                    <Button type="primary" size="lg">
                        Lihat Semua Paket
                    </Button>
                </Link>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Semua Provider</h3>
                    <p className="text-gray-600">Telkomsel, Indosat, XL, Tri, dan banyak lagi</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
                    <p className="text-gray-600">Harga kompetitif dengan kualitas terbaik</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Proses Instan</h3>
                    <p className="text-gray-600">Paket aktif dalam hitungan menit</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;