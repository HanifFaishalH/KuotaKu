// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, History, User, CreditCard, Wifi, Bell } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ user }) => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [balance, setBalance] = useState(0);

    // Mock data - dalam real app, ini dari API
    useEffect(() => {
      axios.get('/db.json')
        .then(response => {
          const products = response.data.products;
          const balance = products.reduce((total, product) => total + product.price, 0);
          setBalance(balance);
          setRecentOrders(products.slice(0, 5));
      })
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Selamat datang, {user?.name || 'User'}! 👋
                    </h1>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Saldo</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    Rp {balance.toLocaleString()}
                                </p>
                            </div>
                            <CreditCard className="text-green-500" size={32} />
                        </div>
                        <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            Top Up Saldo
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Paket Aktif</p>
                                <p className="text-2xl font-bold text-gray-800">1</p>
                            </div>
                            <Wifi className="text-blue-500" size={32} />
                        </div>
                        <Link 
                            to="/packages" 
                            className="block w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                        >
                            Beli Paket
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Transaksi</p>
                                <p className="text-2xl font-bold text-gray-800">{recentOrders.length}</p>
                            </div>
                            <History className="text-orange-500" size={32} />
                        </div>
                        <Link 
                            to="/orders" 
                            className="block w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors text-center"
                        >
                            Lihat Riwayat
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <History size={20} />
                                Transaksi Terbaru
                            </h2>
                            <Link to="/orders" className="text-purple-600 hover:text-purple-700 text-sm">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                    <div>
                                        <p className="font-medium">{order.package}</p>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">Rp {order.price.toLocaleString()}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            order.status === 'Aktif' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Bell size={20} />
                            Akses Cepat
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link 
                                to="/packages" 
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                            >
                                <Package className="mx-auto mb-2 text-purple-600" size={24} />
                                <p className="font-medium">Beli Paket</p>
                            </Link>
                            <Link 
                                to="/profile" 
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                            >
                                <User className="mx-auto mb-2 text-blue-600" size={24} />
                                <p className="font-medium">Profil Saya</p>
                            </Link>
                            <Link 
                                to="/orders" 
                                className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
                            >
                                <History className="mx-auto mb-2 text-green-600" size={24} />
                                <p className="font-medium">Riwayat</p>
                            </Link>
                            <button 
                                onClick={() => {/* Help action */}}
                                className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
                            >
                                <span className="text-2xl mb-2 block">💬</span>
                                <p className="font-medium">Bantuan</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;