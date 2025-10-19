import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="text-red-600" size={48} />
                </div>

                {/* Content */}
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-600 mb-8">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan. 
                    Mungkin halaman telah dipindahkan atau alamat URL tidak valid.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </button>
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Home size={18} />
                        Ke Beranda
                    </Link>
                </div>

                {/* Additional Help */}
                <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                        Butuh bantuan?{' '}
                        <Link to="/about" className="text-purple-600 hover:text-purple-700 font-medium">
                            Hubungi Support
                        </Link>
                    </p>
                </div>

                {/* Quick Links */}
                <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-3">Halaman yang mungkin Anda cari:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Link to="/packages" className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                            Paket Data
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/about" className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                            Tentang Kami
                        </Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/login" className="text-sm text-purple-600 hover:text-purple-700 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;