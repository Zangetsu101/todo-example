// src/adapter/cloudflare-pages/handler.ts
var handle = (app) => (eventContext) => {
  return app.fetch(
    eventContext.request,
    { ...eventContext.env, eventContext },
    {
      waitUntil: eventContext.waitUntil,
      passThroughOnException: eventContext.passThroughOnException
    }
  );
};
var serveStatic = () => {
  return async (c) => {
    const env = c.env;
    const res = await env.ASSETS.fetch(c.req.raw);
    if (res.status === 404) {
      return c.notFound();
    }
    return res;
  };
};
export {
  handle,
  serveStatic
};
