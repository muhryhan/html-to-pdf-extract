declare module '@fastify/static' {
  import { FastifyPluginAsync } from 'fastify';

  interface FastifyStaticOptions {
    root: string;
    prefix?: string;
  }

  const fastifyStatic: FastifyPluginAsync<FastifyStaticOptions>;
  export default fastifyStatik;
}
