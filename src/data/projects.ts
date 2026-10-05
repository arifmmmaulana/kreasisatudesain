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
    id: "concept-design-cibubur",
    title: "Concept Design Cibubur Country",
    category: "Komersial",
    location: "Cibubur Country, Bogor",
    year: "2025",
    coverImage: "/images/projects/concept-design-cibubur-1.webp",
    gallery: [
      "/images/projects/concept-design-cibubur-1.webp",
      "/images/projects/concept-design-cibubur-2.webp"
    ],
    description: "",
    highlights: ["Concept Design", "Kawasan Terpadu", "Visualisasi 3D"]
  },
  {
    id: "corn-field-cibubur",
    title: "Corn Field Cibubur Country",
    category: "Rumah Tinggal",
    location: "Cibubur Country, Bogor",
    year: "2025",
    coverImage: "/images/projects/corn-field-cibubur-1.webp",
    gallery: [
      "/images/projects/corn-field-cibubur-1.webp",
      "/images/projects/corn-field-cibubur-2.webp",
      "/images/projects/corn-field-cibubur-3.webp",
      "/images/projects/corn-field-cibubur-4.webp",
      "/images/projects/corn-field-cibubur-5.webp",
      "/images/projects/corn-field-cibubur-6.webp"
    ],
    description: "",
    highlights: ["Tropical Modern", "Nuansa Alam", "Pencahayaan Alami"]
  },
  {
    id: "interior-karawaci",
    title: "Interior Karawaci",
    category: "Interior",
    location: "Karawaci, Tangerang",
    year: "2025",
    coverImage: "/images/projects/interior-karawaci-1.webp",
    gallery: [
      "/images/projects/interior-karawaci-1.webp",
      "/images/projects/interior-karawaci-2.webp"
    ],
    description: "",
    highlights: ["Desain Interior", "Modern Living", "Detail Finishing"]
  },
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
      "/images/projects/sect-porto-1-4@2x.webp",
      "/images/projects/palem-semi-karawaci-5.webp",
      "/images/projects/palem-semi-karawaci-6.webp",
      "/images/projects/palem-semi-karawaci-7.webp",
      "/images/projects/palem-semi-karawaci-8.webp"
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
      "/images/projects/sect-porto-2-4@2x.webp",
      "/images/projects/leuwinanggung-depok-5.webp",
      "/images/projects/leuwinanggung-depok-6.webp"
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
  },
  {
    id: "bsd-city",
    title: "Bangunan BSD City",
    category: "Komersial",
    location: "BSD City, Tangerang Selatan",
    year: "2014",
    coverImage: "/images/projects/bsd-city-1.webp",
    gallery: [
      "/images/projects/bsd-city-1.webp",
      "/images/projects/bsd-city-2.webp",
      "/images/projects/bsd-city-3.webp",
      "/images/projects/bsd-city-4.webp",
      "/images/projects/bsd-city-5.webp"
    ],
    description: "",
    highlights: ["Bangunan Komersial", "Manajemen Proyek", "Konstruksi"]
  },
  {
    id: "bintaro-residence",
    title: "Bintaro Residence",
    category: "Rumah Tinggal",
    location: "Bintaro, Tangerang Selatan",
    year: "2013",
    coverImage: "/images/projects/bintaro-residence-1.webp",
    gallery: [
      "/images/projects/bintaro-residence-1.webp",
      "/images/projects/bintaro-residence-2.webp"
    ],
    description: "",
    highlights: ["Hunian Klasik", "Desain Villa", "Taman Luas"]
  }
];
