// components/PackageDetail.jsx
import React from "react";
import { useTheme } from "../ThemeContext";
import Button from "../components/Button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PackageDetail = ({ packageItem, isOpen, onClose, onBuyClick, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getColor = (color) => {
    switch (color) {
      case "red":
        return "#EF4444";
      case "yellow":
        return "#F59E0B";
      case "blue":
        return "#3B82F6";
      case "cyan":
        return "#06B6D4";
      case "purple":
        return "#8B5CF6";
      case "green":
        return "#10B981";
      default:
        return "#6B7280";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const features = [
    "Akses internet 24/7",
    "Kecepatan hingga 42 Mbps",
    "Bisa untuk streaming",
    "Support semua aplikasi",
    "Garansi jaringan",
  ];

  const handleBuyClick = () => {
    if (!user) {
      // Jika belum login, arahkan ke login
      navigate('/login');
      onClose();
      return;
    }

    if (onBuyClick) {
      onBuyClick(packageItem);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Detail Paket {packageItem.provider}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Provider Info */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: getColor(packageItem.color) }}
            >
              {packageItem.provider.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {packageItem.provider} - {packageItem.title}
              </h3>
              <p className="text-gray-600">{packageItem.description}</p>
            </div>
          </div>

          {/* Package Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Informasi Paket
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kuota:</span>
                    <span className="font-semibold">{packageItem.quota}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Masa Aktif:</span>
                    <span className="font-semibold">
                      {packageItem.validity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-semibold">
                      {packageItem.provider}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-semibold">
                      {packageItem.category || 'Internet'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Fitur Utama
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Total Pembayaran</p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  {formatPrice(packageItem.price)}
                </p>
              </div>
            </div>

            <Button
              type="primary"
              className="w-full py-3 text-white"
              onClick={handleBuyClick}
            >
              {user ? 'Beli Sekarang' : 'Login untuk Membeli'}
            </Button>
            
            {!user && (
              <p className="text-sm text-gray-600 text-center mt-2">
                Silakan login terlebih dahulu untuk melakukan pembelian
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;