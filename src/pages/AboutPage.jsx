// pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
    return (
        <div className="py-8 max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Tentang Kuotaku</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Platform terpercaya untuk pembelian paket data internet dengan pengalaman terbaik
                </p>
            </div>

            {/* Deskripsi Perusahaan */}
            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center text-purple-600">Mengenal Kuotaku</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        <strong>Kuotaku</strong> adalah platform digital inovatif yang didedikasikan untuk memenuhi kebutuhan internet masyarakat Indonesia. 
                        Sejak berdiri, kami berkomitmen untuk menyediakan akses internet yang terjangkau, cepat, dan andal bagi semua kalangan.
                    </p>
                    <p>
                        Dalam era digital yang terus berkembang, Kuotaku hadir sebagai solusi praktis bagi mereka yang membutuhkan 
                        koneksi internet stabil untuk bekerja, belajar, berbisnis, atau sekadar berkomunikasi dengan keluarga dan teman.
                    </p>
                    <p>
                        Kami memahami bahwa setiap pengguna memiliki kebutuhan yang berbeda-beda. Oleh karena itu, Kuotaku menyediakan 
                        beragam pilihan paket data dari semua provider ternama di Indonesia, dengan fleksibilitas masa aktif yang dapat 
                        disesuaikan dengan budget dan kebutuhan Anda.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-purple-600">Visi Kami</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Menjadi platform terdepan dalam penyediaan paket data internet 
                        yang terjangkau dan berkualitas untuk seluruh masyarakat Indonesia, 
                        mendukung terciptanya masyarakat digital yang inklusif dan produktif.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-purple-600">Misi Kami</h3>
                    <ul className="text-gray-600 space-y-2">
                        <li>• Menyediakan berbagai pilihan paket data dari semua provider dengan harga kompetitif</li>
                        <li>• Memastikan proses transaksi yang cepat, aman, dan transparan</li>
                        <li>• Memberikan pelayanan customer service yang responsif dan solutif</li>
                        <li>• Terus berinovasi dalam menghadirkan fitur-fitur yang memudahkan pengguna</li>
                    </ul>
                </div>
            </div>

            {/* Nilai-nilai Perusahaan */}
            <div className="bg-gray-50 p-8 rounded-lg mb-12">
                <h3 className="text-2xl font-semibold mb-8 text-center">Nilai-nilai Kuotaku</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🤝</span>
                        </div>
                        <h4 className="font-semibold mb-3">Terpercaya</h4>
                        <p className="text-sm text-gray-600">Setiap transaksi dijamin keamanannya dengan sistem yang terpercaya</p>
                    </div>
                    <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h4 className="font-semibold mb-3">Cepat</h4>
                        <p className="text-sm text-gray-600">Proses instan dengan pengiriman paket data dalam hitungan menit</p>
                    </div>
                    <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💎</span>
                        </div>
                        <h4 className="font-semibold mb-3">Berkualitas</h4>
                        <p className="text-sm text-gray-600">Hanya menyediakan paket data resmi dengan kualitas terbaik</p>
                    </div>
                    <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">❤️</span>
                        </div>
                        <h4 className="font-semibold mb-3">Peduli</h4>
                        <p className="text-sm text-gray-600">Selalu mendengarkan dan merespons kebutuhan setiap pelanggan</p>
                    </div>
                </div>
            </div>

            {/* Layanan Unggulan */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-8 text-center text-purple-600">Layanan Unggulan Kuotaku</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📱</span>
                        </div>
                        <h4 className="font-semibold mb-2">Semua Provider</h4>
                        <p className="text-sm text-gray-600">Telkomsel, Indosat, XL, Axis, Smartfren, dan provider lainnya</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h4 className="font-semibold mb-2">Garansi 100%</h4>
                        <p className="text-sm text-gray-600">Jaminan uang kembali jika paket tidak aktif sesuai ketentuan</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💬</span>
                        </div>
                        <h4 className="font-semibold mb-2">Support 24/7</h4>
                        <p className="text-sm text-gray-600">Tim customer service siap membantu kapan saja Anda butuhkan</p>
                    </div>
                </div>
            </div>

            {/* Penutup */}
            <div className="text-center mt-12 p-6 bg-purple-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Bergabung dengan Ribuan Pelanggan Puas</h3>
                <p className="text-gray-600 mb-4">
                    Sudah lebih dari 50.000 pengguna mempercayakan kebutuhan internet mereka kepada Kuotaku. 
                    Mari bergabung dan rasakan kemudahan berinternet tanpa khawatir.
                </p>
                <p className="text-lg font-medium text-purple-600">
                    Kuotaku - Internet Mudah, Hidup Lebih Mudah!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;