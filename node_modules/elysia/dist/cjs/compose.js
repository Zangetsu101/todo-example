"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/compose.ts
var compose_exports = {};
__export(compose_exports, {
  composeErrorHandler: () => composeErrorHandler,
  composeGeneralHandler: () => composeGeneralHandler,
  composeHandler: () => composeHandler,
  hasProperty: () => hasProperty,
  hasReturn: () => hasReturn,
  hasTransform: () => hasTransform,
  hasType: () => hasType,
  isAsync: () => isAsync,
  jitRoute: () => jitRoute
});
module.exports = __toCommonJS(compose_exports);
var import_value4 = require("@sinclair/typebox/value");
var import_fast_querystring2 = require("fast-querystring");
var import_fast_decode_uri_component2 = __toESM(require("fast-decode-uri-component"));

// src/utils.ts
var import_typebox3 = require("@sinclair/typebox");
var import_value3 = require("@sinclair/typebox/value");
var import_compiler2 = require("@sinclair/typebox/compiler");

// src/index.ts
var import_eventemitter3 = __toESM(require("eventemitter3"));

// src/sucrose.ts
var separateFunction = (code) => {
  if (code.startsWith("async"))
    code = code.slice(6);
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    index = code.indexOf(") => {\n");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: false }
      ];
    index = code.indexOf(") => ");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: true }
      ];
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    const end = code.indexOf(")");
    return [
      code.slice(index + 1, end),
      code.slice(end + 2),
      {
        isArrowReturn: false
      }
    ];
  }
  const start = code.indexOf("(");
  if (start !== -1) {
    const [parameter, body] = code.split("\n", 2);
    const end = parameter.lastIndexOf(")") + 1;
    return [
      parameter.slice(start, end),
      "{" + body,
      {
        isArrowReturn: false
      }
    ];
  }
  const x = code.split("\n", 2);
  return [x[0], x[1], { isArrowReturn: false }];
};
var bracketPairRange = (parameter) => {
  const start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1;
  let deep = 1;
  for (; end < parameter.length; end++) {
    const char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
};
var bracketPairRangeReverse = (parameter) => {
  const end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1;
  let deep = 1;
  for (; start >= 0; start--) {
    const char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
};
var retrieveRootParamters = (parameter) => {
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123)
    parameter = parameter.slice(2, -2);
  while (true) {
    const [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    parameter = parameter.slice(0, start - 2) + parameter.slice(end + 1);
  }
  return parameter.replace(/:/g, "").trim();
};
var findParameterReference = (parameter, inference) => {
  const root = retrieveRootParamters(parameter);
  if (!inference.query && root.includes("query"))
    inference.query = true;
  if (!inference.headers && root.includes("headers"))
    inference.headers = true;
  if (!inference.body && root.includes("body"))
    inference.body = true;
  if (!inference.cookie && root.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && root.includes("set"))
    inference.set = true;
  return root;
};
var findEndIndex = (type, content, index) => {
  const newLineIndex = content.indexOf(type + "\n", index);
  const newTabIndex = content.indexOf(type + "	", index);
  const commaIndex = content.indexOf(type + ",", index);
  const semicolonIndex = content.indexOf(type + ";", index);
  const emptyIndex = content.indexOf(type + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a, b) => a - b)[0] || -1;
};
var findAlias = (type, body, depth = 0) => {
  if (depth > 5)
    return [];
  const aliases = [];
  let content = body;
  while (true) {
    let index = findEndIndex(" = " + type, content);
    if (index === -1) {
      const lastIndex = content.indexOf(" = " + type);
      if (lastIndex + 3 + type.length !== content.length)
        break;
      index = lastIndex;
    }
    const part = content.slice(0, index);
    let variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      const [start, end] = bracketPairRangeReverse(part);
      aliases.push(content.slice(start, end));
      content = content.slice(index + 3 + type.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    aliases.push(variable);
    content = content.slice(index + 3 + type.length);
  }
  for (const alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    const deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
};
var extractMainParameter = (parameter) => {
  if (!parameter)
    return;
  const hasComma = parameter.includes(",");
  if (!hasComma) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return parameter;
  }
  const spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
};
var inferBodyReference = (code, aliases, inference) => {
  const access = (type, alias) => code.includes(alias + "." + type) || code.includes(alias + '["' + type + '"]') || code.includes(alias + "['" + type + "']");
  for (let alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      alias = retrieveRootParamters(alias);
      if (!inference.query && alias.includes("query"))
        inference.query = true;
      if (!inference.headers && alias.includes("headers"))
        inference.headers = true;
      if (!inference.body && alias.includes("body"))
        inference.body = true;
      if (!inference.cookie && alias.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && alias.includes("set"))
        inference.set = true;
      continue;
    }
    if (code.includes("(" + alias + ")")) {
      inference.query = true;
      inference.headers = true;
      inference.body = true;
      inference.cookie = true;
      inference.set = true;
      inference.queries = [];
      inference.unknownQueries = true;
      break;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (!inference.unknownQueries && inference.query) {
      let keyword = alias + ".";
      if (code.includes(keyword + "query"))
        keyword = alias + ".query";
      while (true) {
        let start = code.indexOf(keyword);
        if (start === -1 && code.indexOf(alias + "[") !== -1) {
          inference.queries = [];
          inference.unknownQueries = true;
          break;
        }
        if (start !== -1) {
          let end = findEndIndex(
            "",
            code,
            start + keyword.length + 1
          );
          if (end === -1)
            end = void 0;
          const index = start + alias.length + 1;
          code = code.slice(start + alias.length + 1);
          let query = code.slice(0, end ? end - index : end).trimEnd();
          while (start !== -1) {
            start = query.indexOf(".");
            if (start !== -1)
              query = query.slice(start + 1);
          }
          if (query.charCodeAt(query.length - 1) === 59)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 44)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 93)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 41)
            query = query.slice(0, -1);
          if (query && !inference.queries.includes(query)) {
            inference.queries.push(query);
            continue;
          }
        }
        break;
      }
    }
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  return aliases;
};
var removeDefaultParameter = (parameter) => {
  while (true) {
    const index = parameter.indexOf("=");
    if (index === -1)
      break;
    const commaIndex = parameter.indexOf(",", index);
    const bracketIndex = parameter.indexOf("}", index);
    const end = [commaIndex, bracketIndex].filter((i) => i > 0).sort((a, b) => a - b)[0] || -1;
    if (end === -1) {
      parameter = parameter.slice(0, index);
      break;
    }
    parameter = parameter.slice(0, index) + parameter.slice(end);
  }
  return parameter.split(",").map((i) => i.trim()).join(", ");
};
var validateInferencedQueries = (queries) => {
  for (const query of queries) {
    if (query.charCodeAt(0) === 123)
      return false;
    if (query.indexOf("'") !== -1)
      return false;
    if (query.indexOf('"') !== -1)
      return false;
    if (query.indexOf("\n") !== -1)
      return false;
    if (query.indexOf("	") !== -1)
      return false;
  }
  return true;
};
var sucrose = (lifeCycle, inference = {
  queries: [],
  query: false,
  headers: false,
  body: false,
  cookie: false,
  set: false,
  unknownQueries: false
}) => {
  const events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.onResponse?.length)
    events.push(...lifeCycle.onResponse);
  for (const e of events) {
    if (!e)
      continue;
    const event = "fn" in e ? e.fn : e;
    const [parameter, body, { isArrowReturn }] = separateFunction(
      event.toString()
    );
    const rootParameters = findParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (isArrowReturn && (body === "query" || rootParameters && body.startsWith(rootParameters + ".query"))) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      inferBodyReference(body, aliases, inference);
    }
    const context = rootParameters || mainParameter;
    if (context && body.includes("return " + context + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (inference.query) {
      inferBodyReference(body, ["query"], inference);
      const queryIndex = parameter.indexOf("query: {");
      if (queryIndex !== -1) {
        const part = parameter.slice(queryIndex + 7);
        const [start, end] = bracketPairRange(part);
        const queryBracket = removeDefaultParameter(
          part.slice(start, end)
        );
        for (let query of queryBracket.slice(1, -1).split(",")) {
          const index = query.indexOf(":");
          if (index !== -1)
            query = query.slice(0, index);
          query = query.trim();
          if (query && !inference.queries.includes(query))
            inference.queries.push(query.trim());
        }
      }
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  if (!validateInferencedQueries(inference.queries)) {
    inference.unknownQueries = true;
    inference.queries = [];
  }
  return inference;
};

// src/error.ts
var import_value = require("@sinclair/typebox/value");
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : void 0;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var ELYSIA_RESPONSE = Symbol("ElysiaResponse");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var error = (code, response) => ({
  // @ts-expect-error
  [ELYSIA_RESPONSE]: StatusMap[code] ?? code,
  response: response ?? (code in InvertedStatusMap ? (
    // @ts-expect-error Always correct
    InvertedStatusMap[code]
  ) : code),
  _type: void 0
});
var InternalServerError = class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
};
var ParseError = class extends Error {
  constructor(message, body) {
    super(message ?? "PARSE");
    this.body = body;
    this.code = "PARSE";
    this.status = 400;
  }
};
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type, validator, value) {
    if (typeof value === "object" && ELYSIA_RESPONSE in value)
      value = value.response;
    const error2 = isProduction ? void 0 : "Errors" in validator ? validator.Errors(value).First() : import_value.Value.Errors(validator, value).First();
    const customError = error2?.schema.error ? typeof error2.schema.error === "function" ? error2.schema.error(type, validator, value) : error2.schema.error : void 0;
    const accessor = error2?.path || "root";
    let message = "";
    if (customError) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type,
        message: error2?.message,
        found: value
      });
    } else {
      const schema = validator?.schema ?? validator;
      const errors = "Errors" in validator ? [...validator.Errors(value)] : [...import_value.Value.Errors(validator, value)];
      let expected;
      try {
        expected = import_value.Value.Create(schema);
      } catch (error3) {
        expected = {
          type: "Could not create expected value",
          // @ts-expect-error
          message: error3?.message,
          error: error3
        };
      }
      message = JSON.stringify(
        {
          type: "validation",
          on: type,
          property: accessor,
          message: error2?.message,
          expected,
          found: value,
          errors
        },
        null,
        2
      );
    }
    super(message);
    this.type = type;
    this.validator = validator;
    this.value = value;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return import_value.Value.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
};

