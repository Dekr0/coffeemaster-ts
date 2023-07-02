"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const static_1 = require("@fastify/static");
const fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(static_1.fastifyStatic, {
    root: __dirname
});
['/', '/order'].forEach(route => {
    fastify.route({
        method: ['GET'],
        url: route,
        handler: (request, reply) => {
            reply.sendFile('index.html');
        }
    });
});
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server is now listening on ${address}`);
});
