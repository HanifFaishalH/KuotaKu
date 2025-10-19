import React from 'react';
import { TrendingUp, Zap, Shield } from 'lucide-react';

const FeaturesSection = ({ 
    features, 
    title = "Mengapa Memilih Kuotaku?", 
    subtitle,
    variant = 'card' 
}) => {
    const defaultFeatures = [
        {
            icon: TrendingUp,
            title: 'Harga Terbaik',
            description: 'Dapatkan harga spesial yang lebih murah dibandingkan pembelian langsung dari provider',
            color: 'purple'
        },
        {
            icon: Zap,
            title: 'Proses Instan',
            description: 'Paket langsung aktif dalam 1-5 menit setelah pembayaran berhasil',
            color: 'green'
        },
        {
            icon: Shield,
            title: 'Aman & Terpercaya',
            description: 'Transaksi aman dengan garansi uang kembali jika paket tidak aktif',
            color: 'blue'
        }
    ];

    const displayFeatures = features || defaultFeatures;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {displayFeatures.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                                    <IconComponent size={32} className={`text-${feature.color}-600`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;