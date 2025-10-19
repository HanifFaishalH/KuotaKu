// pages/PackagesPage.jsx
import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import Button from '../components/Button';

const PackagesPage = () => {
    const theme = useTheme();
    const [selectedProvider, setSelectedProvider] = useState('all');

    // Sample data paket
    const packages = [
        {
            id: 1,
            provider: 'Telkomsel',
            name: 'Internet OMG!',
            quota: '10 GB',
            validity: '30 Hari',
            price: 'Rp 50.000',
            color: 'red'
        },
        {
            id: 2,
            provider: 'Indosat',
            name: 'Freedom Internet',
            quota: '15 GB',
            validity: '30 Hari',
            price: 'Rp 55.000',
            color: 'yellow'
        },
        {
            id: 3,
            provider: 'XL',
            name: 'XL Unlimited',
            quota: '20 GB',
            validity: '30 Hari',
            price: 'Rp 65.000',
            color: 'blue'
        },
        {
            id: 4,
            provider: 'Tri',
            name: 'Tri Data',
            quota: '25 GB',
            validity: '30 Hari',
            price: 'Rp 45.000',
            color: 'cyan'
        },
    ];

    const providers = ['all', 'Telkomsel', 'Indosat', 'XL', 'Tri'];

    const filteredPackages = selectedProvider === 'all' 
        ? packages 
        : packages.filter(pkg => pkg.provider === selectedProvider);

    const handleBuyClick = (packageItem) => {
        // Arahkan ke login atau langsung ke proses pembelian
        alert(`Anda akan membeli ${packageItem.name}. Silakan login untuk melanjutkan.`);
    };

    return (
        <div className="py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Pilih Paket Data Internet
                </h2>
                <p className="text-gray-600">
                    Cari paket data sesuai kebutuhan Anda. Login hanya diperlukan saat pembelian.
                </p>
            </div>

            {/* Filter Provider */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
                {providers.map(provider => (
                    <button
                        key={provider}
                        onClick={() => setSelectedProvider(provider)}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                            selectedProvider === provider
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {provider === 'all' ? 'Semua Provider' : provider}
                    </button>
                ))}
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPackages.map(pkg => (
                    <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                        <div 
                            className="h-3"
                            style={{ 
                                backgroundColor: 
                                    pkg.color === 'red' ? '#EF4444' :
                                    pkg.color === 'yellow' ? '#F59E0B' :
                                    pkg.color === 'blue' ? '#3B82F6' : '#06B6D4'
                            }}
                        ></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{pkg.provider}</h3>
                                    <p className="text-gray-600 text-sm">{pkg.name}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Kuota:</span>
                                    <span className="font-semibold">{pkg.quota}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Masa Aktif:</span>
                                    <span className="font-semibold">{pkg.validity}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold mt-4">
                                    <span>Harga:</span>
                                    <span style={{ color: theme.colors.primary }}>{pkg.price}</span>
                                </div>
                            </div>

                            <Button 
                                type="primary"
                                className="w-full"
                                onClick={() => handleBuyClick(pkg)}
                            >
                                Beli Sekarang
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Login */}
            <div className="mt-12 text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Ingin Membeli Paket?</h3>
                <p className="text-gray-600 mb-4">
                    Login atau daftar terlebih dahulu untuk melakukan pembelian paket data.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button type="primary" size="md">
                        Login
                    </Button>
                    <Button type="secondary" size="md">
                        Daftar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PackagesPage;