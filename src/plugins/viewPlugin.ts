// viewPlugin.ts
import { FastifyPluginAsync } from 'fastify';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mendapatkan __dirname untuk menghindari masalah dengan path di ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendefinisikan direktori views untuk menyimpan template EJS
const VIEWS_DIR = path.join(__dirname, '../../src/views');

// Mendefinisikan plugin Fastify untuk rendering tampilan
const viewPlugin: FastifyPluginAsync = async (fastify, opts) => {
  await fastify.register(fastifyView, {
    engine: { ejs }, // Mengatur EJS sebagai engine template
    root: VIEWS_DIR,  // Menetapkan direktori tempat template EJS berada
  });
};

export default viewPlugin;
