// components/PackageCard.jsx
import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ package: pkg, onClick, onBuyClick, user }) => {
    const navigate = useNavigate();
    
    // Validasi: jika pkg undefined, jangan render komponen
    if (!pkg) {
        console.warn('PackageCard: pkg is undefined');
        return null;
    }

    // Default values untuk menghindari error
    const safePkg = {
        id: pkg.id || 'unknown',
        title: pkg.title || 'Paket Tidak Dikenal',
        provider: pkg.provider || 'Unknown',
        description: pkg.description || 'Deskripsi tidak tersedia',
        quota: pkg.quota || '0 GB',
        price: pkg.price || 0,
        validity: pkg.validity || '0 Hari',
        color: pkg.color || 'gray',
        category: pkg.category || 'internet'
    };

    const getColor = (color) => {
        switch (color) {
            case 'red': return '#EF4444';
            case 'yellow': return '#F59E0B';
            case 'blue': return '#3B82F6';
            case 'cyan': return '#06B6D4';
            case 'purple': return '#8B5CF6';
            case 'green': return '#10B981';
            default: return '#6B7280';
        }
    };

    const handleBuyClick = (e) => {
        e.stopPropagation();
        
        if (!user) {
            navigate('/login');
            return;
        }

        if (onBuyClick) {
            onBuyClick(safePkg); // Gunakan safePkg yang sudah divalidasi
        }
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick(safePkg); // Gunakan safePkg yang sudah divalidasi
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div 
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
            onClick={handleCardClick}
        >
            {/* Header dengan warna provider */}
            <div 
                className="h-2"
                style={{ backgroundColor: getColor(safePkg.color) }}
            ></div>
            
            <div className="p-6 flex-1">
                {/* Provider dan Title */}
                <div className="flex items-center gap-3 mb-4">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: getColor(safePkg.color) }}
                    >
                        {safePkg.provider.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{safePkg.provider}</h3>
                        <p className="text-gray-600">{safePkg.title}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {safePkg.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Kuota:</span>
                        <span className="font-semibold text-gray-800">{safePkg.quota}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Masa Aktif:</span>
                        <span className="font-semibold text-gray-800">{safePkg.validity}</span>
                    </div>
                </div>
            </div>

            {/* Price dan Button */}
            <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-600 text-sm">Harga</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {formatPrice(safePkg.price)}
                        </p>
                    </div>
                </div>
                
                <Button
                    type="primary"
                    className="w-full py-3 text-white"
                    onClick={handleBuyClick}
                >
                    {user ? 'Beli Sekarang' : 'Login untuk Beli'}
                </Button>
            </div>
        </div>
    );
};

export default PackageCard;