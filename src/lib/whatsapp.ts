export const WHATSAPP_NUMBER = "6282112560657";
export const DISPLAY_PHONE = "0821-1256-0657";

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage = "Halo Kreasi Satu Desain, saya ingin konsultasi mengenai rencana desain/konstruksi bangunan. Bisa bantu informasikan tahap awalnya?";
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getServiceWhatsAppUrl(serviceName: string): string {
  const text = encodeURIComponent(
    `Halo Kreasi Satu Desain, saya tertarik dengan layanan *${serviceName}*. Bisakah saya berdiskusi dan konsultasi lebih lanjut?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getProjectWhatsAppUrl(projectTitle: string, location: string): string {
  const text = encodeURIComponent(
    `Halo Kreasi Satu Desain, saya melihat portofolio proyek *${projectTitle}* (${location}) di website. Saya tertarik untuk berkonsultasi mengenai konsep serupa untuk tanah/properti saya.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
