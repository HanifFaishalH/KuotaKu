// components/sections/ProvidersSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProvidersSection = ({ 
    title = "Partner Provider Kami",
    subtitle = "Bekerja sama dengan semua provider terkemuka di Indonesia",
    background = "white",
    variant = "grid" // 'grid' | 'carousel' | 'logos'
}) => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch providers dari db.json
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get('/db.json');
                const products = response.data.products;
                
                // Extract unique providers dari data products
                const uniqueProviders = Array.from(
                    new Map(products.map(product => [product.provider, {
                        name: product.provider,
                        logo: getProviderLogo(product.provider),
                        color: product.color,
                        productCount: products.filter(p => p.provider === product.provider).length
                    }])).values()
                );

                setProviders(uniqueProviders);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching providers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    // Map provider name ke logo emoji
    const getProviderLogo = (providerName) => {
        const logoMap = {
            'Telkomsel': '📱',
            'Indosat': '⚡', 
            'XL': '🔵',
            'Tri': '🔺',
            'Smartfren': '📶',
            'Axis': '🎯'
        };
        return logoMap[providerName] || '📶';
    };

    const getBackgroundClass = () => {
        switch (background) {
            case 'gray':
                return 'bg-gray-50';
            case 'primary':
                return 'bg-purple-50';
            default:
                return 'bg-white';
        }
    };

    const getTextColor = () => {
        return background === 'primary' ? 'text-gray-800' : 'text-gray-800';
    };

    const getSubtitleColor = () => {
        return background === 'primary' ? 'text-gray-600' : 'text-gray-600';
    };

    // Loading state
    if (loading) {
        return (
            <section className={`py-16 ${getBackgroundClass()}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className={`text-3xl font-bold mb-4 ${getTextColor()}`}>
                            {title}
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${getSubtitleColor()}`}>
                            {subtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className={`py-16 ${getBackgroundClass()}`}>
                <div className="container mx-auto px-4 text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Gagal Memuat Data Provider</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </section>
        );
    }

    // Variant: Grid (default)
    const renderGrid = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {providers.map((provider, index) => (
                <div 
                    key={index} 
                    className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {provider.logo}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{provider.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{provider.description}</p>
                    <div className="text-xs text-purple-600 font-medium">
                        {provider.productCount} Paket Tersedia
                    </div>
                </div>
            ))}
        </div>
    );

    // Variant: Logos Only
    const renderLogos = () => (
        <div className="flex flex-wrap justify-center gap-8">
            {providers.map((provider, index) => (
                <div 
                    key={index}
                    className="flex flex-col items-center p-4 hover:scale-110 transition-transform duration-300"
                    title={`${provider.name} - ${provider.description}`}
                >
                    <div className="text-5xl mb-2">{provider.logo}</div>
                    <span className="text-sm font-medium text-gray-700">{provider.name}</span>
                </div>
            ))}
        </div>
    );

    // Variant: Carousel
    const renderCarousel = () => (
        <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide px-4">
                {providers.map((provider, index) => (
                    <div 
                        key={index}
                        className="flex-shrink-0 w-48 text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                        <div className="text-4xl mb-3">{provider.logo}</div>
                        <h3 className="font-semibold text-gray-800 mb-2">{provider.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{provider.description}</p>
                        <div className="text-xs text-purple-600 font-medium">
                            {provider.productCount} Paket
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (variant) {
            case 'carousel':
                return renderCarousel();
            case 'logos':
                return renderLogos();
            default:
                return renderGrid();
        }
    };

    return (
        <section className={`py-16 ${getBackgroundClass()}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold mb-4 ${getTextColor()}`}>
                        {title}
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${getSubtitleColor()}`}>
                        {subtitle}
                    </p>
                </div>

                {renderContent()}

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">
                        {providers.length} Provider Resmi • Semua terdaftar di Kominfo
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProvidersSection;