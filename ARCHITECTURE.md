# Arsitektur Teknis (ARCHITECTURE.md)

Dokumen ini menjelaskan arsitektur teknis, pola aliran data, dan struktur komponen dari website Kreasi Satu Desain.

## 1. Paradigma Arsitektur: Islands Architecture

Proyek ini dibangun menggunakan **Astro (Static Site Generator)** dengan pendekatan **Islands Architecture**. 
- Secara default, seluruh halaman di-*render* secara statis menjadi HTML murni saat proses *build* (`npm run build`). Hal ini menjamin waktu muat (load time) yang sangat cepat dan optimasi SEO yang sangat baik.
- **Astro Islands:** Hanya komponen spesifik yang membutuhkan interaktivitas yang dihidrasi (hydrated) di sisi klien (browser) menggunakan **React 19**. Contohnya adalah `PortfolioSection.tsx` yang menggunakan direktif `client:load`.

## 2. Sistem Routing

Routing dilakukan secara statis berbasis file (File-based Routing) bawaan Astro.
- `src/pages/index.astro` -> Menghasilkan root URL (`/`)
- `src/pages/about.astro` -> Menghasilkan halaman About (`/about`)

## 3. Tata Letak (Layouting) & SEO

Seluruh halaman dibungkus (wrapped) oleh satu layout utama yaitu `src/layouts/BaseLayout.astro`. 
Komponen ini bertugas menangani:
- **SEO & Meta Tags Global:** Pengaturan `<title>`, `<meta name="description">`, canonical URL, serta Open Graph (OG) & Twitter Cards.
- **Preloading Aset:** Memuat font esensial (WOFF2) lebih awal dengan `<link rel="preload">`.
- **Elemen Persisten:** Memuat komponen navigasi (`<Navbar>`), Footer (`<Footer>`), dan widget floating WhatsApp (`<WhatsAppFloating>`) di setiap halaman.

## 4. Manajemen Data & Aliran (Data Flow)

Pendekatan website ini adalah **Zero CMS**. Tidak ada API *headles* atau sistem manajemen konten eksternal. Semua konten dikelola secara lokal pada *build time*.

- **Single Source of Truth:** Semua metadata dan konten diatur dalam folder `src/data/`.
  - `company.ts`: Metadata perusahaan (nama, visi, misi, kontak).
  - `projects.ts`: Portofolio karya arsitektur/konstruksi.
  - `services.ts`: Layanan yang ditawarkan.
- File-file ini bersifat *strongly-typed* (memiliki antarmuka/TypeScript Interfaces) sehingga mencegah kesalahan struktur data.
- Komponen (seperti `WhyUsSection.astro` atau `PortfolioSection.tsx`) mengimpor data ini secara langsung dan merendernya (mapping).

## 5. Komponen Interaktif (React)

- `PortfolioSection.tsx` adalah komponen yang kompleks dan reaktif. Ia mengatur *state* untuk:
  - Kategori aktif (Filter)
  - Data proyek yang dipilih (Light-box modal)
  - Indeks gambar saat ini
  - Status mode *fullscreen zoom*

## 6. Integrasi Pihak Ketiga (WhatsApp)

Tidak menggunakan library *chat widget* yang berat. Widget WhatsApp di-*build* *custom* (`WhatsAppFloating.astro`) menggunakan *vanilla* JavaScript.
- Mengandalkan skrip di sisi klien untuk membuka/menutup modal *quick-consultation*.
- Integrasi *deep link* dibuat tersentralisasi di `src/lib/whatsapp.ts`. URL `wa.me` akan dibuat dinamis lengkap dengan pesan bawaan (pre-filled text) yang menyesuaikan konteks (contoh: pesan dari portofolio berbeda dari layanan konstruksi).

## 7. Pipeline Aset & Optimalisasi

- **Gambar:** Seluruh gambar dioptimasi menjadi ekstensi WebP dan disimpan di `public/images/`. Gambar ini di-load menggunakan atribut `loading="lazy"` dan `decoding="async"` di beberapa komponen yang relevan.
- **Font:** Menggunakan font *self-hosted* yang berlokasi di `public/fonts/` dengan format WOFF2 (Plus Jakarta Sans & DM Serif Display) untuk performa dan privasi.
- **Video:** Background video *hero section* berlokasi di `public/videos/hero-video.mp4` dikompresi sedemikian rupa, menggunakan poster bergambar (*fallback* WebP) agar TTI (Time to Interactive) tidak terganggu.
- Vite menangani *bundling* untuk skrip dan styling (*Tailwind*).

## 8. Deployment Workflow

- Saat ini, *deployment* ke cPanel *Shared Hosting* dilakukan dengan cara **manual build**:
  1. Jalankan `npm run build` lokal.
  2. Hasil produksi (folder `dist/`) di-*zip*.
  3. Upload `dist.zip` ke File Manager cPanel, ekstrak ke direktori `public_html` atau *subdomain root folder*.
- Versi repositori (source code) disinkronisasi ke **GitHub** (`main` branch) sebagai *version control* dan backup.
