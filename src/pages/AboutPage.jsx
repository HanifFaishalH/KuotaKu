// pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
    return (
        <div className="py-8 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Tentang Kuotaku</h2>
                <p className="text-lg text-gray-600">
                    Platform terpercaya untuk pembelian paket data internet
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Visi Kami</h3>
                    <p className="text-gray-600">
                        Menjadi platform terdepan dalam penyediaan paket data internet 
                        yang terjangkau dan berkualitas untuk seluruh masyarakat Indonesia.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Misi Kami</h3>
                    <p className="text-gray-600">
                        Menyediakan berbagai pilihan paket data dari semua provider 
                        dengan proses yang cepat, aman, dan transparan.
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Kenapa Memilih Kuotaku?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <h4 className="font-semibold mb-2">Proses Cepat</h4>
                        <p className="text-sm text-gray-600">Paket aktif dalam hitungan menit</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h4 className="font-semibold mb-2">Aman & Terpercaya</h4>
                        <p className="text-sm text-gray-600">Transaksi aman dengan garansi</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h4 className="font-semibold mb-2">Support 24/7</h4>
                        <p className="text-sm text-gray-600">Customer service siap membantu</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;