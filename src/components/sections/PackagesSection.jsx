// components/sections/PackagesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';
import Button from '../Button';
import PackageCard from '../PackageCard';

const PackagesSection = ({ 
    packages, 
    loading, 
    error,
    title = "Paket Populer", 
    subtitle = "Pilihan paket data terlaris dengan harga spesial untuk Anda",
    showViewAll = true 
}) => {
    const theme = useTheme();

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {error ? (
                    <div className="text-center py-8">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
                            <p>{error}</p>
                        </div>
                    </div>
                ) : loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {packages.map(pkg => (
                                <PackageCard 
                                    key={pkg.id}
                                    package={pkg} // ✅ Perbaiki prop name: packageItem → package
                                    onClick={() => console.log('View details:', pkg)}
                                    onBuyClick={() => console.log('Buy:', pkg)}
                                />
                            ))}
                        </div>
                        
                        {showViewAll && (
                            <div className="text-center">
                                <Link to="/packages">
                                    <Button type="secondary" size="lg">
                                        Lihat Semua Paket
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default PackagesSection;