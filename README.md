# Ancord - Aplikasi Catatan Keuangan (Fullstack)

Aplikasi web untuk mencatat dan mengelola keuangan pribadi dengan antarmuka modern. **Frontend (ini)** dibangun dengan React, dan **terhubung ke backend Node.js/Hapi (lihat folder `ancord-be`) yang berperan sebagai API utama**. Backend tersebut mengelola autentikasi, transaksi, dan komunikasi ke database Supabase.

## 🏗️ Arsitektur

- **Frontend**: React (Vite, Tailwind, DaisyUI, React Query, dsb)
- **Backend**: Node.js, Hapi.js, Supabase (lihat folder `ancord-be`)
- **Database & Auth**: Supabase (diakses via backend)

Frontend TIDAK berkomunikasi langsung ke Supabase, melainkan ke backend (`ancord-be`) melalui endpoint REST API (`http://localhost:5000`).

## 🚦 Integrasi Frontend-Backend

- Semua request transaksi, login, register, dsb, dilakukan ke backend (`ancord-be`).
- Backend akan mengelola autentikasi JWT, validasi, dan komunikasi ke Supabase.
- Pastikan backend sudah berjalan sebelum menjalankan frontend.

## ⚙️ Prerequisites

- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Akun Supabase (untuk backend)
- Jalankan backend (`ancord-be`) terlebih dahulu!

## 🚀 Setup & Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd ancord-fe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Buat file `.env` di root directory frontend dan tambahkan:

```env
VITE_API_URL=http://localhost:5000
```

> **Catatan:**
>
> - Variabel `VITE_API_URL` digunakan untuk mengarahkan seluruh request ke backend.
> - Variabel Supabase TIDAK diperlukan di frontend, karena semua komunikasi ke Supabase dilakukan oleh backend.

### 4. Jalankan Backend

Ikuti instruksi di folder `ancord-be` untuk menjalankan backend pada port 5000.

### 5. Jalankan Frontend

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` dan terhubung ke backend di `http://localhost:5000`.

## 📱 Cara Penggunaan

1. Register/login melalui frontend (request dikirim ke backend)
2. Semua data transaksi, ringkasan, dsb, diambil dari backend
3. Pastikan backend tetap berjalan selama menggunakan frontend

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

Aplikasi ini dapat dideploy bersama backend (lihat instruksi deployment backend). File `vercel.json` hanya untuk frontend saja.

## 🧩 Koneksi dengan Backend

- Semua request API: `${VITE_API_URL}/...`
- Contoh: `POST ${VITE_API_URL}/users/login`, `GET ${VITE_API_URL}/transactions`

## 📝 Catatan

- Untuk pengembangan, jalankan backend dan frontend secara paralel.
- Untuk production, pastikan environment variable mengarah ke backend yang sudah dideploy.

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
