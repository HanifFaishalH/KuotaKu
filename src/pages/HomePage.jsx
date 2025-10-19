// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api'; // ✅ Gunakan API service
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PackagesSection from '../components/sections/PackagesSection';
import ProvidersSection from '../components/sections/ProviderSections';
import CTASection from '../components/sections/CTASections';

const HomePage = () => {
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedPackages = async () => {
            try {
                setError(null);
                // ✅ Gunakan productsAPI dari service
                const products = await productsAPI.getAll();
                
                // Ambil 4 produk pertama atau produk yang marked as popular
                const featured = products.slice(0, 4).map(product => ({
                    id: product.id,
                    title: product.title, // ✅ Perbaiki: gunakan title bukan name
                    provider: product.provider,
                    description: product.description,
                    quota: product.quota,
                    price: product.price, // ✅ Simpan sebagai number, bukan string
                    validity: product.validity,
                    color: product.color,
                    category: product.category
                }));
                
                setFeaturedPackages(featured);
            } catch (error) {
                console.error('Error fetching featured packages:', error);
                setError('Gagal memuat paket data. Silakan refresh halaman.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPackages();
    }, []);

    return (
        <div>
            <HeroSection />
            <StatsSection />
            <PackagesSection 
                packages={featuredPackages}
                loading={loading}
                error={error}
            />
            <ProvidersSection /> 
            <FeaturesSection />
            <CTASection />
        </div>
    );
};

export default HomePage;