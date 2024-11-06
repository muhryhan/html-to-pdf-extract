import { FastifyReply } from 'fastify';

/**
 * Menangani error dan mengirim respons error 500 dengan pesan yang sesuai
 * @param reply FastifyReply object untuk mengirimkan respons
 * @param error Error yang terjadi
 * @param message Pesan error yang ingin ditampilkan
 */
export function handleError(reply: FastifyReply, error: unknown, message: string) {
  console.error(`${message}:`, error);
  reply.status(500).send({ error: message });
}
