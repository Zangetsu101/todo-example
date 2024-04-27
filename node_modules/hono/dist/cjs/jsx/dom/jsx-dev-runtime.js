"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var jsx_dev_runtime_exports = {};
__export(jsx_dev_runtime_exports, {
  Fragment: () => Fragment,
  jsxDEV: () => jsxDEV
});
module.exports = __toCommonJS(jsx_dev_runtime_exports);
var import_utils = require("../utils");
const jsxDEV = (tag, props, key) => {
  if (typeof tag === "string") {
    (0, import_utils.normalizeIntrinsicElementProps)(props);
  }
  let children;
  if (props && "children" in props) {
    children = props.children;
    delete props["children"];
  } else {
    children = [];
  }
  return {
    tag,
    props,
    key,
    children: Array.isArray(children) ? children : [children]
  };
};
const Fragment = (props) => jsxDEV("", props, void 0);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Fragment,
  jsxDEV
});
