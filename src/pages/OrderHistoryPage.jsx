import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { ordersAPI } from "../services/api";

const OrderHistoryPage = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [error, setError] = useState(null);

  // Load orders dari API
  useEffect(() => {
    loadUserOrders();
  }, [user]);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user || !user.id) {
        console.warn('User tidak valid:', user);
        return;
      }

      // Ambil data orders dari API berdasarkan user ID
      const userOrders = await ordersAPI.getByUser(user.id);
      console.log('Orders loaded:', userOrders); // Untuk debugging
      
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Gagal memuat riwayat order. Silakan refresh halaman.');
    } finally {
      setLoading(false);
    }
  };

  // Filter orders berdasarkan search dan filter
  useEffect(() => {
    let result = orders;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.packageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.phoneNumber?.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Filter by date (sederhana)
    if (dateFilter !== "all") {
      const today = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "week":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case "3months":
          filterDate.setMonth(today.getMonth() - 3);
          break;
        default:
          break;
      }

      result = result.filter((order) => {
        const orderDate = new Date(order.orderDate || order.date);
        return orderDate >= filterDate;
      });
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle size={14} />,
        text: "Berhasil",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock size={14} />,
        text: "Pending",
      },
      failed: {
        color: "bg-red-100 text-red-800",
        icon: <XCircle size={14} />,
        text: "Gagal",
      },
      cancelled: {
        color: "bg-gray-100 text-gray-800",
        icon: <XCircle size={14} />,
        text: "Dibatalkan",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  const getProviderColor = (provider) => {
    const colors = {
      Telkomsel: "bg-red-50 text-red-700 border-red-200",
      Indosat: "bg-green-50 text-green-700 border-green-200",
      XL: "bg-purple-50 text-purple-700 border-purple-200",
      Axis: "bg-blue-50 text-blue-700 border-blue-200",
      Smartfren: "bg-orange-50 text-orange-700 border-orange-200",
      Tri: "bg-cyan-50 text-cyan-700 border-cyan-200",
    };
    return colors[provider] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Rp 0';
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRetryOrder = async (order) => {
    try {
      // Logic untuk retry order yang failed
      console.log('Retrying order:', order);
      // Di sini bisa implementasi logic untuk memproses ulang order
      alert(`Memproses ulang order ${order.id}...`);
    } catch (error) {
      console.error('Error retrying order:', error);
      alert('Gagal memproses ulang order. Silakan coba lagi.');
    }
  };

  const handleViewDetails = (order) => {
    // Logic untuk melihat detail order
    console.log('Viewing order details:', order);
    alert(`Detail Order: ${order.id}\nPaket: ${order.packageName}\nStatus: ${order.status}`);
  };

  const handleDownloadInvoice = (order) => {
    // Logic untuk download invoice
    console.log('Downloading invoice for order:', order);
    alert(`Mengunduh invoice untuk order ${order.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat riwayat order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <h3 className="font-semibold mb-2">Terjadi Kesalahan</h3>
            <p className="mb-4">{error}</p>
            <button
              onClick={loadUserOrders}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Order</h1>
          <p className="text-gray-600">
            Lihat dan kelola semua transaksi paket data Anda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-2">Total Order</p>
            <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-2">Berhasil</p>
            <p className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-2">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500 text-sm mb-2">Gagal</p>
            <p className="text-2xl font-bold text-red-600">
              {orders.filter(o => o.status === 'failed').length}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari order, provider, atau nomor telepon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="completed">Berhasil</option>
                <option value="pending">Pending</option>
                <option value="failed">Gagal</option>
                <option value="cancelled">Dibatalkan</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Semua Waktu</option>
                <option value="week">1 Minggu</option>
                <option value="month">1 Bulan</option>
                <option value="3months">3 Bulan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {orders.length === 0 ? "Belum ada order" : "Tidak ada order ditemukan"}
              </h3>
              <p className="text-gray-500 mb-6">
                {orders.length === 0 
                  ? "Mulai belanja paket data pertama Anda dan lihat riwayat order di sini."
                  : "Coba ubah filter pencarian Anda."
                }
              </p>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Beli Paket Data
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Paket & Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Nomor HP
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm font-semibold text-gray-800">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {order.packageName}
                          </p>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getProviderColor(
                              order.provider
                            )}`}
                          >
                            {order.provider}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600">
                          {order.phoneNumber || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-gray-600">
                            {formatDate(order.orderDate || order.date)}
                          </p>
                          {order.validUntil && (
                            <p className="text-xs text-gray-500">
                              Berlaku hingga: {formatDate(order.validUntil)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-800">
                          {formatCurrency(order.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(order)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download Invoice"
                          >
                            <Download size={16} />
                          </button>
                          {order.status === "failed" && (
                            <button 
                              onClick={() => handleRetryOrder(order)}
                              className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                            >
                              Coba Lagi
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 mb-2">Butuh Bantuan?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Jika ada masalah dengan order Anda, tim support kami siap membantu
              24/7.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Hubungi Support
            </button>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-semibold text-green-800 mb-2">
              Ingin Beli Lagi?
            </h3>
            <p className="text-green-700 text-sm mb-4">
              Lihat paket data terbaru dengan promo spesial untuk Anda.
            </p>
            <Link
              to="/packages"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Lihat Paket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;