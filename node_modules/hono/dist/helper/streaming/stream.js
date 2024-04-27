// src/helper/streaming/stream.ts
import { StreamingApi } from "../../utils/stream.js";
var stream = (c, cb, onError) => {
  const { readable, writable } = new TransformStream();
  const stream2 = new StreamingApi(writable, readable);
  (async () => {
    try {
      await cb(stream2);
    } catch (e) {
      if (e instanceof Error && onError) {
        await onError(e, stream2);
      } else {
        console.error(e);
      }
    } finally {
      stream2.close();
    }
  })();
  return c.newResponse(stream2.responseReadable);
};
export {
  stream
};
