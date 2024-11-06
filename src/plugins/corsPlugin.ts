import { FastifyPluginAsync } from "fastify";
import fastifyCors from "@fastify/cors";

/**
 * Plugin CORS untuk Fastify.
 * 
 * Plugin ini memungkinkan pengaturan kebijakan CORS (Cross-Origin Resource Sharing)
 * yang mengontrol akses dari domain lain ke server ini.
 * 
 * @param {FastifyInstance} fastify - Instance Fastify yang digunakan untuk mendaftar plugin.
 * 
 * @returns {Promise<void>} - Mengembalikan promise yang menyelesaikan saat plugin terdaftar.
 */
const corsConfig: FastifyPluginAsync = async (fastify) => {
  // Mendaftarkan plugin fastifyCors dengan konfigurasi khusus
  await fastify.register(fastifyCors, {
    // Mengatur kebijakan origin untuk mengizinkan atau menolak permintaan CORS
    origin: (origin, cb) => {
      if (!origin) {
        cb(null, true); // Memanggil callback dengan null (tidak ada error) dan true (izinkan)
        return;
      }
      // Menolak semua permintaan CORS dari origin lain dengan error
      cb(new Error("Not allowed by CORS"), false);
    },
  });
};

export default corsConfig;