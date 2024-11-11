import { FastifyRequest, FastifyReply } from 'fastify';
import { fileURLToPath } from 'url';
import path from 'path';
import fsPromises from 'fs/promises';
import { readJsonFile, decodeBase64 } from '../helpers/dataUtils.js';
import { generatePdf, sendPdfResponse } from '../services/pdfService.js';
import { handleError } from '../helpers/errorHandler.js';

// Mendapatkan __dirname dari file ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants untuk path file data dan template
const DATA_FILE_PATH = path.join(__dirname, '../data.json'); // Lokasi file JSON untuk menyimpan encoded HTML
const TEMPLATE_PATH = path.join(__dirname, '../../public/index.html');

/**
 * Controller untuk menyajikan HTML template ke browser.
 */
export async function serveHtmlTemplate(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Membaca file HTML
    const template = await fsPromises.readFile(TEMPLATE_PATH, 'utf-8');
    return reply.type('text/html').send(template);
  } catch (error) {
    // Log error dan kirimkan status 500 jika terjadi kesalahan
    request.log.error('Failed to read template:', error);
    return reply.status(500).send({ error: 'Failed to load form template' });
  }
}

/**
 * Controller untuk menyimpan encoded HTML ke dalam file JSON.
 */
export async function saveEncodedHtml(request: FastifyRequest, reply: FastifyReply) {
  const { encodedHtml } = request.body as { encodedHtml: string };
  try {
    // Menyimpan encodedHtml ke dalam file JSON
    await fsPromises.writeFile(DATA_FILE_PATH, JSON.stringify({ encodedHtml }));
    return reply.send({ message: 'Data saved successfully!' });
  } catch (error) {
    // Log error dan kirimkan status 500 jika terjadi kesalahan
    request.log.error('Error saving data:', error);
    reply.status(500).send({ error: 'Failed to save data' });
  }
}

/**
 * Controller untuk mendekode dan menampilkan HTML yang telah disimpan dalam file JSON.
 */
export async function viewDecodedHtml(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Membaca file JSON dan mendekode HTML dari base64
    const jsonData = await readJsonFile(DATA_FILE_PATH);
    const decodedHtml = decodeBase64(jsonData.encodedHtml);
    reply.type('text/html').send(decodedHtml); // Mengirimkan decoded HTML sebagai respons
  } catch (error) {
    handleError(reply, error, 'Error decoding HTML'); // Menangani error
  }
}

/**
 * Controller untuk mengenerate PDF dari HTML yang diambil menggunakan metode GET.
 */
export async function generatePdfFromHtmlGet(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Membaca file JSON dan mendekode HTML dari base64
    const jsonData = await readJsonFile(DATA_FILE_PATH);
    const decodedHtml = decodeBase64(jsonData.encodedHtml);
    // Mengenerate PDF dari HTML
    const pdfBuffer = await generatePdf(decodedHtml);
    return sendPdfResponse(reply, pdfBuffer);
  } catch (error) {
    handleError(reply, error, 'Error generating PDF from GET');
  }
}

/**
 * Controller untuk mengenerate PDF dari HTML yang di-post oleh client.
 */
export async function generatePdfFromHtmlPost(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Mengambil encodedHtml dari body request
    const { encodedHtml } = request.body as { encodedHtml: string };
    const decodedHtml = decodeBase64(encodedHtml); // Mendekode HTML dari base64
    const pdfBuffer = await generatePdf(decodedHtml); // Mengenerate PDF dari HTML
    return sendPdfResponse(reply, pdfBuffer); // Mengirimkan file PDF sebagai respons
  } catch (error) {
    handleError(reply, error, 'Error generating PDF from POST');
  }
}