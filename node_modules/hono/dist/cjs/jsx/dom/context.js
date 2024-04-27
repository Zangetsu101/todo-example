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
var context_exports = {};
__export(context_exports, {
  createContext: () => createContext,
  createContextProviderFunction: () => createContextProviderFunction
});
module.exports = __toCommonJS(context_exports);
var import_constants = require("../constants");
var import_context = require("../context");
var import_jsx_runtime = require("./jsx-runtime");
const createContextProviderFunction = (values) => ({ value, children }) => {
  const res = (0, import_jsx_runtime.Fragment)({
    children: [
      {
        tag: () => {
          values.push(value);
        }
      },
      ...children,
      {
        tag: () => {
          values.pop();
        }
      }
    ]
  });
  res[import_constants.DOM_ERROR_HANDLER] = (err) => {
    values.pop();
    throw err;
  };
  return res;
};
const createContext = (defaultValue) => {
  const values = [defaultValue];
  const context = {
    values,
    Provider: createContextProviderFunction(values)
  };
  import_context.globalContexts.push(context);
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createContext,
  createContextProviderFunction
});
