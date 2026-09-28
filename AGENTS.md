# Panduan AI Agent & Kontributor (AGENTS.md)

Dokumen ini berisi panduan, konteks, dan aturan main (guardrails) bagi AI Agent atau kontributor manusia yang akan bekerja pada *codebase* Kreasi Satu Desain.

## 1. Identitas & Konteks Proyek

- **Nama Proyek:** Kreasi Satu Desain
- **Deskripsi:** Website profil perusahaan desain arsitektur dan konstruksi bangunan yang berlokasi di Cibubur Country, Bogor, Indonesia.
- **Tujuan:** Menampilkan portofolio, layanan, informasi perusahaan, dan mempermudah calon klien untuk melakukan konsultasi via WhatsApp.
- **Domain:** `kreasisatudesain.id` (dengan subdomain `baru.kreasisatudesain.id`)

## 2. Tech Stack & Guardrails

- **Framework:** Astro 5 (Static Site Generator)
- **Styling:** Tailwind CSS v4
- **UI Framework:** React 19 (hanya untuk komponen interaktif via Astro Islands)
- **Bahasa:** TypeScript (Strict Mode)

### Aturan Penting (Guardrails):
1. **Tailwind CSS v4:** 
   - **JANGAN** membuat file `tailwind.config.js` atau `postcss.config.js`. 
   - Konfigurasi Tailwind v4 dilakukan di dalam file `src/styles/global.css` menggunakan direktif `@theme`.
2. **Pemilihan Komponen (`.astro` vs `.tsx`):**
   - **Gunakan `.astro`** secara default untuk sebagian besar konten statis (Hero, Navbar, Footer, text sections, dll) demi performa maksimal (zero JS).
   - **Gunakan `.tsx` (React)** HANYA ketika membutuhkan state management klien atau interaktivitas tinggi (seperti `PortfolioSection.tsx` yang butuh modal lightbox, filter, dll). Gunakan direktif seperti `client:load` atau `client:visible` pada Astro Islands.
3. **Data Management:**
   - Tidak menggunakan CMS eksternal. Semua data terpusat di `src/data/` (seperti `company.ts`, `projects.ts`, `services.ts`) dengan *strong typing*.
4. **Integrasi Komunikasi:**
   - Seluruh aksi kontak/CTA difokuskan pada WhatsApp. 
   - Gunakan fungsi utilitas dari `src/lib/whatsapp.ts` untuk meng-*generate* link WhatsApp (`wa.me`) dengan pesan yang telah dikonfigurasi berdasarkan konteks (misal: spesifik berdasarkan layanan atau proyek yang dilihat).
5. **Aset:**
   - Gambar harus menggunakan format WebP untuk kompresi maksimal.
   - Font di-*host* secara mandiri (self-hosted WOFF2) di `public/fonts/` dan dideklarasikan di `global.css`. JANGAN gunakan Google Fonts CDN untuk menghindari isu privasi dan latensi (kecuali untuk pengecualian khusus yang belum di-migrasi).

## 3. Struktur Direktori Utama

- `src/components/`: Komponen UI (dibagi menjadi `about`, `common`, `home`, dan `ui`).
- `src/data/`: Data statis *type-safe* (perusahaan, proyek, layanan).
- `src/layouts/`: Layout utama (`BaseLayout.astro`) untuk konsistensi halaman.
- `src/lib/`: Fungsi utilitas (`utils.ts`, `whatsapp.ts`).
- `src/pages/`: Routing berbasis file (`index.astro`, `about.astro`).
- `src/styles/`: Global CSS dan konfigurasi Tailwind v4 `@theme`.
- `public/`: Aset statis (font, gambar WebP, video kompresi).

## 4. Perintah Umum (Commands)

- `npm run dev` : Menjalankan server lokal dengan HMR.
- `npm run build` : Melakukan *build* untuk produksi (menghasilkan folder `dist/`).
- `npm run preview` : Menjalankan server pratinjau dari hasil *build* lokal.
