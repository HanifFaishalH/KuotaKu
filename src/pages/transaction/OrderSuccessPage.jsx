import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Package } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import Button from '../../components/Button';

const OrderSuccessPage = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { order, package: packageItem } = location.state || {};

    if (!order || !packageItem) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Data order tidak ditemukan</p>
                    <Button 
                        onClick={() => navigate('/packages')}
                        className="mt-4"
                    >
                        Kembali ke Paket
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="text-green-600" size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Pembayaran Berhasil!
                    </h1>
                    <p className="text-gray-600">
                        Paket data Anda akan segera aktif dalam beberapa menit
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Detail Order</h2>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Order ID</span>
                            <span className="font-mono font-semibold">{order.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Paket</span>
                            <span className="font-semibold">{order.packageName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Nomor Tujuan</span>
                            <span>{order.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Pembayaran</span>
                            <span className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                                Rp {order.price.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status</span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                Berhasil
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tanggal</span>
                            <span>{new Date(order.orderDate).toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-3">Yang Harus Dilakukan Selanjutnya:</h3>
                    <ul className="text-blue-700 space-y-2 text-sm">
                        <li>• Tunggu SMS konfirmasi dari provider dalam 1-5 menit</li>
                        <li>• Pastikan nomor tujuan aktif dan dalam jangkauan sinyal</li>
                        <li>• Restart device jika paket belum aktif dalam 15 menit</li>
                        <li>• Hubungi customer service jika mengalami kendala</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button
                        type="secondary"
                        icon={Download}
                        className="w-full"
                    >
                        Download Invoice
                    </Button>
                    <Button
                        type="primary"
                        icon={Package}
                        className="w-full"
                        onClick={() => navigate('/packages')}
                    >
                        Beli Lagi
                    </Button>
                    <Button
                        type="accent"
                        icon={Home}
                        className="w-full"
                        onClick={() => navigate('/dashboard')}
                    >
                        Ke Dashboard
                    </Button>
                </div>

                {/* Support Info */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 text-sm">
                        Butuh bantuan?{' '}
                        <Link to="/help" className="font-medium hover:underline" style={{ color: theme.colors.primary }}>
                            Hubungi Customer Service
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;