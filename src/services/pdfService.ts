import { chromium } from 'playwright';
import { FastifyReply } from 'fastify';

/**
 * Menghasilkan PDF dari konten HTML menggunakan Playwright
 * @param htmlContent Konten HTML untuk di-generate menjadi PDF
 * @returns Buffer dari PDF yang dihasilkan
 */
export async function generatePdf(htmlContent: string): Promise<Buffer> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}

/**
 * Mengirim respons berupa PDF dengan header yang sesuai
 * @param reply FastifyReply object untuk mengirimkan respons
 * @param pdfBuffer Buffer dari file PDF yang dihasilkan
 */
export function sendPdfResponse(reply: FastifyReply, pdfBuffer: Buffer) {
  return reply
    .type('application/pdf')
    .header('Content-Disposition', 'attachment; filename="output.pdf"')
    .send(pdfBuffer);
}