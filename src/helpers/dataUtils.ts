import fs from 'fs/promises';

/**
 * Membaca file JSON dan mengembalikan data yang diparsing
 * @param filePath Path file JSON
 * @returns Data yang sudah di-parse dari file JSON
 */
export async function readJsonFile(filePath: string): Promise<{ encodedHtml: string }> {
  const rawData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(rawData);
}

/**
 * Decode string dari Base64 ke utf-8
 * @param encodedString String yang di-encode menggunakan Base64
 * @returns String hasil decoding
 */
export function decodeBase64(encodedString: string): string {
  return Buffer.from(encodedString, 'base64').toString('utf-8');
}
