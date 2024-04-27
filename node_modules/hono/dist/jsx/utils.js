// src/jsx/utils.ts
var normalizeIntrinsicElementProps = (props) => {
  if (props && "className" in props) {
    props["class"] = props["className"];
    delete props["className"];
  }
};
export {
  normalizeIntrinsicElementProps
};
