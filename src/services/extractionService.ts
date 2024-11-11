import pdf = require('pdf-parse');
import * as docx from 'mammoth';

/**
 * Fungsi untuk mengekstrak teks dari file PDF
 * @param fileBuffer Buffer dari file PDF
 * @returns Teks hasil ekstraksi dari file PDF
 */
export async function extractPdfData(fileBuffer: Buffer): Promise<string> {
    try {
        const pdfData = await pdf(fileBuffer);
        return pdfData.text;
    } catch (error) {
        console.error('Error extracting PDF data:', error);
        throw new Error('Failed to extract PDF data');
    }
}

/**
 * Fungsi untuk mengekstrak teks dari file DOCX
 * @param fileBuffer Buffer dari file DOCX
 * @returns Teks hasil ekstraksi dari file DOCX
 */
export async function extractDocxData(fileBuffer: Buffer): Promise<string> {
    try {
        const result = await docx.extractRawText({ buffer: fileBuffer });
        return result.value;
    } catch (error) {
        console.error('Error extracting DOCX data:', error);
        throw new Error('Failed to extract DOCX data');
    }
}