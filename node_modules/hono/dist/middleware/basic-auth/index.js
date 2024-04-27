// src/middleware/basic-auth/index.ts
import { HTTPException } from "../../http-exception.js";
import { timingSafeEqual } from "../../utils/buffer.js";
import { decodeBase64 } from "../../utils/encode.js";
var CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
var utf8Decoder = new TextDecoder();
var auth = (req) => {
  const match = CREDENTIALS_REGEXP.exec(req.header("Authorization") || "");
  if (!match) {
    return void 0;
  }
  let userPass = void 0;
  try {
    userPass = USER_PASS_REGEXP.exec(utf8Decoder.decode(decodeBase64(match[1])));
  } catch {
  }
  if (!userPass) {
    return void 0;
  }
  return { username: userPass[1], password: userPass[2] };
};
var basicAuth = (options, ...users) => {
  const usernamePasswordInOptions = "username" in options && "password" in options;
  const verifyUserInOptions = "verifyUser" in options;
  if (!(usernamePasswordInOptions || verifyUserInOptions)) {
    throw new Error(
      'basic auth middleware requires options for "username and password" or "verifyUser"'
    );
  }
  if (!options.realm) {
    options.realm = "Secure Area";
  }
  if (usernamePasswordInOptions) {
    users.unshift({ username: options.username, password: options.password });
  }
  return async function basicAuth2(ctx, next) {
    const requestUser = auth(ctx.req);
    if (requestUser) {
      if (verifyUserInOptions) {
        if (await options.verifyUser(requestUser.username, requestUser.password, ctx)) {
          await next();
          return;
        }
      } else {
        for (const user of users) {
          const [usernameEqual, passwordEqual] = await Promise.all([
            timingSafeEqual(user.username, requestUser.username, options.hashFunction),
            timingSafeEqual(user.password, requestUser.password, options.hashFunction)
          ]);
          if (usernameEqual && passwordEqual) {
            await next();
            return;
          }
        }
      }
    }
    const res = new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="' + options.realm?.replace(/"/g, '\\"') + '"'
      }
    });
    throw new HTTPException(401, { res });
  };
};
export {
  basicAuth
};
