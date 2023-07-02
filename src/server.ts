import Fastify from 'fastify';
import { fastifyStatic } from '@fastify/static';

const fastify = Fastify({
    logger: true
});

fastify.register(fastifyStatic, {
    root: __dirname
});

['/', '/order'].forEach(route => {
    fastify.route({
        method: ['GET'],
        url: route,
        handler: (request, reply) => {
            reply.sendFile('index.html');
        }
    })
})


fastify.listen({ port: 3000 }, function(err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.log.info(`Server is now listening on ${address}`);
});
