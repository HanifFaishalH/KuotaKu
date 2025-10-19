import { Link } from 'react-router-dom';
import Button from './Button';
import { Zap } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="text-center mb-16 py-40">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                    Internet Cepat{' '}
                    <span 
                        className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                    >
                        Tanpa Ribet
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Beli paket data internet dari semua provider dengan harga terbaik. 
                    Proses cepat, aman, dan paket aktif dalam hitungan menit!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/packages">
                        <Button size="lg" className="flex items-center gap-2 hover:bg-gray-300">
                            <Zap size={20} />
                            Lihat Semua Paket
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button className="flex items-center gap-2 hover:bg-gray-300" size="lg">
                            Pelajari Lebih Lanjut
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;