// src/handler.ts
var import_cookie2 = require("cookie");

// src/cookies.ts
var import_cookie = require("cookie");
var import_fast_decode_uri_component = __toESM(require("fast-decode-uri-component"));
var Cookie = class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    if (!(this.name in this.jar))
      return this.initial;
    return this.jar[this.name];
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name].value = value;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.cookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.cookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.cookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.cookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.cookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.cookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.cookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.cookie.priority = priority;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.cookie.secrets = secrets;
  }
  update(config) {
    this.cookie = Object.assign(
      this.cookie,
      typeof config === "function" ? config(this.cookie) : config
    );
    return this;
  }
  set(config) {
    this.cookie = Object.assign(
      {
        ...this.initial,
        value: this.value
      },
      typeof config === "function" ? config(this.cookie) : config
    );
    return this;
  }
  remove() {
    if (this.value === void 0)
      return;
    this.set({
      expires: /* @__PURE__ */ new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
};
var createCookieJar = (set, store, initial) => {
  if (!set.cookie)
    set.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(
          key,
          set.cookie,
          Object.assign({}, initial ?? {}, store[key])
        );
      return new Cookie(
        key,
        set.cookie,
        Object.assign({}, initial)
      );
    }
  });
};
var parseCookie = async (set, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = (0, import_cookie.parse)(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value = (0, import_fast_decode_uri_component.default)(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value = temp;
      } else {
        let decoded = true;
        for (let i = 0; i < secrets.length; i++) {
          const temp = await unsignCookie(value, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    const start = value.charCodeAt(0);
    if (start === 123 || start === 91)
      try {
        jar[name] = {
          value: JSON.parse(value)
        };
        continue;
      } catch {
      }
    if (isNumericString(value)) {
      jar[name] = {
        value: parseInt(value)
      };
      continue;
    }
    if (value === "true") {
      jar[name] = {
        value: true
      };
      continue;
    }
    if (value === "false") {
      jar[name] = {
        value: false
      };
      continue;
    }
    jar[name] = {
      value
    };
  }
  return createCookieJar(set, jar, initial);
};

// src/handler.ts
var hasHeaderShorthand = "toJSON" in new Headers();
var isNotEmpty = (obj) => {
  if (!obj)
    return false;
  for (const x in obj)
    return true;
  return false;
};
var handleFile = (response, set) => {
  const size = response.size;
  if (!set && size || size && set && set.status !== 206 && set.status !== 304 && set.status !== 412 && set.status !== 416) {
    if (set) {
      if (set.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set.headers = set.headers.toJSON();
        else
          for (const [key, value] of set.headers.entries())
            if (key in set.headers)
              set.headers[key] = value;
      }
      return new Response(response, {
        status: set.status,
        headers: Object.assign(
          {
            "accept-ranges": "bytes",
            "content-range": `bytes 0-${size - 1}/${size}`
          },
          set.headers
        )
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`
      }
    });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("Set-Cookie");
  for (let i = 0; i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append(
      "Set-Cookie",
      `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`
    );
  }
  return headers;
};
var serializeCookie = (cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return void 0;
  const set = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    const value = property.value;
    if (value === void 0 || value === null)
      continue;
    set.push(
      (0, import_cookie2.serialize)(
        key,
        typeof value === "object" ? JSON.stringify(value) : value + "",
        property
      )
    );
  }
  if (set.length === 0)
    return void 0;
  if (set.length === 1)
    return set[0];
  return set;
};
var mapResponse = (response, set, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set.headers) || set.status !== 200 || set.redirect || set.cookie) {
    if (typeof set.status === "string")
      set.status = StatusMap[set.status];
    if (set.redirect) {
      set.headers.Location = set.redirect;
      if (!set.status || set.status < 300 || set.status >= 400)
        set.status = 302;
    }
    if (set.cookie && isNotEmpty(set.cookie))
      set.headers["Set-Cookie"] = serializeCookie(set.cookie);
    if (set.headers["Set-Cookie"] && Array.isArray(set.headers["Set-Cookie"]))
      set.headers = parseSetCookies(
        new Headers(set.headers),
        set.headers["Set-Cookie"]
      );
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set);
      case "Blob":
        return handleFile(response, set);
      case "Object":
      case "Array":
        return Response.json(response, set);
      case "ReadableStream":
        if (!set.headers["content-type"]?.startsWith(
          "text/event-stream"
        ))
          set.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(
          response,
          set
        );
      case void 0:
        if (!response)
          return new Response("", set);
        return Response.json(response, set);
      case "Response":
        const inherits = { ...set.headers };
        if (hasHeaderShorthand)
          set.headers = response.headers.toJSON();
        else
          for (const [key, value] of response.headers.entries())
            if (key in set.headers)
              set.headers[key] = value;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        return response;
      case "Error":
        return errorToResponse(response, set);
      case "Promise":
        return response.then(
          (x) => mapResponse(x, set)
        );
      case "Function":
        return mapResponse(response(), set);
      case "Number":
      case "Boolean":
        return new Response(
          response.toString(),
          set
        );
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set);
        return new Response(response?.toString(), set);
      default:
        if (response instanceof Response) {
          const inherits2 = Object.assign({}, set.headers);
          if (hasHeaderShorthand)
            set.headers = response.headers.toJSON();
          else
            for (const [key, value] of response.headers.entries())
              if (key in set.headers)
                set.headers[key] = value;
          for (const key in inherits2)
            response.headers.append(
              key,
              inherits2[key]
            );
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set));
        if (response instanceof Error)
          return errorToResponse(response, set);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set.headers["Content-Type"])
              set.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set
            );
          }
        }
        return new Response(response, set);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case void 0:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Error":
        return errorToResponse(response, set);
      case "Promise":
        return response.then((x) => {
          const r = mapCompactResponse(x);
          if (r !== void 0)
            return r;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set);
        return new Response(response?.toString(), set);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set));
        if (response instanceof Error)
          return errorToResponse(response, set);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set.headers["Content-Type"])
              set.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set
            );
          }
        }
        return new Response(response);
    }
};
var mapEarlyResponse = (response, set, request) => {
  if (response === void 0 || response === null)
    return;
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set.headers) || set.status !== 200 || set.redirect || set.cookie) {
    if (typeof set.status === "string")
      set.status = StatusMap[set.status];
    if (set.redirect) {
      set.headers.Location = set.redirect;
      if (!set.status || set.status < 300 || set.status >= 400)
        set.status = 302;
    }
    if (set.cookie && isNotEmpty(set.cookie))
      set.headers["Set-Cookie"] = serializeCookie(set.cookie);
    if (set.headers["Set-Cookie"] && Array.isArray(set.headers["Set-Cookie"]))
      set.headers = parseSetCookies(
        new Headers(set.headers),
        set.headers["Set-Cookie"]
      );
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set);
      case "Blob":
        return handleFile(response, set);
      case "Object":
      case "Array":
        return Response.json(response, set);
      case "ReadableStream":
        if (!set.headers["content-type"]?.startsWith(
          "text/event-stream"
        ))
          set.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(
          response,
          set
        );
      case void 0:
        if (!response)
          return;
        return Response.json(response, set);
      case "Response":
        const inherits = Object.assign({}, set.headers);
        if (hasHeaderShorthand)
          set.headers = response.headers.toJSON();
        else
          for (const [key, value] of response.headers.entries())
            if (!(key in set.headers))
              set.headers[key] = value;
        for (const key in inherits)
          response.headers.append(key, inherits[key]);
        if (response.status !== set.status)
          set.status = response.status;
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set);
          if (r !== void 0)
            return r;
        });
      case "Error":
        return errorToResponse(response, set);
      case "Function":
        return mapEarlyResponse(response(), set);
      case "Number":
      case "Boolean":
        return new Response(
          response.toString(),
          set
        );
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set);
        return new Response(response?.toString(), set);
      default:
        if (response instanceof Response) {
          const inherits2 = { ...set.headers };
          if (hasHeaderShorthand)
            set.headers = response.headers.toJSON();
          else
            for (const [key, value] of response.headers.entries())
              if (key in set.headers)
                set.headers[key] = value;
          for (const key in inherits2)
            response.headers.append(
              key,
              inherits2[key]
            );
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set));
        if (response instanceof Error)
          return errorToResponse(response, set);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set.headers["Content-Type"])
              set.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set
            );
          }
        }
        return new Response(response, set);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set);
      case "Object":
      case "Array":
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "ReadableStream":
        request?.signal.addEventListener(
          "abort",
          {
            handleEvent() {
              if (!request?.signal.aborted)
                response.cancel(request);
            }
          },
          {
            once: true
          }
        );
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case void 0:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set);
          if (r !== void 0)
            return r;
        });
      case "Error":
        return errorToResponse(response, set);
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set);
        return new Response(response?.toString(), set);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set));
        if (response instanceof Error)
          return errorToResponse(response, set);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set.headers["Content-Type"])
              set.headers["Content-Type"] = "application/json";
            return new Response(
              JSON.stringify(response),
              set
            );
          }
        }
        return new Response(response);
    }
};
var mapCompactResponse = (response, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE])
    return mapResponse(response.response, {
      // @ts-ignore
      status: response[ELYSIA_RESPONSE],
      headers: {}
    });
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Object":
    case "Array":
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "ReadableStream":
      request?.signal.addEventListener(
        "abort",
        {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        },
        {
          once: true
        }
      );
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case void 0:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then(
        mapCompactResponse
      );
    case "Function":
      return mapCompactResponse(response());
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    default:
      if (response instanceof Response)
        return new Response(response.body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      if (response instanceof Promise)
        return response.then(mapCompactResponse);
      if (response instanceof Error)
        return errorToResponse(response);
      if ("charCodeAt" in response) {
        const code = response.charCodeAt(0);
        if (code === 123 || code === 91) {
          return new Response(
            JSON.stringify(response),
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
        }
      }
      return new Response(response);
  }
};
var errorToResponse = (error2, set) => new Response(
  JSON.stringify({
    name: error2?.name,
    message: error2?.message,
    cause: error2?.cause
  }),
  {
    status: set?.status !== 200 ? set?.status ?? 500 : 500,
    headers: set?.headers
  }
);

// src/dynamic-handle.ts
var import_fast_querystring = require("fast-querystring");

// src/type-system.ts
var import_typebox = require("@sinclair/typebox");
var import_system = require("@sinclair/typebox/system");
var import_typebox2 = require("@sinclair/typebox");
var import_value2 = require("@sinclair/typebox/value");

// src/formats.ts
var fullFormats = {
  // date: http://tools.ietf.org/html/rfc3339#section-5.6
  date,
  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  // duration: https://tools.ietf.org/html/rfc3339#appendix-A
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  // uri-template: https://tools.ietf.org/html/rfc6570
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  // For the source: https://gist.github.com/dperini/729294
  // For test cases: https://mathiasbynens.be/demo/url-regex
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  // uuid: http://tools.ietf.org/html/rfc4122
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  // JSON-pointer: https://tools.ietf.org/html/rfc6901
  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
  // byte: https://github.com/miguelmota/is-base64
  byte,
  // signed 32 bit integer
  int32: { type: "number", validate: validateInt32 },
  // signed 64 bit integer
  int64: { type: "number", validate: validateInt64 },
  // C-type float
  float: { type: "number", validate: validateNumber },
  // C-type double
  double: { type: "number", validate: validateNumber },
  // hint to the UI to hide input strings
  password: true,
  // unchecked string payload
  binary: true
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
  return function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
  };
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
}
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value) {
  return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
}
function validateInt64(value) {
  return Number.isInteger(value);
}
function validateNumber() {
  return true;
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}

// src/type-system.ts
var import_system2 = require("@sinclair/typebox/system");
var import_compiler = require("@sinclair/typebox/compiler");
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!import_typebox2.FormatRegistry.Has("date"))
  import_system.TypeSystem.Format("date", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
if (!import_typebox2.FormatRegistry.Has("date-time"))
  import_system.TypeSystem.Format("date-time", (value) => {
    const temp = value.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date2 = new Date(temp);
      if (!Number.isNaN(date2.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!import_typebox2.FormatRegistry.Has(formatName)) {
    if (formatValue instanceof RegExp)
      import_system.TypeSystem.Format(formatName, (value) => formatValue.test(value));
    else if (typeof formatValue === "function")
      import_system.TypeSystem.Format(formatName, formatValue);
  }
});
var t = Object.assign({}, import_typebox2.Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value) => {
  if (!(value instanceof Blob))
    return false;
  if (options.minSize && value.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0; i < options.extension.length; i++)
        if (value.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File = import_typebox.TypeRegistry.Get("Files") ?? import_system.TypeSystem.Type("File", validateFile);
var Files = import_typebox.TypeRegistry.Get("Files") ?? import_system.TypeSystem.Type(
  "Files",
  (options, value) => {
    if (!Array.isArray(value))
      return validateFile(options, value);
    if (options.minItems && value.length < options.minItems)
      return false;
    if (options.maxItems && value.length > options.maxItems)
      return false;
    for (let i = 0; i < value.length; i++)
      if (!validateFile(options, value[i]))
        return false;
    return true;
  }
);
if (!import_typebox2.FormatRegistry.Has("numeric"))
  import_typebox2.FormatRegistry.Set("numeric", (value) => !!value && !isNaN(+value));
if (!import_typebox2.FormatRegistry.Has("boolean"))
  import_typebox2.FormatRegistry.Set(
    "boolean",
    (value) => value === "true" || value === "false"
  );
if (!import_typebox2.FormatRegistry.Has("ObjectString"))
  import_typebox2.FormatRegistry.Set("ObjectString", (value) => {
    let start = value.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  });
var ElysiaType = {
  Numeric: (property) => {
    const schema = import_typebox2.Type.Number(property);
    return t.Transform(
      t.Union(
        [
          t.String({
            format: "numeric",
            default: 0
          }),
          t.Number(property)
        ],
        property
      )
    ).Decode((value) => {
      const number = +value;
      if (isNaN(number))
        return value;
      if (property && !import_value2.Value.Check(schema, number))
        throw new ValidationError("property", schema, number);
      return number;
    }).Encode((value) => value);
  },
  Date: (property) => {
    const schema = import_typebox2.Type.Date(property);
    return t.Transform(
      t.Union(
        [
          import_typebox2.Type.Date(property),
          t.String({
            format: "date",
            default: (/* @__PURE__ */ new Date()).toISOString()
          }),
          t.String({
            format: "date-time",
            default: (/* @__PURE__ */ new Date()).toISOString()
          })
        ],
        property
      )
    ).Decode((value) => {
      if (value instanceof Date)
        return value;
      const date2 = new Date(value);
      if (!import_value2.Value.Check(schema, date2))
        throw new ValidationError("property", schema, date2);
      return date2;
    }).Encode((value) => {
      if (typeof value === "string")
        return new Date(value);
      return value;
    });
  },
  BooleanString: (property) => {
    const schema = import_typebox2.Type.Boolean(property);
    return t.Transform(
      t.Union(
        [
          t.String({
            format: "boolean",
            default: false
          }),
          t.Boolean(property)
        ],
        property
      )
    ).Decode((value) => {
      if (typeof value === "string")
        return value === "true";
      if (property && !import_value2.Value.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return value;
    }).Encode((value) => value);
  },
  ObjectString: (properties = {}, options) => {
    const schema = t.Object(properties, options);
    const defaultValue = JSON.stringify(import_value2.Value.Create(schema));
    return t.Transform(
      t.Union([
        t.String({
          format: "ObjectString",
          default: defaultValue
        }),
        schema
      ])
    ).Decode((value) => {
      if (typeof value === "string") {
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
        if (!import_value2.Value.Check(schema, value))
          throw new ValidationError("property", schema, value);
        return value;
      }
      return value;
    }).Encode((value) => {
      if (typeof value === "string")
        try {
          value = JSON.parse(value);
        } catch {
          throw new ValidationError("property", schema, value);
        }
      if (!import_value2.Value.Check(schema, value))
        throw new ValidationError("property", schema, value);
      return JSON.stringify(value);
    });
  },
  File,
  Files: (options = {}) => t.Transform(Files(options)).Decode((value) => {
    if (Array.isArray(value))
      return value;
    return [value];
  }).Encode((value) => value),
  Nullable: (schema) => t.Union([t.Null(), schema]),
  /**
   * Allow Optional, Nullable and Undefined
   */
  MaybeEmpty: (schema) => t.Union([t.Null(), t.Undefined(), schema]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  }
};
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t.Nullable = (schema) => ElysiaType.Nullable(schema);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
t.Date = ElysiaType.Date;

// src/utils.ts
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || // Handle import * as Sentry from '@sentry/bun'
// This also handle [object Date], [object Array]
// and FFI value like [object Prisma]
v.toString().startsWith("[object ") || // If object prototype is not pure, then probably a class-like object
isNotEmpty(Object.getPrototypeOf(v));
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, source, {
  skipKeys
} = {}) => {
  if (isObject(target) && isObject(source))
    for (const [key, value] of Object.entries(source)) {
      if (skipKeys?.includes(key))
        continue;
      if (!isObject(value) || !(key in target) || isClass(value)) {
        target[key] = value;
        continue;
      }
      target[key] = mergeDeep(
        target[key],
        value
      );
    }
  return target;
};
var mergeCookie = (a, b) => {
  const { properties: _, ...target } = a ?? {};
  const { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
};
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "onResponse",
  "mapResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce(
  (acc, x) => (acc[x] = true, acc),
  {}
);
var getSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = normalize
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const schema = typeof s === "string" ? models[s] : s;
  if (schema.type === "object" && "additionalProperties" in schema === false)
    schema.additionalProperties = additionalProperties;
  const cleaner = (value) => import_value3.Value.Clean(schema, value);
  if (dynamic) {
    const validator = {
      schema,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value) => import_value3.Value.Check(schema, value),
      Errors: (value) => import_value3.Value.Errors(schema, value),
      Code: () => ""
    };
    if (normalize && schema.additionalProperties === true)
      validator.Clean = cleaner;
    if (schema.config) {
      validator.config = schema.config;
      if (validator?.schema?.config)
        delete validator.schema.config;
    }
    return validator;
  }
  const compiled = import_compiler2.TypeCompiler.Compile(schema, Object.values(models));
  compiled.Clean = cleaner;
  if (schema.config) {
    compiled.config = schema.config;
    if (compiled?.schema?.config)
      delete compiled.schema.config;
  }
  return compiled;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var getCookieValidator = ({
  validator,
  defaultConfig = {},
  config,
  dynamic,
  models
}) => {
  let cookieValidator = getSchemaValidator(validator, {
    dynamic,
    models,
    additionalProperties: true
  });
  if (isNotEmpty(defaultConfig)) {
    if (cookieValidator) {
      cookieValidator.config = mergeCookie(
        // @ts-expect-error private
        cookieValidator.config,
        config
      );
    } else {
      cookieValidator = getSchemaValidator(t.Cookie({}), {
        dynamic,
        models,
        additionalProperties: true
      });
      cookieValidator.config = defaultConfig;
    }
  }
  return cookieValidator;
};
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(
  Object.entries(StatusMap).map(([k, v]) => [v, k])
);
function removeTrailingEquals(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
}
var encoder = new TextEncoder();
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const hmacBuffer = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(val)
  );
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (null === secret)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var isNumericString = (message) => {
  if (message.length < 16)
    return message.trim().length !== 0 && !Number.isNaN(Number(message));
  if (message.length === 16) {
    const numVal = Number(message);
    if (numVal.toString() === message)
      return message.trim().length !== 0 && !Number.isNaN(numVal);
  }
  return false;
};
var lifeCycleToFn = (a) => {
  return {
    ...a,
    start: a.start?.map((x) => x.fn),
    request: a.request?.map((x) => x.fn),
    parse: a.parse?.map((x) => x.fn),
    transform: a.transform?.map((x) => x.fn),
    beforeHandle: a.beforeHandle?.map((x) => x.fn),
    afterHandle: a.afterHandle?.map((x) => x.fn),
    onResponse: a.onResponse?.map((x) => x.fn),
    mapResponse: a.mapResponse?.map((x) => x.fn),
    trace: a.trace?.map((x) => x.fn),
    error: a.error?.map((x) => x.fn),
    stop: a.stop?.map((x) => x.fn)
  };
};
var redirect = (url, status = 301) => new Response(null, {
  status,
  headers: {
    Location: url
  }
});

// src/compose.ts
var headersHasToJSON = new Headers().toJSON;
var requestId = { value: 0 };
var createReport = ({
  hasTrace,
  hasTraceSet = false,
  addFn,
  condition = {}
}) => {
  if (hasTrace) {
    addFn(`
const reporter = getReporter()
`);
    return (event, {
      name,
      attribute = "",
      unit = 0
    } = {}) => {
      const dotIndex = event.indexOf(".");
      const isGroup = dotIndex === -1;
      if (event !== "request" && event !== "response" && !condition[isGroup ? event : event.slice(0, dotIndex)])
        return () => {
          if (hasTraceSet && event === "afterHandle")
            addFn(`
await traceDone
`);
        };
      if (isGroup)
        name ||= event;
      else
        name ||= "anonymous";
      addFn(
        "\n" + `reporter.emit('event', {
					id,
					event: '${event}',
					type: 'begin',
					name: '${name}',
					time: performance.now(),
					${isGroup ? `unit: ${unit},` : ""}
					${attribute}
				})`.replace(/(\t| |\n)/g, "") + "\n"
      );
      return () => {
        addFn(
          "\n" + `reporter.emit('event', {
							id,
							event: '${event}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n"
        );
        if (hasTraceSet && event === "afterHandle")
          addFn(`
await traceDone
`);
      };
    };
  } else {
    return () => () => {
    };
  }
};
var hasReturn = (fnLiteral) => {
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
};
var composeValidationFactory = (hasErrorHandler, {
  injectResponse = "",
  normalize = false
} = {}) => ({
  composeValidation: (type, value = `c.${type}`) => hasErrorHandler ? `c.set.status = 422; throw new ValidationError('${type}', ${type}, ${value})` : `c.set.status = 422; return new ValidationError('${type}', ${type}, ${value}).toResponse(c.set.headers)`,
  composeResponseValidation: (name = "r") => {
    const returnError = hasErrorHandler ? `throw new ValidationError('response', response[c.set.status], ${name})` : `return new ValidationError('response', response[c.set.status], ${name}).toResponse(c.set.headers)`;
    let code = "\n" + injectResponse + "\n";
    code += `let er

		if(${name} && typeof ${name} === "object" && ELYSIA_RESPONSE in ${name})
			er = ${name}[ELYSIA_RESPONSE]
`;
    if (normalize)
      code += `
			if(!er && response[c.set.status]?.Clean)
				${name} = response[c.set.status]?.Clean(${name})
			else if(response[er]?.Clean)
				${name}.response = response[er]?.Clean(${name}.response)`;
    code += `
			if(er) {
				if(!(${name} instanceof Response) && response[er]?.Check(${name}.response) === false) {
					if(!(response instanceof Error)) {
						c.set.status = ${name}[ELYSIA_RESPONSE]

						${returnError}
					}
				}
			} else if(!(${name} instanceof Response) && response[c.set.status]?.Check(${name}) === false) {
				if(!(response instanceof Error))
					${returnError}
			}
`;
    return code;
  }
});
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasType = (type, schema) => {
  if (!schema)
    return;
  if (KindSymbol in schema && schema[KindSymbol] === type)
    return true;
  if (schema.type === "object") {
    const properties = schema.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasType(type, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++)
          if (hasType(type, property.anyOf[i]))
            return true;
      }
      if (KindSymbol in property && property[KindSymbol] === type)
        return true;
    }
    return false;
  }
  return schema.properties && KindSymbol in schema.properties && schema.properties[KindSymbol] === type;
};
var hasProperty = (expectedProperty, schema) => {
  if (!schema)
    return;
  if (schema.type === "object") {
    const properties = schema.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema) => {
  if (!schema)
    return;
  if (schema.type === "object" && schema.properties) {
    const properties = schema.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0; i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema || schema.properties && TransformSymbol in schema.properties;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsync = (v) => {
  const fn = "fn" in v ? v.fn : v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal = fn.toString();
  if (literal.includes("=> response.clone("))
    return false;
  if (literal.includes("await"))
    return true;
  if (literal.includes("async"))
    return true;
  return !!literal.match(matchFnReturn);
};
var composeHandler = ({
  app,
  path,
  method,
  localHook,
  hooks,
  validator,
  handler,
  allowMeta = false,
  appInference: { event: eventInference, trace: traceInference }
}) => {
  const isHandleFn = typeof handler === "function";
  if (!isHandleFn)
    handler = mapResponse(handler, {
      // @ts-expect-error private property
      headers: app.setHeaders ?? {}
    });
  const hasErrorHandler = app.config.forceErrorEncapsulation && (isHandleFn || hooks.afterHandle.length > 0 || hooks.beforeHandle.length > 0 || hooks.transform.length > 0) || hooks.error.length > 0 || app.event.error.length > 0 || typeof Bun === "undefined" || hooks.onResponse.length > 0 || !!hooks.trace.length;
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const handleResponse = hooks.onResponse.length ? `
;(async () => {${hooks.onResponse.map((_, i) => `await res${i}(c)`).join(";")}})();
` : "";
  const traceConditions = traceInference;
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  const inference = sucrose(
    Object.assign(localHook, {
      handler
    }),
    eventInference
  );
  const hasQuery = inference.query || !!validator.query;
  const hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && hooks.type !== "none" && (inference.body || !!validator.body);
  const defaultHeaders = app.setHeaders;
  const hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length;
  const hasHeaders = inference.headers || validator.headers;
  const hasCookie = inference.cookie || !!validator.cookie;
  const cookieValidator = hasCookie ? getCookieValidator({
    validator: validator.cookie,
    defaultConfig: app.config.cookie,
    dynamic: !!app.config.aot,
    // @ts-expect-error
    config: validator.cookie?.config ?? {},
    // @ts-expect-error
    models: app.definitions.type
  }) : void 0;
  const cookieMeta = cookieValidator?.config;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(
        `t.Cookie required secret which is not set in (${method}) ${path}.`
      );
    const secret = !cookieMeta.secrets ? void 0 : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
		if(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
			}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += "}\n";
  }
  const normalize = app.config.normalize;
  const { composeValidation, composeResponseValidation } = composeValidationFactory(hasErrorHandler, {
    normalize
  });
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  }
  if (hasCookie) {
    const get = (name, defaultValue) => {
      const value = cookieMeta?.[name] ?? defaultValue;
      if (!value)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value === "string")
        return `${name}: '${value}',`;
      if (value instanceof Date)
        return `${name}: new Date(${value.getTime()}),`;
      return `${name}: ${value},`;
    };
    const options = cookieMeta ? `{
			secrets: ${cookieMeta.secrets !== void 0 ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce(
      (a, b) => a + `'${b}',`,
      ""
    ) + "]" : "undefined"},
			sign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== void 0 ? "[" + cookieMeta.sign.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
			${get("domain")}
			${get("expires")}
			${get("httpOnly")}
			${get("maxAge")}
			${get("path", "/")}
			${get("priority")}
			${get("sameSite")}
			${get("secure")}
		}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    let destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      destructured = Object.keys(validator.query.schema.properties);
    } else
      for (const query of inference.queries)
        if (destructured.indexOf(query) === -1)
          destructured.push(query);
    if (app.config.forceDynamicQuery === true || inference.unknownQueries === true || !destructured.length) {
      fnLiteral += `if(c.qi !== -1) {
				c.query = parseQuery(c.request.url.slice(c.qi + 1).replace(/\\+/g, ' '))

				for(const key of Object.keys(c.query))
					c.query[key] = decodeURIComponent(c.query[key])
			} else c.query = {}`;
    } else {
      fnLiteral += `if(c.qi !== -1) {
				let url = c.request.url.slice(c.qi).replace(/\\+/g, ' ')

				${destructured.map(
        (name, index) => `
						${index === 0 ? "let" : ""} memory = url.indexOf('&${name}=')
						if(memory === -1) memory = url.indexOf('?${name}=')
						let a${index}

						if(memory !== -1) {
							const start = memory + ${name.length + 2}
							memory = url.indexOf('&', start)

							if(memory === -1) a${index} = decodeURIComponent(url.slice(start))
							else a${index} = decodeURIComponent(url.slice(start, memory))
						}`
      ).join("\n")}

				c.query = {
					${destructured.map((name, index) => `'${name}': a${index}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    }
  }
  const hasTraceSet = traceInference.set;
  const hasSet = inference.cookie || inference.set || hasTraceSet || hasHeaders || isHandleFn && hasDefaultHeaders;
  if (hasTrace)
    fnLiteral += "\nconst id = c.$$requestId\n";
  const report = createReport({
    hasTrace,
    hasTraceSet,
    condition: traceConditions,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += hasErrorHandler ? "\n try {\n" : "";
  if (hasTraceSet) {
    fnLiteral += `
const traceDone = Promise.all([`;
    for (let i = 0; i < hooks.trace.length; i++) {
      fnLiteral += `new Promise(r => { reporter.once(\`res\${id}.${i}\`, r) }),`;
    }
    fnLiteral += `])
`;
  }
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const maybeAsync = hasCookie || hasBody || hasTraceSet || isAsyncHandler || !!hooks.mapResponse.length || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync);
  const endParse = report("parse", {
    unit: hooks.parse.length
  });
  if (hasBody) {
    const hasBodyInference = hooks.parse.length || inference.body || validator.body;
    if (hooks.type && !hooks.parse.length) {
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (hasErrorHandler)
            fnLiteral += `const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}`;
          else
            fnLiteral += `c.body = await c.request.json()`;
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          fnLiteral += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
          break;
      }
    } else if (hasBodyInference) {
      fnLiteral += "\n";
      fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
      fnLiteral += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)

					c.contentType = contentType
`;
      if (hooks.parse.length) {
        fnLiteral += `let used = false
`;
        const endReport = report("parse", {
          unit: hooks.parse.length
        });
        for (let i = 0; i < hooks.parse.length; i++) {
          const endUnit = report("parse.unit", {
            name: hooks.parse[i].fn.name
          });
          const name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
          fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
          fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
          endUnit();
          if (i !== 0)
            fnLiteral += `}`;
        }
        endReport();
      }
      fnLiteral += "\ndelete c.contentType\n";
      if (hooks.parse.length)
        fnLiteral += `if (!used) {`;
      if (hooks.type && !Array.isArray(hooks.type)) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (hasErrorHandler)
              fnLiteral += `const tempBody = await c.request.text()
	
								try {
									c.body = JSON.parse(tempBody)
								} catch {
									throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
								}`;
            else
              fnLiteral += `c.body = await c.request.json()`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}
	
							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue
	
								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}
`;
            break;
        }
      } else {
        fnLiteral += `
					switch (contentType) {
						case 'application/json':
							${hasErrorHandler ? `
							const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}
							` : `c.body = await c.request.json()
`}
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      }
      if (hooks.parse.length)
        fnLiteral += `}`;
      fnLiteral += "}\n";
    }
    fnLiteral += "\n";
  }
  endParse();
  if (hooks?.transform) {
    const endTransform = report("transform", {
      unit: hooks.transform.length
    });
    if (hooks.transform.length)
      fnLiteral += "\nlet transformed\n";
    for (let i = 0; i < hooks.transform.length; i++) {
      const transform = hooks.transform[i];
      const endUnit = report("transform.unit", {
        name: transform.fn.name
      });
      fnLiteral += isAsync(transform) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`;
      fnLiteral += `if(transformed?.[ELYSIA_RESPONSE])
				throw transformed
			else
				Object.assign(c, transformed)
`;
      endUnit();
    }
    endTransform();
  }
  if (validator) {
    fnLiteral += "\n";
    if (validator.headers) {
      if (hasProperty("default", validator.headers.params))
        for (const [key, value] of Object.entries(
          import_value4.Value.Default(
            // @ts-ignore
            validator.headers.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : `'${value}'`;
          if (parsed)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(headers.Check(c.headers) === false) {
				${composeValidation("headers")}
			}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `
c.headers = headers.Decode(c.headers)
`;
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value] of Object.entries(
          import_value4.Value.Default(
            // @ts-ignore
            validator.params.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : `'${value}'`;
          if (parsed)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(params.Check(c.params) === false) {
				${composeValidation("params")}
			}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize)
        fnLiteral += "c.query = query.Clean(c.query);\n";
      if (hasProperty("default", validator.query.schema))
        for (const [key, value] of Object.entries(
          import_value4.Value.Default(
            // @ts-ignore
            validator.query.schema,
            {}
          )
        )) {
          const parsed = typeof value === "object" ? JSON.stringify(value) : `'${value}'`;
          if (parsed)
            fnLiteral += `c.query['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(query.Check(c.query) === false) {
				${composeValidation("query")}
			}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = query.Decode(Object.assign({}, c.query))
`;
    }
    if (validator.body) {
      if (normalize)
        fnLiteral += "c.body = body.Clean(c.body);\n";
      if (hasProperty("default", validator.body.schema))
        fnLiteral += `if(body.Check(c.body) === false) {
    				c.body = Object.assign(${JSON.stringify(
          import_value4.Value.Default(
            // @ts-ignore
            validator.body.schema,
            null
          ) ?? {}
        )}, c.body)

    				if(body.Check(c.query) === false) {
        				${composeValidation("body")}
     			}
            }`;
      else
        fnLiteral += `if(body.Check(c.body) === false) {
			${composeValidation("body")}
		}`;
      if (hasTransform(validator.body.schema))
        fnLiteral += `
c.body = body.Decode(c.body)
`;
    }
    if (isNotEmpty(cookieValidator?.schema.properties ?? {})) {
      fnLiteral += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value
`;
      if (hasProperty("default", cookieValidator.schema))
        for (const [key, value] of Object.entries(
          import_value4.Value.Default(
            // @ts-ignore
            cookieValidator.schema,
            {}
          )
        )) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value === "object" ? JSON.stringify(value) : value}
`;
        }
      fnLiteral += `if(cookie.Check(cookieValue) === false) {
				${composeValidation("cookie", "cookieValue")}
			}`;
    }
  }
  if (hooks?.beforeHandle) {
    const endBeforeHandle = report("beforeHandle", {
      unit: hooks.beforeHandle.length
    });
    let hasResolve = false;
    for (let i = 0; i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = report("beforeHandle.unit", {
        name: beforeHandle.fn.name
      });
      const returning = hasReturn(beforeHandle.fn.toString());
      const isResolver = beforeHandle.subType === "resolve";
      if (isResolver) {
        if (!hasResolve) {
          hasResolve = true;
          fnLiteral += "\nlet resolved\n";
        }
        fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`;
        fnLiteral += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else
						Object.assign(c, resolved)
`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += `Object.assign(c, be);`;
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit();
        fnLiteral += `if(be !== undefined) {
`;
        endBeforeHandle();
        const endAfterHandle = report("afterHandle", {
          unit: hooks.transform.length
        });
        if (hooks.afterHandle) {
          report("handle", {
            name: isHandleFn ? handler.name : void 0
          })();
          for (let i2 = 0; i2 < hooks.afterHandle.length; i2++) {
            const hook = hooks.afterHandle[i2];
            const returning2 = hasReturn(hook.fn.toString());
            const endUnit2 = report("afterHandle.unit", {
              name: hook.fn.name
            });
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2();
          }
        }
        endAfterHandle();
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        if (hooks.mapResponse.length) {
          fnLiteral += `c.response = be`;
          for (let i2 = 0; i2 < hooks.mapResponse.length; i2++) {
            fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i2}](c)
							if(mr instanceof Promise) mr = await mr
							if(mr !== undefined) c.response = mr
						}
`;
          }
        }
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(be, c.set, c.request)}
`;
      }
    }
    endBeforeHandle();
  }
  if (hooks?.afterHandle.length) {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : void 0
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    endHandle();
    const endAfterHandle = report("afterHandle", {
      unit: hooks.afterHandle.length
    });
    for (let i = 0; i < hooks.afterHandle.length; i++) {
      const hook = hooks.afterHandle[i];
      const returning = hasReturn(hook.fn.toString());
      const endUnit = report("afterHandle.unit", {
        name: hook.fn.name
      });
      if (!returning) {
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit();
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    endAfterHandle();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    if (hooks.mapResponse.length) {
      for (let i = 0; i < hooks.mapResponse.length; i++) {
        fnLiteral += `
mr = onMapResponse[${i}](c)
				if(mr instanceof Promise) mr = await mr
				if(mr !== undefined) c.response = mr
`;
      }
    }
    if (hasSet)
      fnLiteral += `return mapResponse(r, c.set, c.request)
`;
    else
      fnLiteral += `return mapCompactResponse(r, c.request)
`;
  } else {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : void 0
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0; i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
						mr = onMapResponse[${i}](c)
						if(mr instanceof Promise) mr = await mr
    					if(mr !== undefined) r = c.response = mr
					}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set, c.request)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(r, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(r, c.request)
`;
    } else if (traceConditions.handle || hasCookie) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0; i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i}](c)
							if(mr instanceof Promise) mr = await mr
    						if(mr !== undefined) r = c.response = mr
						}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (hasSet)
        fnLiteral += `return mapResponse(r, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(r, c.request)
`;
    } else {
      endHandle();
      const handled = isAsyncHandler ? `await ${handle}` : handle;
      report("afterHandle")();
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set, c.request)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(${handled}, c.set, c.request)
`;
      else
        fnLiteral += `return mapCompactResponse(${handled}, c.request)
`;
    }
  }
  if (hasErrorHandler || handleResponse) {
    fnLiteral += `
} catch(error) {`;
    if (!maybeAsync)
      fnLiteral += `return (async () => {`;
    fnLiteral += `const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`;
    const endError = report("error", {
      unit: hooks.error.length
    });
    if (hooks.error.length) {
      fnLiteral += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let i = 0; i < hooks.error.length; i++) {
        const name = `er${i}`;
        const endUnit = report("error.unit", {
          name: hooks.error[i].fn.name
        });
        fnLiteral += `
let ${name} = handleErrors[${i}](c)
`;
        if (isAsync(hooks.error[i]))
          fnLiteral += `if (${name} instanceof Promise) ${name} = await ${name}
`;
        endUnit();
        fnLiteral += `${name} = mapEarlyResponse(${name}, set, c.request)
`;
        fnLiteral += `if (${name}) {`;
        fnLiteral += `return ${name} }
`;
      }
    }
    endError();
    fnLiteral += `return handleError(c, error, true)

`;
    if (!maybeAsync)
      fnLiteral += "})()";
    fnLiteral += "}";
    if (handleResponse || hasTrace) {
      fnLiteral += ` finally { `;
      const endResponse = report("response", {
        unit: hooks.onResponse.length
      });
      fnLiteral += handleResponse;
      endResponse();
      fnLiteral += `}`;
    }
  }
  fnLiteral = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ELYSIA_RESPONSE
	} = hooks

	${hooks.onResponse.length ? `const ${hooks.onResponse.map((x, i) => `res${i} = onResponse[${i}]`).join(",")}` : ""}

	return ${maybeAsync ? "async" : ""} function handle(c) {
		${hooks.beforeHandle.length ? "let be" : ""}
		${hooks.afterHandle.length ? "let af" : ""}
		${hooks.mapResponse.length ? "let mr" : ""}

		${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
		${fnLiteral}
	}`;
  const createHandler = Function("hooks", fnLiteral);
  return createHandler({
    handler,
    hooks: lifeCycleToFn(hooks),
    validator,
    // @ts-expect-error
    handleError: app.handleError,
    utils: {
      mapResponse,
      mapCompactResponse,
      mapEarlyResponse,
      parseQuery: import_fast_querystring2.parse,
      isNotEmpty
    },
    error: {
      NotFoundError,
      ValidationError,
      InternalServerError,
      ParseError
    },
    schema: app.router.history,
    // @ts-expect-error
    definitions: app.definitions.type,
    ERROR_CODE,
    // @ts-expect-error
    getReporter: () => app.reporter,
    requestId,
    parseCookie,
    signCookie,
    decodeURIComponent: import_fast_decode_uri_component2.default,
    ELYSIA_RESPONSE
  });
};
var composeGeneralHandler = (app) => {
  const inference = {
    event: {
      // @ts-expect-error
      ...app.inference.event,
      // @ts-expect-error
      queries: [...app.inference.event.queries]
    },
    // @ts-expect-error
    trace: { ...app.inference.trace }
  };
  let decoratorsLiteral = "";
  let fnLiteral = "";
  const defaultHeaders = app.setHeaders;
  for (const key of Object.keys(app.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  const router = app.router;
  const hasTrace = app.event.trace.length > 0;
  let findDynamicRoute = `
	const route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

	if (route === null)
		return ${app.event.error.length ? `app.handleError(ctx, notFound)` : app.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : `error404.clone()`}

	ctx.params = route.params
`;
  const shouldPrecompile = app.config.precompile === true || typeof app.config.precompile === "object" && app.config.precompile.compose === true;
  if (!shouldPrecompile)
    findDynamicRoute += `
			if(route.store.composed)
				return route.store.composed(ctx)

			if(route.store.compose)
				return (route.store.compose())(ctx)`;
  else
    findDynamicRoute += `return route.store(ctx)`;
  findDynamicRoute += "\n";
  let switchMap = ``;
  for (const [path, { code, all }] of Object.entries(router.static.http.map))
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  const maybeAsync = app.event.request.some(isAsync);
  const init = `

	const url = request.url
	const s = url.indexOf('/', 11)
	const qi = url.indexOf('?', s + 1)
	let path
	if(qi === -1)
		path = url.substring(s)
	else
		path = url.substring(s, qi)
`;
  fnLiteral += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter,
		handleError,
		error,
		redirect
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const wsRouter = app.router.ws
	const router = app.router.http

	const notFound = new NotFoundError()

	${app.event.request.length ? `const onRequest = app.event.request.map(x => x.fn)` : ""}
	${router.static.http.variables}
	${app.event.error.length ? "" : `
	const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
	`}

	return ${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app.event.request.length)
    fnLiteral += `let re`;
  const report = createReport({
    hasTrace,
    hasTraceSet: inference.trace.set,
    condition: {
      request: inference.trace.request
    },
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  if (app.event.request.length) {
    fnLiteral += `
			${hasTrace ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				redirect,
				set: {
					headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
					status: 200
				},
				error
				${hasTrace ? ",$$requestId: +id" : ""}
				${decoratorsLiteral}
			}
		`;
    const endReport = report("request", {
      attribute: "ctx",
      unit: app.event.request.length
    });
    fnLiteral += `
 try {
`;
    for (let i = 0; i < app.event.request.length; i++) {
      const hook = app.event.request[i];
      const withReturn = hasReturn(hook.fn.toString());
      const maybeAsync2 = isAsync(hook);
      const endUnit = report("request.unit", {
        name: app.event.request[i].fn.name
      });
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
					${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
					ctx.set,
					request
				)
`;
        endUnit();
        fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
    endReport();
    fnLiteral += init;
    fnLiteral += `
ctx.qi = qi
 ctx.path = path
`;
  } else {
    fnLiteral += init;
    fnLiteral += `${hasTrace ? "const id = +requestId.value++" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			redirect,
			set: {
				headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			},
			error
			${hasTrace ? ",$$requestId: id" : ""}
			${decoratorsLiteral}
		}`;
    report("request", {
      unit: app.event.request.length,
      attribute: inference.trace.context || inference.trace.store || inference.trace.set ? "ctx" : ""
    })();
  }
  const wsPaths = app.router.static.ws;
  const wsRouter = app.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (const [path, index] of Object.entries(wsPaths)) {
      fnLiteral += `
					case '${path}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${index}(ctx)

						break`;
    }
    fnLiteral += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  fnLiteral += `
		map: switch(path) {
			${switchMap}

			default:
				break
		}

		${findDynamicRoute}
	}`;
  const handleError = composeErrorHandler(app);
  app.handleError = handleError;
  return Function(
    "data",
    fnLiteral
  )({
    app,
    mapEarlyResponse,
    NotFoundError,
    // @ts-ignore
    getReporter: () => app.reporter,
    requestId,
    handleError,
    error,
    redirect
  });
};
var composeErrorHandler = (app) => {
  let fnLiteral = `const {
		app: { event: { error: onErrorContainer, onResponse: resContainer } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE
	} = inject

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${app.event.error.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {
		let r

		const { set } = context

		context.code = error.code
		context.error = error

		if(typeof error === "object" && ELYSIA_RESPONSE in error) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}
`;
  for (let i = 0; i < app.event.error.length; i++) {
    const handler = app.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    fnLiteral += "\nif(skipGlobal !== true) {\n";
    if (hasReturn(handler.fn.toString()))
      fnLiteral += `r = ${response}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status
				return mapResponse(r, set, context.request)
			}
`;
    else
      fnLiteral += response + "\n";
    fnLiteral += "\n}\n";
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 422
		return new Response(
			error.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)

		return mapResponse(error, set, context.request)
	}
}`;
  return Function(
    "inject",
    fnLiteral
  )({
    app,
    mapResponse,
    ERROR_CODE,
    ELYSIA_RESPONSE
  });
};
var jitRoute = (index) => `if(stc${index}) return stc${index}(ctx)
if(st${index}.compose) return (stc${index} = st${index}.compose())(ctx)

return st${index}(ctx)`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  composeErrorHandler,
  composeGeneralHandler,
  composeHandler,
  hasProperty,
  hasReturn,
  hasTransform,
  hasType,
  isAsync,
  jitRoute
});
/**
 * @license
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Evgeny Poberezkin
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
