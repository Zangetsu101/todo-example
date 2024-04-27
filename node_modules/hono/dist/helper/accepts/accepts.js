// src/helper/accepts/accepts.ts
var parseAccept = (acceptHeader) => {
  const accepts2 = acceptHeader.split(",");
  return accepts2.map((accept) => {
    const [type, ...params] = accept.trim().split(";");
    const q = params.find((param) => param.startsWith("q="));
    return {
      type,
      params: params.reduce((acc, param) => {
        const [key, value] = param.split("=");
        return { ...acc, [key.trim()]: value.trim() };
      }, {}),
      q: q ? parseFloat(q.split("=")[1]) : 1
    };
  });
};
var defaultMatch = (accepts2, config) => {
  const { supports, default: defaultSupport } = config;
  const accept = accepts2.sort((a, b) => b.q - a.q).find((accept2) => supports.includes(accept2.type));
  return accept ? accept.type : defaultSupport;
};
var accepts = (c, options) => {
  const acceptHeader = c.req.header(options.header);
  if (!acceptHeader) {
    return options.default;
  }
  const accepts2 = parseAccept(acceptHeader);
  const match = options.match || defaultMatch;
  return match(accepts2, options);
};
export {
  accepts,
  defaultMatch,
  parseAccept
};
