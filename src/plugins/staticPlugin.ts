import { FastifyPluginAsync } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

// Mendapatkan __dirname untuk menentukan direktori file saat ini
const __filename = fileURLToPath(import.meta.url); // Mengonversi URL modul menjadi path file
const __dirname = path.dirname(__filename); // Mengambil direktori dari path file

// Mendefinisikan direktori sumber untuk serving file statis
const DIST_DIR = path.join(__dirname, '../../dist');

/**
 * Plugin Fastify untuk menyajikan file statis.
 * 
 * Plugin ini mengonfigurasi Fastify untuk melayani file statis dari direktori yang
 * ditentukan, memungkinkan akses ke file seperti CSS, JavaScript, dan gambar.
 * 
 * @param {FastifyInstance} fastify - Instance Fastify yang digunakan untuk mendaftar plugin.
 * @param {Object} opts - Opsi tambahan untuk plugin (opsional).
 * 
 * @returns {Promise<void>}
 */
const staticPlugin: FastifyPluginAsync = async (fastify, opts) => {
  // Mendaftarkan plugin fastifyStatic untuk melayani file statis
  await fastify.register(fastifyStatic, {
    root: [DIST_DIR], // Menentukan root directory untuk file statis
    prefix: '/dist/', // Prefix untuk URL yang diakses untuk file statis
  });
};

export default staticPlugin;