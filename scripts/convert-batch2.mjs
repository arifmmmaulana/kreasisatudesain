import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "aset-portfolio-batch2";
const OUT = "public/images/projects";

const jobs = [
  {
    dir: "BINTARO RESIDENCE, 2013",
    slug: "bintaro-residence",
    files: ["villa BR1.png", "vbr1.png"],
  },
  {
    dir: "BSD CITY, 2014",
    slug: "bsd-city",
    files: [
      "20141008_160645.jpg",
      "20141008_160723.jpg",
      "20141008_160748.jpg",
      "20141201_092656.jpg",
      "20141201_092718.jpg",
    ],
  },
  {
    dir: "CONCEPT DESIGN  CIBUBUR COUNTRY, 2025",
    slug: "concept-design-cibubur",
    files: [
      "WhatsApp Image 2025-08-08 at 17.57.39_855893dc.jpg",
      "WhatsApp Image 2025-08-08 at 23.19.15_e2f197f8.jpg",
    ],
  },
  {
    dir: "CORN FIELD, CIBUBUR COUNTRY 2025",
    slug: "corn-field-cibubur",
    files: [
      "WhatsApp Image 2026-09-29 at 14.28.04.jpeg",
      "WhatsApp Image 2026-09-29 at 14.28.03.jpeg",
      "WhatsApp Image 2026-09-29 at 14.28.00.jpeg",
      "WhatsApp Image 2026-09-29.jpeg",
      "WhatsApp Image 2026-09-29 1.jpeg",
      "WhatsApp Image 2026.jpeg",
    ],
  },
  {
    dir: "interior Karawaci 2025",
    slug: "interior-karawaci",
    files: [
      "WhatsApp Image 2025-07-07 at 15.08.00_b5043005.jpg",
      "WhatsApp Image 2025-07-07 at 15.09.15_8d6aa4f4.jpg",
    ],
  },
  {
    dir: "Leuwinanggung,2023",
    slug: "leuwinanggung-depok",
    startIndex: 5,
    files: [
      "WhatsApp Image 2024-07-09 at 10.38.12_4961b3d2.jpg",
      "WhatsApp Image 2024-07-09 at 10.38.14_c3e8e4f2.jpg",
    ],
  },
  {
    dir: "Palem semi, Karawaci 2024",
    slug: "palem-semi-karawaci",
    startIndex: 5,
    files: [
      "WhatsApp Image 2025-07-30 at 16.22.56_405b0610.jpg",
      "WhatsApp Image 2025-07-30 at 16.22.56_d1a0baa8.jpg",
      "WhatsApp Image 2025-07-30 at 16.22.58_cdd4f0fa.jpg",
      "WhatsApp Image 2025-11-05 at 21.49.26_e5de3552.jpg",
    ],
  },
];

const MAX_WIDTH = 1600;
const QUALITY = 82;

for (const job of jobs) {
  const start = job.startIndex ?? 1;
  for (let i = 0; i < job.files.length; i++) {
    const inputPath = path.join(SRC, job.dir, job.files[i]);
    if (!fs.existsSync(inputPath)) {
      console.error(`MISSING: ${inputPath}`);
      continue;
    }
    const outputName = `${job.slug}-${start + i}.webp`;
    const outputPath = path.join(OUT, outputName);
    const img = sharp(inputPath).rotate();
    const meta = await img.metadata();
    if (meta.width > MAX_WIDTH) {
      img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const info = await img
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);
    console.log(
      `${outputName} (${meta.width}x${meta.height}) -> ${(info.size / 1024).toFixed(1)}KB`
    );
  }
}
