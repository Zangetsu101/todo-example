// src/jsx/dom/context.ts
import { DOM_ERROR_HANDLER } from "../constants.js";
import { globalContexts } from "../context.js";
import { Fragment } from "./jsx-runtime.js";
var createContextProviderFunction = (values) => ({ value, children }) => {
  const res = Fragment({
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
  res[DOM_ERROR_HANDLER] = (err) => {
    values.pop();
    throw err;
  };
  return res;
};
var createContext = (defaultValue) => {
  const values = [defaultValue];
  const context = {
    values,
    Provider: createContextProviderFunction(values)
  };
  globalContexts.push(context);
  return context;
};
export {
  createContext,
  createContextProviderFunction
};
