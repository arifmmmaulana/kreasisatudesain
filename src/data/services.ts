export interface ServiceItem {
  id: string;
  title: string;
  category: "Desain Arsitektur" | "Konstruksi Bangunan";
  features: string[];
  ctaLabel: string;
  waQuery: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "desain-arsitektur",
    title: "Desain Arsitektur",
    category: "Desain Arsitektur",
    features: [
      "Desain Bangunan Hunian (Rumah Tinggal, Villa, Apartemen)",
      "Desain Bangunan Komersial (Kantor, Toko, Restoran)",
      "Desain Interior",
      "Perencanaan Tapak (Site Planning)",
      "Visualisasi 3D dan Rendering"
    ],
    ctaLabel: "Konsultasi Desain Arsitektur",
    waQuery: "Jasa Desain Arsitektur"
  },
  {
    id: "konstruksi-bangunan",
    title: "Konstruksi Bangunan",
    category: "Konstruksi Bangunan",
    features: [
      "Pembangunan Baru",
      "Renovasi dan Restorasi",
      "Manajemen Proyek Konstruksi",
      "Pengawasan Lapangan",
      "Konsultasi Teknis"
    ],
    ctaLabel: "Konsultasi Jasa Konstruksi",
    waQuery: "Jasa Konstruksi Bangunan"
  }
];
