// app.ts dan server.ts: Mengatur dan menjalankan server Fastify.
import Fastify from 'fastify';
import root from './routes/root.js';  // Mengimpor route dasar dari `root.js`

// Membuat instance server Fastify
const fastify = Fastify();

// Mendaftarkan route root ke dalam instance Fastify
fastify.register(root);

// Menjalankan server Fastify pada port 3000 dengan alamat host '0.0.0.0'
fastify.listen({ port: 6000, host: '0.0.0.0' }, (err, address) => {
  // Menangani kesalahan jika terjadi saat server dijalankan
  if (err) {
    console.error(err);  // Mencetak pesan kesalahan ke konsol
    process.exit(1);     // Menghentikan proses jika terjadi kesalahan
  }
  // Menampilkan pesan bahwa server telah berhasil dijalankan
  console.log(`Server listening on ${address}`);
});