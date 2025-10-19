import React from 'react';
import { Star, Shield, Users, Clock } from 'lucide-react';

const StatsSection = ({ stats, variant = 'default', background = 'white' }) => {
    const defaultStats = [
        { number: '10K+', label: 'Pelanggan Aktif', icon: Users, color: 'purple' },
        { number: '99%', label: 'Kepuasan Pelanggan', icon: Star, color: 'green' },
        { number: '5 Menit', label: 'Proses Aktivasi', icon: Clock, color: 'blue' },
        { number: '24/7', label: 'Customer Support', icon: Shield, color: 'red' }
    ];

    const displayStats = stats || defaultStats;

    return (
        <section className={`py-16 ${background === 'gray' ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {displayStats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-center mb-3">
                                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                                        <IconComponent size={24} className={`text-${stat.color}-600`} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                                <div className="text-gray-600 text-sm">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;