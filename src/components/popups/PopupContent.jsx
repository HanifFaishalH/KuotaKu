import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PopupContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePopup, setActivePopup] = useState('welcome');

    // Auto open popup setelah component mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
    };

    const popupContent = {
        welcome: {
            title: "Selamat Datang di Kuotaku! 🎉",
            description: "Dapatkan paket internet terbaik dengan harga spesial untuk member baru.",
            image: "🎁",
            buttonText: "Mulai Belanja",
            buttonColor: "bg-purple-600 hover:bg-purple-700"
        },
        discount: {
            title: "Diskon 20% Spesial!",
            description: "Gunakan kode: WELCOME20 untuk mendapatkan diskon pada pembelian pertama Anda.",
            image: "💰",
            buttonText: "Klaim Sekarang",
            buttonColor: "bg-green-600 hover:bg-green-700"
        },
        newsletter: {
            title: "Dapatkan Update Terbaru",
            description: "Berlangganan newsletter untuk mendapatkan promo dan info paket terbaru.",
            image: "📧",
            buttonText: "Berlangganan",
            buttonColor: "bg-blue-600 hover:bg-blue-700"
        },
        maintenance: {
            title: "Sedang Dalam Perbaikan",
            description: "Kami sedang melakukan maintenance untuk pengalaman yang lebih baik. Terima kasih atas pengertiannya.",
            image: "🔧",
            buttonText: "Mengerti",
            buttonColor: "bg-gray-600 hover:bg-gray-700"
        }
    };

    const currentPopup = popupContent[activePopup];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={closePopup}
            ></div>
            
            {/* Popup Container */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Popup Header dengan Gambar */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-center">
                    <div className="text-6xl mb-4">{currentPopup.image}</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {currentPopup.title}
                    </h2>
                </div>

                {/* Popup Content */}
                <div className="p-6">
                    <p className="text-gray-600 text-center mb-6 text-lg">
                        {currentPopup.description}
                    </p>

                    {/* Form untuk Newsletter */}
                    {activePopup === 'newsletter' && (
                        <div className="mb-6">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    {/* Button Group */}
                    <div className="flex flex-col space-y-3">
                        <button
                            className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors ${currentPopup.buttonColor}`}
                            onClick={closePopup}
                        >
                            {currentPopup.buttonText}
                        </button>
                        
                        {activePopup !== 'maintenance' && (
                            <button
                                className="w-full py-3 px-6 text-gray-600 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                onClick={closePopup}
                            >
                                Nanti Saja
                            </button>
                        )}
                    </div>
                </div>

                {/* Popup Type Selector - untuk demo */}
                <div className="bg-gray-50 p-4 border-t">
                    <p className="text-sm text-gray-500 mb-2 text-center">Jenis Popup:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Object.keys(popupContent).map((type) => (
                            <button
                                key={type}
                                onClick={() => setActivePopup(type)}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                    activePopup === type 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}