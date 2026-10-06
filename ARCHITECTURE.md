# Arsitektur Teknis (ARCHITECTURE.md)

Dokumen ini menjelaskan arsitektur teknis, pola aliran data, dan struktur komponen dari website Kreasi Satu Desain.

## 1. Paradigma Arsitektur: Islands Architecture

Proyek ini dibangun menggunakan **Astro 5** dengan pendekatan **Islands Architecture** dan output **server-rendered (SSR)** di Cloudflare Workers.
- Halaman dirender di sisi server saat request (bukan statis), sehingga data proyek bisa selalu segar dari D1.
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

Website ini berjalan dalam mode **server-rendered (SSR)** di Cloudflare Workers. Konten statis (perusahaan, layanan) masih lokal di `src/data/`, sedangkan data proyek bersifat dinamis.

- **Single Source of Truth:**
  - `company.ts` / `services.ts`: Metadata statis di `src/data/` (build-time, type-safe).
  - Proyek: **Cloudflare D1** (binding `DB`, database `ksd-portfolio`) — dikelola via admin panel.
- **Schema D1:** `migrations/0001_create_projects.sql` (tabel `projects` dan `gallery_images`).
- **Gambar:** Disimpan di **Cloudflare R2** (bucket `ksd-portfolio-images`, binding `R2`), disajikan via endpoint `/images/r2/[...path]`.
- **Auth Admin:** JWT (`jose`) + hashing password (`bcryptjs`), session cookie `session`, dijaga `src/middleware.ts`.
- **API:** Endpoint di `src/pages/api/` untuk CRUD proyek, upload gambar, dan auth.

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

Deployment menggunakan **Cloudflare Workers** (via `@astrojs/cloudflare` + Wrangler):

1. Build: `npm run build` (menghasilkan `dist/` dengan `_worker.js`).
2. Deploy: `npx wrangler deploy`.
3. Database D1 termigrasi via `npx wrangler d1 migrations apply ksd-portfolio`.

- **Konfigurasi:** `wrangler.jsonc` (binding `DB` → D1, `R2` → R2 bucket, `SESSION_SECRET` env).
- **Output:** `output: 'server'` di `astro.config.mjs` — halaman dirender di Workers, bukan HTML statis.
- **Domain:** `kreasisatudesain.id` (subdomain `baru.kreasisatudesain.id`).
