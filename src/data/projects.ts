export interface Project {
  id: string;
  title: string;
  category: "Rumah Tinggal" | "Komersial" | "Interior" | "Renovasi";
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
}

export const projectsData: Project[] = [
  {
    id: "palem-semi-karawaci",
    title: "Rumah Tinggal Palem Semi",
    category: "Rumah Tinggal",
    location: "Palem Aren VI No.21-22, Perum Palem Semi, Karawaci",
    year: "2024",
    coverImage: "/images/projects/sect-porto-1@2x.webp",
    gallery: [
      "/images/projects/sect-porto-1@2x.webp",
      "/images/projects/sect-porto-1-2@2x.webp",
      "/images/projects/sect-porto-1-3@2x.webp",
      "/images/projects/sect-porto-1-4@2x.webp"
    ],
    description: "Perancangan hunian modern dengan fasad bernuansa kontemporer yang elegan. Menghadirkan bukaan jendela optimal untuk sirkulasi angin tropis dan pencahayaan alami yang maksimal.",
    highlights: ["Modern Contemporary", "Pencahayaan Alami", "Material Kayu & Kaca", "Ruang Terbuka"]
  },
  {
    id: "leuwinanggung-depok",
    title: "Rumah Tinggal Leuwinanggung",
    category: "Rumah Tinggal",
    location: "Leuwinanggung, Tapos, Depok",
    year: "2023",
    coverImage: "/images/projects/sect-porto-2@2x.webp",
    gallery: [
      "/images/projects/sect-porto-2@2x.webp",
      "/images/projects/sect-porto-2-2@2x.webp",
      "/images/projects/sect-porto-2-3@2x.webp",
      "/images/projects/sect-porto-2-4@2x.webp"
    ],
    description: "Desain rumah tinggal dengan integrasi lanskap hijau, volume bangunan geometris yang tegas, serta permainan tekstur dinding dan kisi-kisi kayu yang menyejukkan.",
    highlights: ["Tropical Architecture", "Inner Courtyard", "Desain Fasad Geometris", "Taman Tropis"]
  },
  {
    id: "bukit-dago-bogor",
    title: "Rumah Tinggal Bukit Dago",
    category: "Rumah Tinggal",
    location: "Jl. Arkadia A8 No.15, Bukit Dago, Gunung Sindur, Bogor",
    year: "2023",
    coverImage: "/images/projects/sect-porto-3-1@2x.webp",
    gallery: [
      "/images/projects/sect-porto-3-1@2x.webp",
      "/images/projects/sect-porto-3-2@2x.webp"
    ],
    description: "Rumah tinggal 2 lantai dengan pemanfaatan ruang yang sangat efisien dan fungsional. Konsep minimalis modern yang memberikan kesan lapang dan nyaman bagi keluarga.",
    highlights: ["Minimalis Modern", "2 Lantai Efisien", "Tata Ruang Open Space", "Ventilasi Silang"]
  },
  {
    id: "alam-sutera",
    title: "Rumah Tinggal Alam Sutera",
    category: "Rumah Tinggal",
    location: "Jl. Sutera Cemara IV 2A, Alam Sutera",
    year: "2021",
    coverImage: "/images/projects/sec-port41@2x.webp",
    gallery: [
      "/images/projects/sec-port41@2x.webp",
      "/images/projects/sec-port42-rev@2x.webp"
    ],
    description: "Hunian prestisius dengan perpaduan arsitektur modern tropis dan sentuhan material premium. Memadukan keindahan visual dengan kenyamanan hidup berkualitas tinggi.",
    highlights: ["Luxury Living", "Fasad Premium", "Sirkulasi Udara Tropis", "Taman Samping"]
  }
];
