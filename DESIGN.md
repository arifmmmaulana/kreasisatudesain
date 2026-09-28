# Sistem Desain (DESIGN.md)

Dokumen ini menjelaskan filosofi visual, tipografi, warna, dan pola antarmuka pengguna (UI) dari website Kreasi Satu Desain.

## 1. Filosofi Desain

- **Gaya Visual:** *Modern Architectural Elegance & Clean Contemporary Warmth*.
- Fokus pada tampilan yang *clean*, profesional, lapang (menggunakan banyak *white-space*), dengan sentuhan elegan untuk menonjolkan citra kelas atas *(premium/trustworthy)* pada karya arsitektur perusahaan.

## 2. Palet Warna (Color Palette)

Warna merek diatur pada file `src/styles/global.css` dalam blok direktif `@theme` milik Tailwind CSS v4.

| Variabel CSS Tailwind | Nilai HEX | Deskripsi & Penggunaan |
| :--- | :--- | :--- |
| `--color-brand-cream` | `#FAF8F5` | *Off-White Alabaster*. Digunakan sebagai warna latar belakang (background) utama seluruh halaman. |
| `--color-brand-warm` | `#F5F0EB` | *Warm Linen Sand*. Digunakan sebagai latar sekunder (misal: di bagian *Why Us* atau *Social Links*). |
| `--color-brand` | `#6B82A8` | *Steel Blue/Slate*. Warna brand primer. Digunakan pada tombol utama, teks *highlight*, aksen garis. |
| `--color-brand-dark` | `#4A6380` | *Deep Navy Slate*. Digunakan pada teks *link* aktif, banner CTA, dan teks penting yang butuh kontras tinggi. |
| `--color-brand-light` | `#E8EDF4` | *Ice Blue/Soft Blue*. Digunakan untuk latar *pill badges* (kategori) dan *tag backgrounds*. |
| (WhatsApp Default) | `#059669` / `#10B981`| *Emerald Green*. Warna khusus tindakan konsultasi WhatsApp, mencerminkan kepercayaan dan tindakan segera. |
| (Neutral Dark) | `#1C1917` / `#292524` | *Stone-900 / Stone-800*. Warna dasar teks (bukan `#000000` pekat agar lebih lembut di mata). |

## 3. Tipografi

Sistem menggunakan font yang dikendalikan melalui `global.css` (secara mayoritas *self-hosted* format WOFF2):

- **Font Tubuh (Sans-Serif):** `Plus Jakarta Sans`
  - *Weights:* 300 hingga 800.
  - *Karakteristik:* Modernis, *clean*, dan keterbacaan tinggi di berbagai ukuran layar. Digunakan pada badan paragraf teks, label UI, menu navigasi, dan tombol.
- **Font Display (Serif):** `DM Serif Display`
  - *Weights:* 400.
  - *Karakteristik:* Membawa kesan editorial yang kuat dan keanggunan *premium*. Digunakan khusus untuk judul seksi *(Section Headings)*, kutipan, dan angka dekoratif besar.
- **Font Khusus (Monospace/Condensed):** `Unica One`
  - *Karakteristik:* Tegas dan terstruktur (arsitektural). Saat ini digunakan secara spesifik (via Google Fonts import) di `Hero.astro` untuk *headline* (menggunakan *uppercase* text).

## 4. Komponen UI (Spesifikasi)

Komponen dasar (atomic) direpresentasikan di folder `src/components/ui/` yang banyak menggunakan pustaka `class-variance-authority` (CVA).

- **Tombol (`Button`):**
  - Menggunakan 5 varian gaya: *default* (biru brand), *secondary* (abu-abu terang), *outline* (berbingkai transparan), *ghost* (tanpa batas/batas menghilang), *whatsapp* (hijau).
  - Tampilan: *Border radius* `rounded-xl`, berbayang halus (`shadow-sm`), dan bereaksi ketika diklik (efek transisi tekan `active:scale-98`).
- **Lencana (`Badge`):**
  - Tampilan *pill* berakhiran membulat penuh (`rounded-lg`).
  - Menggunakan pewarnaan latar bernuansa redup (misal: `bg-brand-light` dan tulisan `text-brand-dark`) untuk tanda kategori atau status.
- **Kartu (Cards):**
  - Tampilan dominan memiliki sudut membulat (`rounded-2xl`).
  - Garis tepi lembut (`border-stone-200`).
  - Bayangan transisi (dari statis `shadow-sm` hingga interaktif hover `shadow-lg`).
- **Modal Lightbox (Interaktif di Portofolio):**
  - Desain dua lapis:
    - Lapis pertama: Informasi detail proyek (seperti kartu lebar) dengan latar kaca buram (`bg-black/75 backdrop-blur-md`).
    - Lapis kedua: Mode *Fullscreen Zoom* untuk menilik detail gambar (`bg-black/95 backdrop-blur-xl`) dengan tombol navigasi melayang (Chevron/Panah) untuk navigasi sentuh maupun *keyboard*.
- **Timeline Lintas Masa (Why Us):**
  - Desktop: Garis pembelah tengah *(center-split)* berbentuk *zigzag*. Garis melayang perlahan dengan pewarnaan transisi gradien halus (`from-brand/20`).
  - Angka desain *(Watermark Numbering)*: Menggunakan font tampilan (`DM Serif Display`), ditebalkan, diperbesar (`text-7xl`), dengan *opacity* direduksi hingga 15% untuk menjadi latar teks estetik.
