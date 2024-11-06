declare module '@fastify/view' {
  import { FastifyPluginAsync } from 'fastify';

  interface FastifyViewOptions {
    engine: { [key: string]: any }; // Sesuaikan dengan opsi yang diperlukan
    root: string;
  }

  const fastifyView: FastifyPluginAsync<FastifyViewOptions>;
  export default fastifyView;
}
