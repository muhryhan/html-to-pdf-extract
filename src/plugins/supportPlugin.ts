import fp from 'fastify-plugin';

// Mendefinisikan interface untuk opsi plugin Support
export interface SupportPluginOptions {
}

// Menggunakan fastify-plugin untuk mengekspor decorator ke lingkup luar
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  // Menambahkan decorator baru bernama `someSupport` yang mengembalikan string 'hugs' saat dipanggil
  fastify.decorate('someSupport', function () {
    return 'hugs';
  });
});

// Ketika menggunakan .decorate, kita harus menentukan properti tambahan untuk TypeScript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}