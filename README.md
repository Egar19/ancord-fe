# Ancord - Aplikasi Catatan Keuangan

Aplikasi web untuk mencatat dan mengelola keuangan pribadi dengan antarmuka yang modern dan mudah digunakan. Dibangun dengan React dan menggunakan Supabase sebagai backend.

## 🚀 Fitur Utama

- **Dashboard Keuangan**: Melihat ringkasan saldo, total pemasukan, dan pengeluaran
- **Pencatatan Transaksi**: Menambah catatan pemasukan dan pengeluaran
- **Pencarian**: Mencari transaksi berdasarkan catatan atau jenis transaksi
- **Manajemen Data**: Mengedit dan menghapus transaksi yang sudah ada
- **Autentikasi**: Sistem login dan register yang aman
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Dark/Light Mode**: Toggle tema sesuai preferensi pengguna

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Backend**: Supabase (Database & Authentication)
- **Form Handling**: React Hook Form
- **Date Picker**: React Datepicker
- **Icons**: React Icons

## 📋 Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Akun Supabase (untuk database dan autentikasi)

## 🔧 Setup & Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd aplikasi-catatan-keuangan
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Buat file `.env` di root directory dan tambahkan konfigurasi Supabase:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database

1. Buat project baru di [Supabase](https://supabase.com)
2. Buat tabel `transactions` dengan struktur berikut:

```sql
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('income', 'outcome')),
  amount DECIMAL(10,2) NOT NULL,
  notes TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to access only their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📱 Cara Penggunaan

### 1. Registrasi/Login

- Buka aplikasi di browser
- Klik "Register" untuk membuat akun baru atau "Login" jika sudah punya akun
- Masukkan email dan password

### 2. Dashboard

- Setelah login, Anda akan diarahkan ke dashboard
- Dashboard menampilkan ringkasan saldo, total pemasukan, dan pengeluaran
- Daftar transaksi terbaru ditampilkan di bawah

### 3. Menambah Transaksi

- Klik tombol "+" di navigation bar
- Pilih jenis transaksi (Pemasukan/Pengeluaran)
- Masukkan jumlah, catatan, dan tanggal
- Klik "Add Record" untuk menyimpan

### 4. Mengelola Transaksi

- Klik pada transaksi untuk melihat detail
- Gunakan tombol edit untuk mengubah transaksi
- Gunakan tombol delete untuk menghapus transaksi

### 5. Pencarian

- Gunakan search bar di header untuk mencari transaksi
- Pencarian berdasarkan catatan atau jenis transaksi

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Session, Theme)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── styles/             # CSS styles
├── utils/              # Utility functions
└── assets/             # Static assets (images, icons)
```

## 📦 Available Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint

## 🌐 Deployment

Aplikasi ini sudah dikonfigurasi untuk deployment di Vercel. File `vercel.json` sudah disediakan untuk konfigurasi deployment.

## 🤝 Contributing

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini dilisensikan di bawah MIT License.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk membantu mengelola keuangan pribadi dengan lebih baik.
