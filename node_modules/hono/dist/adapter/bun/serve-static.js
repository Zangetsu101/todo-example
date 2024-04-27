// src/adapter/bun/serve-static.ts
import { serveStatic as baseServeStatic } from "../../middleware/serve-static/index.js";
var serveStatic = (options) => {
  return async function serveStatic2(c, next) {
    const getContent = async (path) => {
      path = `./${path}`;
      const file = Bun.file(path);
      return await file.exists() ? file : null;
    };
    const pathResolve = (path) => {
      return `./${path}`;
    };
    return baseServeStatic({
      ...options,
      getContent,
      pathResolve
    })(c, next);
  };
};
export {
  serveStatic
};
