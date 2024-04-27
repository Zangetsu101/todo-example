// src/jsx/dom/jsx-dev-runtime.ts
import { normalizeIntrinsicElementProps } from "../utils.js";
var jsxDEV = (tag, props, key) => {
  if (typeof tag === "string") {
    normalizeIntrinsicElementProps(props);
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
var Fragment = (props) => jsxDEV("", props, void 0);
export {
  Fragment,
  jsxDEV
};
