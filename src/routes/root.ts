import { FastifyPluginAsync } from "fastify";
import fastifyFormBody from '@fastify/formbody'; // Plugin untuk mem-parsing form body dalam request POST
import staticPlugin from '../plugins/staticPlugin.js'; // Mengimpor plugin untuk serving file statis

// Import handler (logic) dari controllers.ts
import { 
  serveHtmlTemplate, saveEncodedHtml, 
  viewDecodedHtml, generatePdfFromHtmlGet, 
  generatePdfFromHtmlPost 
} from '../controllers/appController.js';

/**
 * Root plugin yang mendefinisikan rute-rute utama aplikasi.
 * Semua rute dipisahkan dari logic yang diimplementasikan dalam controllers.ts.
 * 
 * @param fastify - Instance Fastify yang digunakan untuk mendaftarkan rute dan plugin.
 * @param opts - Opsi yang diteruskan ke plugin, jika diperlukan.
 * @returns Promise<void> - Mengembalikan Promise yang menandakan bahwa plugin telah selesai terdaftar.
 */
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // Registrasi plugin untuk mem-parsing body dari request POST
  await fastify.register(fastifyFormBody);

  // Mendaftarkan plugin static dari staticPlugin.ts
  await fastify.register(staticPlugin);
  
  // RUTE
  // Rute untuk menyajikan halaman Utama
  fastify.get('/', serveHtmlTemplate);
  
  // Rute untuk menyimpan HTML yang di-encode ke file
  fastify.post('/save-data', saveEncodedHtml);
  
  // Rute untuk menampilkan HTML yang sudah di-decode dari base64
  fastify.get('/view-decoded-html', viewDecodedHtml);
  
  // Rute untuk generate PDF dari HTML (GET method)
  fastify.get('/generate-pdf-get', generatePdfFromHtmlGet);
  
  // Rute untuk generate PDF dari HTML (POST method)
  fastify.post('/generate-pdf-post', generatePdfFromHtmlPost);
};

export default root;
