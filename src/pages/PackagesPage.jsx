// pages/PackagesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../components/PackageCard';
import PackageDetail from './PackageDetail';
import { productsAPI } from '../services/api';

const PackagesPage = ({ user }) => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [providerFilter, setProviderFilter] = useState('all');
    
    const navigate = useNavigate();

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            setLoading(true);
            const data = await productsAPI.getAll();
            setPackages(data);
            setFilteredPackages(data);
        } catch (error) {
            console.error('Error loading packages:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi handleBuyClick yang menggunakan API
    const handleBuyClick = async (packageItem) => {
        if (!user) {
            // User belum login, arahkan ke login
            navigate('/login');
            return;
        }

        try {
            // Validasi data package
            if (!packageItem || !packageItem.id) {
                console.error('Package data tidak valid:', packageItem);
                return;
            }

            // Langsung navigasi ke checkout dengan data package
            navigate('/checkout', { 
                state: { 
                    packageItem: {
                        id: packageItem.id,
                        title: packageItem.title,
                        provider: packageItem.provider,
                        description: packageItem.description,
                        quota: packageItem.quota,
                        price: packageItem.price,
                        validity: packageItem.validity,
                        category: packageItem.category,
                        color: packageItem.color
                    }
                } 
            });

        } catch (error) {
            console.error('Error preparing checkout:', error);
            // Fallback: tetap navigasi ke checkout dengan data yang ada
            navigate('/checkout', { 
                state: { 
                    packageItem: packageItem 
                } 
            });
        }
    };

    const handlePackageClick = (packageItem) => {
        setSelectedPackage(packageItem);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedPackage(null);
    };

    // Filter logic
    useEffect(() => {
        let result = packages;

        if (searchTerm) {
            result = result.filter(pkg => 
                pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (providerFilter !== 'all') {
            result = result.filter(pkg => pkg.provider === providerFilter);
        }

        setFilteredPackages(result);
    }, [searchTerm, providerFilter, packages]);

    // Unique providers untuk filter
    const providers = [...new Set(packages.map(pkg => pkg.provider))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat paket data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Paket Data Internet</h1>
                    <p className="text-gray-600">Pilih paket data terbaik sesuai kebutuhan Anda</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari paket data..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Provider Filter */}
                        <select
                            value={providerFilter}
                            onChange={(e) => setProviderFilter(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">Semua Provider</option>
                            {providers.map(provider => (
                                <option key={provider} value={provider}>
                                    {provider}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Packages Grid */}
                {filteredPackages.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Tidak ada paket yang ditemukan</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPackages.map(pkg => (
                            <PackageCard
                                key={pkg.id}
                                package={pkg}
                                onClick={() => handlePackageClick(pkg)}
                                onBuyClick={() => handleBuyClick(pkg)}
                                user={user}
                            />
                        ))}
                    </div>
                )}

                {/* Package Detail Modal */}
                {selectedPackage && (
                    <PackageDetail
                        packageItem={selectedPackage}
                        isOpen={isDetailOpen}
                        onClose={handleCloseDetail}
                        onBuyClick={handleBuyClick}
                        user={user}
                    />
                )}
            </div>
        </div>
    );
};

export default PackagesPage;