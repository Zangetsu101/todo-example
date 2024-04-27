// src/adapter/deno/serve-static.ts
import { serveStatic as baseServeStatic } from "../../middleware/serve-static/index.js";
var { open } = Deno;
var serveStatic = (options) => {
  return async function serveStatic2(c, next) {
    const getContent = async (path) => {
      let file;
      try {
        file = await open(path);
      } catch (e) {
        console.warn(`${e}`);
      }
      return file ? file.readable : void 0;
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
