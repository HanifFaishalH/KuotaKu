# Kuotaku - Platform Pembelian Paket Data Internet

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan)

## 📋 Deskripsi Proyek

Kuotaku adalah platform e-commerce modern untuk pembelian paket data internet dari berbagai provider ternama di Indonesia. Aplikasi ini dibangun dengan React.js dan Vite, menawarkan pengalaman berbelanja yang cepat, aman, dan user-friendly.

## ✨ Fitur Utama

### 🛍️ **E-commerce Paket Data**
- ✅ Pencarian dan filter paket data
- ✅ Detail produk dengan modal interaktif
- ✅ Sistem checkout yang aman
- ✅ Multiple payment methods (Saldo, Transfer Bank, E-Wallet)

### 🔐 **Sistem Autentikasi**
- ✅ Registrasi user dengan validasi
- ✅ Login/Logout system
- ✅ Protected routes untuk halaman user
- ✅ Auto-login dengan localStorage

### 💰 **Manajemen Transaksi**
- ✅ Riwayat order lengkap
- ✅ Status tracking (Pending, Completed, Failed)
- ✅ Sistem saldo user

### 🎨 **User Experience**
- ✅ Responsive design (Mobile & Desktop)
- ✅ Loading states & error handling
- ✅ Interactive UI components

## 🛠️ Teknologi yang Digunakan

### Frontend Stack
- **React 18** - Library UI modern
- **Vite 5** - Build tool dan dev server
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client untuk API calls
- **Lucide React** - Icon library

### Backend & Data
- **JSON Server** - Mock REST API
- **Local Storage** - Client-side persistence

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── ui/                 # Komponen UI dasar
│   │   ├── Button.jsx
│   │   └── PackageCard.jsx
│   ├── sections/           # Section halaman
│   │   ├── HeroSection.jsx
│   │   ├── PackagesSection.jsx
│   │   └── CTASections.jsx
│   └── popups/             # Modal & popup
│       ├── SuccessPopup.jsx
│       └── DevelopmentPopups.jsx
├── pages/
│   ├── auth/               # Halaman autentikasi
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── HomePage.jsx        # Landing page
│   ├── PackagesPage.jsx    # Katalog produk
│   ├── Dashboard.jsx       # User dashboard
│   ├── CheckoutPage.jsx    # Halaman checkout
│   ├── OrderHistoryPage.jsx # Riwayat transaksi
│   └── ProfilePage.jsx     # Profil user
├── services/
│   └── api.js              # API service layer
├── context/
│   └── ThemeContext.jsx    # Theme management
└── assets/
    └── logo.png            # Brand assets
```

## 🚀 Instalasi & Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download project**
```bash
git clone <repository-url>
cd kuotaku
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan JSON Server (Backend Mock)**
```bash
# Terminal 1 - Jalankan JSON Server
npm run server
# atau
json-server --watch db.json --port 3000
```

4. **Jalankan Development Server**
```bash
# Terminal 2 - Jalankan Vite dev server
npm run dev
```

5. **Akses Aplikasi**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📊 Data Structure

### Users
```json
{
  "id": 1,
  "name": "Hanif",
  "email": "hanif@mail.com",
  "password": "1234",
  "role": "customer",
  "phone": "081234567890",
  "balance": 250000,
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Products
```json
{
  "id": 1,
  "provider": "Telkomsel",
  "title": "Internet OMG!",
  "description": "Paket internet harian 24 jam",
  "quota": "5 GB",
  "price": 25000,
  "validity": "30 Hari",
  "category": "internet",
  "color": "red",
  "popular": true
}
```

### Orders
```json
{
  "id": "ORD-001",
  "userId": 1,
  "productId": 1,
  "packageName": "Internet OMG! - Telkomsel",
  "provider": "Telkomsel",
  "price": 25000,
  "phoneNumber": "081234567890",
  "status": "completed",
  "orderDate": "2024-01-15T10:30:00Z",
  "validUntil": "2024-02-14T23:59:59Z",
  "paymentMethod": "balance"
}
```

## 🎯 Cara Penggunaan

### Untuk Pengguna Baru
1. **Registrasi** - Buat akun baru di halaman register
2. **Login** - Masuk dengan email dan password
3. **Jelajahi Paket** - Lihat katalog paket data
4. **Beli Paket** - Pilih paket dan lakukan checkout
5. **Bayar** - Gunakan saldo atau metode pembayaran lain
6. **Lacak Order** - Lihat riwayat di halaman orders

### Akun Demo
```
Email: hanif@mail.com
Password: 1234
```

## 🔧 API Endpoints

### Users
- `GET /users?email=xxx&password=xxx` - Login
- `POST /users` - Register user baru
- `PATCH /users/:id` - Update user

### Products
- `GET /products` - Semua produk
- `GET /products?provider=xxx` - Filter by provider
- `GET /products?popular=true` - Produk populer

### Orders
- `GET /orders?userId=xxx` - Orders by user
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order status

## 🎨 Customization

### Theme Colors
Edit `ThemeContext.jsx` untuk mengubah warna tema:
```jsx
const [theme] = useState({
    colors: {
        primary: '#8B5CF6',    // Purple
        secondary: '#F59E0B',  // Orange
        accent: '#10B981'      // Green
    }
});
```

### Menambah Provider
Tambahkan di `db.json` dengan format:
```json
{
  "provider": "ProviderBaru",
  "title": "Nama Paket",
  "color": "warna" // red, blue, green, yellow, purple, cyan
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 sudah digunakan**
```bash
# Cari process
lsof -i :3000
# Kill process
kill -9 <PID>
```

2. **JSON Server tidak jalan**
```bash
# Pastikan db.json ada di root
ls db.json
# Jalankan dengan port berbeda
json-server --watch db.json --port 3001
```

3. **Import error**
- Pastikan path import benar
- Check case sensitivity
- Restart dev server

## 📈 Fitur yang Akan Datang

- [ ] Notifikasi real-time
- [ ] Voucher dan promo system
- [ ] Rating dan review produk
- [ ] Wishlist favorite packages
- [ ] Auto-topup system
- [ ] Mobile app version

## 👥 Kontribusi

1. Fork project ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Kontak

Project Link: [https://github.com/HanifFaishalH/KuotaKu](https://github.com/HanifFaishalH/KuotaKu)

---

**Dibuat dengan ❤️ oleh Tim Pengembang Kuotaku**  
*Waktu Pengerjaan: 19/10/25 - 20/10/25*