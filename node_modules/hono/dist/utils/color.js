// src/utils/color.ts
function getColorEnabled() {
  const { process, Deno } = globalThis;
  const isNoColor = typeof process !== "undefined" ? "NO_COLOR" in process?.env : typeof Deno?.noColor === "boolean" ? Deno.noColor : false;
  return !isNoColor;
}
export {
  getColorEnabled
};
