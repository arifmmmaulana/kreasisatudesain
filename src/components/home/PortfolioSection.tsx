import React, { useState, useEffect } from "react";
import type { Project } from "@/data/projects";
import { getProjectWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Calendar, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Props {
  projects: Project[];
}

export default function PortfolioSection({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const categories = ["Semua", "Rumah Tinggal", "Interior", "Komersial"];

  const filteredProjects =
    activeCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Lock body scroll and handle keyboard navigation when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isZoomOpen) {
            setIsZoomOpen(false);
          } else {
            setSelectedProject(null);
          }
        } else if (e.key === "ArrowRight") {
          setActiveImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
        } else if (e.key === "ArrowLeft") {
          setActiveImageIndex((prev) =>
            prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
          );
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject, isZoomOpen]);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setIsZoomOpen(false);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsZoomOpen(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  };

  return (
    <section id="portofolio" className="py-24 bg-stone-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-stone-900 mb-3">
              Galeri Portofolio Proyek
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Showcase proyek rancang bangun nyata yang telah kami selesaikan dengan pendekatan arsitektur fungsional dan estetika modern.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand text-white shadow-md"
                    : "bg-white border border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200 hover:border-brand/40 transition-all duration-300 cursor-pointer hover:shadow-lg"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                {/* Badges Top Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-medium text-brand-dark">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-xs text-stone-600">
                    <Calendar className="h-3 w-3 text-brand" />
                    {project.year}
                  </span>
                </div>

                {/* Floating "View Detail" on Hover */}
                <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold font-display text-stone-900 group-hover:text-brand transition-colors mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-stone-500 font-light">
                    <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>
                </div>

                {/* Highlight Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 mt-4">
                  {project.highlights.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-brand-light px-2.5 py-1 text-[11px] text-brand-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal / Project Detail Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 text-stone-900 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
              aria-label="Tutup detail proyek"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Gallery Big Image View (Clickable to Zoom Fullscreen) */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="group/img relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-100 mb-4 cursor-zoom-in"
              title="Klik untuk melihat foto ukuran penuh"
            >
              <img
                src={selectedProject.gallery[activeImageIndex]}
                alt={`${selectedProject.title} foto ${activeImageIndex + 1}`}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
              />

              {/* Image Counter Badge */}
              {selectedProject.gallery.length > 1 && (
                <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white">
                  {activeImageIndex + 1} / {selectedProject.gallery.length}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {selectedProject.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {selectedProject.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-brand ring-2 ring-brand/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Project Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-brand-light px-3 py-1 text-xs text-brand-dark font-medium">
                  {selectedProject.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Calendar className="h-3.5 w-3.5 text-brand" />
                  Tahun Pengerjaan: {selectedProject.year}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
                {selectedProject.title}
              </h3>

              <div className="flex items-start gap-2 text-sm text-stone-500">
                <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                <span>{selectedProject.location}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.highlights.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-brand-light px-3 py-1 text-xs text-brand-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct WhatsApp Consultation Button */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500">
                  Tertarik mewujudkan konsep desain seperti proyek ini?
                </p>
                <a
                  href={getProjectWhatsAppUrl(
                    selectedProject.title,
                    selectedProject.location
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition shadow-md"
                >
                  Konsultasikan Konsep Ini via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Lightbox View */}
      {isZoomOpen && selectedProject && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition cursor-pointer"
            aria-label="Tutup pratinjau penuh"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Large Image Frame */}
          <div
            className="relative flex items-center justify-center max-w-full max-h-full select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.gallery[activeImageIndex]}
              alt={`${selectedProject.title} foto ${activeImageIndex + 1}`}
              className="max-h-[88vh] max-w-[92vw] sm:max-w-[90vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
            />

            {/* Prev / Next Controls in Zoom */}
            {selectedProject.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-lg cursor-pointer"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-lg cursor-pointer"
                  aria-label="Foto selanjutnya"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Counter & Title Bar */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md px-5 py-2 text-xs sm:text-sm text-white shadow-xl">
            <span className="font-semibold">{selectedProject.title}</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-300">
              {activeImageIndex + 1} / {selectedProject.gallery.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
