import fastifyMultipart from '@fastify/multipart';

export async function fileUploadPlugin(fastify: any) {
    fastify.register(fastifyMultipart, { addToBody: true });
}