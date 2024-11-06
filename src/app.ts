import * as path from 'path';
import { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'url';
import Fastify from 'fastify';
import staticPlugin from './plugins/staticPlugin.js';
import viewPlugin from './plugins/viewPlugin.js';
import corsPlugin from './plugins/corsPlugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deklarasi direktori global untuk plugins dan routes
const ROUTES_DIR = path.join(__dirname, 'routes');

const server = Fastify(); // Menginisialisasi server Fastify

// Mendaftarkan route dasar
const app: FastifyPluginAsync = async (fastify, opts) => {  
  // Mendaftarkan routes secara otomatis dari folder routes
  await fastify.register(import('@fastify/autoload'), {
    dir: ROUTES_DIR, // Menetapkan direktori routes
    options: opts,
    forceESM: true, // Penggunaan ESM (ECMAScript Modules)
  });

  // Registrasi plugin CORS
  await fastify.register(corsPlugin);

  // Mendaftarkan plugin static dari staticPlugin.ts
  await server.register(staticPlugin);

  // Mendaftarkan plugin view dari viewPlugin.ts
  await server.register(viewPlugin);
};

export default app; // Mengekspor plugin app sebagai default
export { server }; // Mengekspor instance server untuk digunakan di file lain
