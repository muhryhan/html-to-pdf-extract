import { FastifyRequest, FastifyReply } from 'fastify';
import { Readable } from 'stream';
import { extractPdfData, extractDocxData } from '../services/extractionService.js';  // Mengimpor fungsi ekstraksi dari extractor.js
import { fileURLToPath } from 'url';
import path from 'path';
import fsPromises from 'fs/promises';

// Mendapatkan __dirname dari file ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants untuk path file data dan template
const EXTRACT_PATH = path.join(__dirname, '../../public/extract-data.html');

/**
 * Controller untuk menyajikan HTML extract ke browser.
 */
export async function serveHtmlExtract(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Membaca file HTML
      const template = await fsPromises.readFile(EXTRACT_PATH, 'utf-8');
      return reply.type('text/html').send(template);
    } catch (error) {
      // Log error dan kirimkan status 500 jika terjadi kesalahan
      request.log.error('Failed to read template:', error);
      return reply.status(500).send({ error: 'Failed to load form template' });
    }
  }

/**
 * Fungsi untuk mengonversi stream menjadi buffer
 */
function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

/**
 * Controller untuk menangani pengunggahan dan ekstraksi file
 */
export async function uploadAndExtractFile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
        // Mendapatkan file yang diunggah
        const data = await request.file();

        if (!data) {
            return reply.status(400).send({ error: 'File tidak ditemukan' });
        }

        // Menentukan tipe file berdasarkan ekstensi
        const fileType = data.filename.split('.').pop()?.toLowerCase();

        // Validasi jenis file yang didukung (pdf atau docx)
        if (!fileType || !['pdf', 'docx'].includes(fileType)) {
            return reply.status(400).send({ error: 'Jenis file tidak didukung' });
        }

        // Mengonversi stream file menjadi buffer
        const fileBuffer = await streamToBuffer(data.file);

        // Menggunakan helper ekstraksi sesuai dengan tipe file
        let extractedData: string;
        if (fileType === 'pdf') {
            extractedData = await extractPdfData(fileBuffer);
        } else if (fileType === 'docx') {
            extractedData = await extractDocxData(fileBuffer);
        } else {
            return reply.status(400).send({ error: 'Jenis file tidak didukung untuk ekstraksi' });
        }

        // Kirim data hasil ekstraksi ke frontend
        return reply.send({ extractedData });
    } catch (error) {
        console.error('Error during file extraction:', error);
        return reply.status(500).send({ error: 'Terjadi kesalahan saat ekstraksi' });
    }
}