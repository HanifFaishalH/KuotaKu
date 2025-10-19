// pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Wallet, Shield, CheckCircle } from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { ordersAPI, usersAPI, transactionsAPI } from '../../services/api';
import Button from '../../components/Button';

const CheckoutPage = ({ user }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const packageItem = location.state?.packageItem;
    
    const [formData, setFormData] = useState({
        phoneNumber: user?.phone || '',
        paymentMethod: 'balance',
    });
    const [loading, setLoading] = useState(false);
    const [userBalance, setUserBalance] = useState(user?.balance || 0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!packageItem) {
            navigate('/packages');
        }
        
        // Update user balance dari props user
        if (user && user.balance) {
            setUserBalance(user.balance);
        }
    }, [packageItem, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // Check if user has sufficient balance for balance payment
            if (formData.paymentMethod === 'balance' && userBalance < packageItem.price) {
                setErrors({ 
                    payment: 'Saldo tidak cukup. Silakan top up atau pilih metode pembayaran lain.' 
                });
                setLoading(false);
                return;
            }

            // Create order
            const orderData = {
                userId: user.id,
                productId: packageItem.id,
                packageName: `${packageItem.title} - ${packageItem.provider}`,
                provider: packageItem.provider,
                price: packageItem.price,
                phoneNumber: formData.phoneNumber,
                paymentMethod: formData.paymentMethod,
                status: 'pending'
            };

            const newOrder = await ordersAPI.create(orderData);

            // Process payment based on method
            if (formData.paymentMethod === 'balance') {
                // Deduct from balance menggunakan usersAPI
                await usersAPI.updateUser(user.id, {
                    ...user,
                    balance: userBalance - packageItem.price
                });

                // Update order status to completed
                await ordersAPI.updateStatus(newOrder.id, 'completed');

                // Create transaction record
                await transactionsAPI.create({
                    userId: user.id,
                    type: 'purchase',
                    amount: -packageItem.price,
                    status: 'completed',
                    orderId: newOrder.id
                });

                // Navigate to success page
                navigate('/order-success', { 
                    state: { 
                        order: { ...newOrder, status: 'completed' },
                        package: packageItem
                    } 
                });
            } else {
                // For other payment methods, redirect to payment pending
                navigate('/payment-pending', { 
                    state: { 
                        order: newOrder,
                        package: packageItem
                    } 
                });
            }

        } catch (error) {
            console.error('Checkout error:', error);
            setErrors({ 
                general: 'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Nomor telepon harus diisi';
        } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Format nomor telepon tidak valid';
        }

        if (!formData.paymentMethod) {
            newErrors.payment = 'Pilih metode pembayaran';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'phoneNumber') {
            const digits = value.replace(/\D/g, '');
            let formatted = digits;
            if (digits.length > 4) {
                formatted = digits.replace(/(\d{4})(\d{4})/, '$1-$2');
            }
            if (digits.length > 8) {
                formatted = digits.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
            }
            
            setFormData({
                ...formData,
                [name]: formatted
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (!packageItem) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Data paket tidak ditemukan</p>
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
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate('/packages')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                        <p className="text-gray-600">Lengkapi data untuk pembelian paket data</p>
                    </div>
                </div>

                {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {errors.general}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Package Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Ringkasan Paket</h2>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div 
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                        style={{ backgroundColor: getProviderColor(packageItem.provider) }}
                                    >
                                        {packageItem.provider.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {packageItem.title} - {packageItem.provider}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{packageItem.quota}</p>
                                        <p className="text-gray-600 text-sm">Masa aktif: {packageItem.validity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                                            {formatPrice(packageItem.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Number Input */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Nomor Tujuan</h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nomor Telepon *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                                            errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="0812-3456-7890"
                                        disabled={loading}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
                                
                                {/* Balance Option */}
                                <div className="mb-4">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="balance"
                                            checked={formData.paymentMethod === 'balance'}
                                            onChange={handleChange}
                                            className="text-purple-600 focus:ring-purple-500"
                                        />
                                        <Wallet className="text-purple-600" size={20} />
                                        <div className="flex-1">
                                            <p className="font-medium">Saldo Kuotaku</p>
                                            <p className="text-sm text-gray-600">
                                                Saldo tersedia: {formatPrice(userBalance)}
                                            </p>
                                        </div>
                                        {formData.paymentMethod === 'balance' && userBalance < packageItem.price && (
                                            <span className="text-red-600 text-sm font-medium">
                                                Saldo tidak cukup
                                            </span>
                                        )}
                                    </label>
                                </div>

                                {/* Other Payment Methods */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bank_transfer"
                                            checked={formData.paymentMethod === 'bank_transfer'}
                                            onChange={handleChange}
                                            className="text-purple-600 focus:ring-purple-500"
                                        />
                                        <CreditCard className="text-blue-600" size={20} />
                                        <div>
                                            <p className="font-medium">Transfer Bank</p>
                                            <p className="text-sm text-gray-600">BNI, BCA, Mandiri, BRI</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="ewallet"
                                            checked={formData.paymentMethod === 'ewallet'}
                                            onChange={handleChange}
                                            className="text-purple-600 focus:ring-purple-500"
                                        />
                                        <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">$</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">E-Wallet</p>
                                            <p className="text-sm text-gray-600">Gopay, OVO, Dana, LinkAja</p>
                                        </div>
                                    </label>
                                </div>

                                {errors.payment && (
                                    <p className="mt-2 text-sm text-red-600">{errors.payment}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="primary"
                                size="lg"
                                className="w-full bg-purple-600 text-white py-4 font-semibold text-lg"
                                disabled={loading || (formData.paymentMethod === 'balance' && userBalance < packageItem.price)}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                        Memproses...
                                    </div>
                                ) : (
                                    'Bayar Sekarang'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-semibold mb-4">Ringkasan Pembayaran</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Harga Paket</span>
                                    <span>{formatPrice(packageItem.price)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Biaya Admin</span>
                                    <span>{formatPrice(0)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                                    <span>Total</span>
                                    <span style={{ color: theme.colors.primary }}>
                                        {formatPrice(packageItem.price)}
                                    </span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="text-green-600" size={16} />
                                    <span className="text-green-800 font-medium">Transaksi Aman</span>
                                </div>
                                <p className="text-green-700 text-sm">
                                    Data dan pembayaran Anda dilindungi dengan enkripsi SSL
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Proses instan
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Garansi 100%
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Support 24/7
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function untuk warna provider
const getProviderColor = (provider) => {
    const colors = {
        'Telkomsel': '#EF4444',
        'Indosat': '#F59E0B',
        'XL': '#3B82F6',
        'Axis': '#06B6D4',
        'Smartfren': '#8B5CF6',
        'Tri': '#EC4899'
    };
    return colors[provider] || '#6B7280';
};

export default CheckoutPage;