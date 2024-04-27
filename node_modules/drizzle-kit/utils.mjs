#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/ansi-styles/index.js
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ANSI_BACKGROUND_OFFSET, wrapAnsi16, wrapAnsi256, wrapAnsi16m, styles, modifierNames, foregroundColorNames, backgroundColorNames, colorNames, ansiStyles, ansi_styles_default;
var init_ansi_styles = __esm({
  "node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/ansi-styles/index.js"() {
    ANSI_BACKGROUND_OFFSET = 10;
    wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
    wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        gray: [90, 39],
        // Alias of `blackBright`
        grey: [90, 39],
        // Alias of `blackBright`
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgGray: [100, 49],
        // Alias of `bgBlackBright`
        bgGrey: [100, 49],
        // Alias of `bgBlackBright`
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    modifierNames = Object.keys(styles.modifier);
    foregroundColorNames = Object.keys(styles.color);
    backgroundColorNames = Object.keys(styles.bgColor);
    colorNames = [...foregroundColorNames, ...backgroundColorNames];
    ansiStyles = assembleStyles();
    ansi_styles_default = ansiStyles;
  }
});

// node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/supports-color/index.js
import process2 from "node:process";
import os from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var env, flagForceColor, supportsColor, supports_color_default;
var init_supports_color = __esm({
  "node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/vendor/supports-color/index.js"() {
    ({ env } = process2);
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      flagForceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      flagForceColor = 1;
    }
    supportsColor = {
      stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
      stderr: createSupportsColor({ isTTY: tty.isatty(2) })
    };
    supports_color_default = supportsColor;
  }
});

// node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index4 = string.indexOf(substring);
  if (index4 === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index4) + substring + replacer;
    endIndex = index4 + substringLength;
    index4 = string.indexOf(substring, endIndex);
  } while (index4 !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index4) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index4 - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index4 - 1 : index4) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index4 + 1;
    index4 = string.indexOf("\n", endIndex);
  } while (index4 !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
var init_utilities = __esm({
  "node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/utilities.js"() {
  }
});

// node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/index.js
function createChalk(options) {
  return chalkFactory(options);
}
var stdoutColor, stderrColor, GENERATOR, STYLER, IS_EMPTY, levelMapping, styles2, applyOptions, chalkFactory, getModelAnsi, usedModels, proto, createStyler, createBuilder, applyStyle, chalk, chalkStderr, source_default;
var init_source = __esm({
  "node_modules/.pnpm/chalk@5.2.0/node_modules/chalk/source/index.js"() {
    init_ansi_styles();
    init_supports_color();
    init_utilities();
    init_ansi_styles();
    ({ stdout: stdoutColor, stderr: stderrColor } = supports_color_default);
    GENERATOR = Symbol("GENERATOR");
    STYLER = Symbol("STYLER");
    IS_EMPTY = Symbol("IS_EMPTY");
    levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    styles2 = /* @__PURE__ */ Object.create(null);
    applyOptions = (object, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options.level === void 0 ? colorLevel : options.level;
    };
    chalkFactory = (options) => {
      const chalk2 = (...strings) => strings.join(" ");
      applyOptions(chalk2, options);
      Object.setPrototypeOf(chalk2, createChalk.prototype);
      return chalk2;
    };
    Object.setPrototypeOf(createChalk.prototype, Function.prototype);
    for (const [styleName, style] of Object.entries(ansi_styles_default)) {
      styles2[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles2.visible = {
      get() {
        const builder = createBuilder(this, this[STYLER], true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    getModelAnsi = (model, level, type, ...arguments_) => {
      if (model === "rgb") {
        if (level === "ansi16m") {
          return ansi_styles_default[type].ansi16m(...arguments_);
        }
        if (level === "ansi256") {
          return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
        }
        return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
      }
      if (model === "hex") {
        return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
      }
      return ansi_styles_default[type][model](...arguments_);
    };
    usedModels = ["rgb", "hex", "ansi256"];
    for (const model of usedModels) {
      styles2[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles2[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
            return createBuilder(this, styler, this[IS_EMPTY]);
          };
        }
      };
    }
    proto = Object.defineProperties(() => {
    }, {
      ...styles2,
      level: {
        enumerable: true,
        get() {
          return this[GENERATOR].level;
        },
        set(level) {
          this[GENERATOR].level = level;
        }
      }
    });
    createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      Object.setPrototypeOf(builder, proto);
      builder[GENERATOR] = self2;
      builder[STYLER] = _styler;
      builder[IS_EMPTY] = _isEmpty;
      return builder;
    };
    applyStyle = (self2, string) => {
      if (self2.level <= 0 || !string) {
        return self2[IS_EMPTY] ? "" : string;
      }
      let styler = self2[STYLER];
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.includes("\x1B")) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    Object.defineProperties(createChalk.prototype, styles2);
    chalk = createChalk();
    chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
    source_default = chalk;
  }
});

// node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/readline.js
var require_readline = __commonJS({
  "node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/readline.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepareReadLine = void 0;
    var prepareReadLine = () => {
      const stdin = process.stdin;
      const stdout = process.stdout;
      const readline = __require("readline");
      const rl = readline.createInterface({
        input: stdin,
        escapeCodeTimeout: 50
      });
      readline.emitKeypressEvents(stdin, rl);
      return {
        stdin,
        stdout,
        closable: rl
      };
    };
    exports.prepareReadLine = prepareReadLine;
  }
});

// node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module.exports = { cursor, scroll, erase, beep };
  }
});

// node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clear = void 0;
    var sisteransi_1 = require_src();
    var strip = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
    var stringWidth = (str) => [...strip(str)].length;
    var clear = function(prompt, perLine) {
      if (!perLine)
        return sisteransi_1.erase.line + sisteransi_1.cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(stringWidth(line) - 1, 0) / perLine);
      }
      return sisteransi_1.erase.lines(rows);
    };
    exports.clear = clear;
  }
});

// node_modules/.pnpm/lodash.throttle@4.1.1/node_modules/lodash.throttle/index.js
var require_lodash = __commonJS({
  "node_modules/.pnpm/lodash.throttle@4.1.1/node_modules/lodash.throttle/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function throttle(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = throttle;
  }
});

// node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/index.js
var require_hanji = __commonJS({
  "node_modules/.pnpm/hanji@0.0.5/node_modules/hanji/index.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onTerminate = exports.renderWithTask = exports.render = exports.TaskTerminal = exports.TaskView = exports.Terminal = exports.deferred = exports.SelectState = exports.Prompt = void 0;
    var readline_1 = require_readline();
    var sisteransi_1 = require_src();
    var utils_1 = require_utils();
    var lodash_throttle_1 = __importDefault(require_lodash());
    var Prompt2 = class {
      constructor() {
        this.attachCallbacks = [];
        this.detachCallbacks = [];
        this.inputCallbacks = [];
      }
      requestLayout() {
        this.terminal.requestLayout();
      }
      on(type, callback) {
        if (type === "attach") {
          this.attachCallbacks.push(callback);
        } else if (type === "detach") {
          this.detachCallbacks.push(callback);
        } else if (type === "input") {
          this.inputCallbacks.push(callback);
        }
      }
      attach(terminal) {
        this.terminal = terminal;
        this.attachCallbacks.forEach((it) => it(terminal));
      }
      detach(terminal) {
        this.detachCallbacks.forEach((it) => it(terminal));
        this.terminal = void 0;
      }
      input(str, key) {
        this.inputCallbacks.forEach((it) => it(str, key));
      }
    };
    exports.Prompt = Prompt2;
    var SelectState2 = class {
      constructor(items) {
        this.items = items;
        this.selectedIdx = 0;
      }
      bind(prompt) {
        prompt.on("input", (str, key) => {
          const invalidate = this.consume(str, key);
          if (invalidate)
            prompt.requestLayout();
        });
      }
      consume(str, key) {
        if (!key)
          return false;
        if (key.name === "down") {
          this.selectedIdx = (this.selectedIdx + 1) % this.items.length;
          return true;
        }
        if (key.name === "up") {
          this.selectedIdx -= 1;
          this.selectedIdx = this.selectedIdx < 0 ? this.items.length - 1 : this.selectedIdx;
          return true;
        }
        return false;
      }
    };
    exports.SelectState = SelectState2;
    var deferred = () => {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return {
        resolve,
        reject,
        promise
      };
    };
    exports.deferred = deferred;
    var Terminal = class {
      constructor(view, stdin, stdout, closable) {
        this.view = view;
        this.stdin = stdin;
        this.stdout = stdout;
        this.closable = closable;
        this.text = "";
        this.status = "idle";
        if (this.stdin.isTTY)
          this.stdin.setRawMode(true);
        const keypress = (str, key) => {
          if (key.name === "c" && key.ctrl === true) {
            this.requestLayout();
            this.view.detach(this);
            this.tearDown(keypress);
            if (terminateHandler) {
              terminateHandler(this.stdin, this.stdout);
              return;
            }
            this.stdout.write(`
^C
`);
            process.exit(1);
          }
          if (key.name === "escape") {
            this.status = "aborted";
            this.requestLayout();
            this.view.detach(this);
            this.tearDown(keypress);
            this.resolve({ status: "aborted", data: void 0 });
            return;
          }
          if (key.name === "return") {
            this.status = "submitted";
            this.requestLayout();
            this.view.detach(this);
            this.tearDown(keypress);
            this.resolve({ status: "submitted", data: this.view.result() });
            return;
          }
          view.input(str, key);
        };
        this.stdin.on("keypress", keypress);
        this.view.attach(this);
        const { resolve, promise } = (0, exports.deferred)();
        this.resolve = resolve;
        this.promise = promise;
        this.renderFunc = (0, lodash_throttle_1.default)((str) => {
          this.stdout.write(str);
        });
      }
      tearDown(keypress) {
        this.stdout.write(sisteransi_1.cursor.show);
        this.stdin.removeListener("keypress", keypress);
        if (this.stdin.isTTY)
          this.stdin.setRawMode(false);
        this.closable.close();
      }
      result() {
        return this.promise;
      }
      toggleCursor(state) {
        if (state === "hide") {
          this.stdout.write(sisteransi_1.cursor.hide);
        } else {
          this.stdout.write(sisteransi_1.cursor.show);
        }
      }
      requestLayout() {
        const string = this.view.render(this.status);
        const clearPrefix = this.text ? (0, utils_1.clear)(this.text, this.stdout.columns) : "";
        this.text = string;
        this.renderFunc(`${clearPrefix}${string}`);
      }
    };
    exports.Terminal = Terminal;
    var TaskView2 = class {
      constructor() {
        this.attachCallbacks = [];
        this.detachCallbacks = [];
      }
      requestLayout() {
        this.terminal.requestLayout();
      }
      attach(terminal) {
        this.terminal = terminal;
        this.attachCallbacks.forEach((it) => it(terminal));
      }
      detach(terminal) {
        this.detachCallbacks.forEach((it) => it(terminal));
        this.terminal = void 0;
      }
      on(type, callback) {
        if (type === "attach") {
          this.attachCallbacks.push(callback);
        } else if (type === "detach") {
          this.detachCallbacks.push(callback);
        }
      }
    };
    exports.TaskView = TaskView2;
    var TaskTerminal = class {
      constructor(view, stdout) {
        this.view = view;
        this.stdout = stdout;
        this.text = "";
        this.view.attach(this);
      }
      requestLayout() {
        const string = this.view.render("pending");
        const clearPrefix = this.text ? (0, utils_1.clear)(this.text, this.stdout.columns) : "";
        this.text = string;
        this.stdout.write(`${clearPrefix}${string}`);
      }
      clear() {
        const string = this.view.render("done");
        this.view.detach(this);
        const clearPrefix = this.text ? (0, utils_1.clear)(this.text, this.stdout.columns) : "";
        this.stdout.write(`${clearPrefix}${string}`);
      }
    };
    exports.TaskTerminal = TaskTerminal;
    function render3(view) {
      const { stdin, stdout, closable } = (0, readline_1.prepareReadLine)();
      if (view instanceof Prompt2) {
        const terminal = new Terminal(view, stdin, stdout, closable);
        terminal.requestLayout();
        return terminal.result();
      }
      stdout.write(`${view}
`);
      closable.close();
      return;
    }
    exports.render = render3;
    function renderWithTask(view, task) {
      return __awaiter(this, void 0, void 0, function* () {
        const terminal = new TaskTerminal(view, process.stdout);
        terminal.requestLayout();
        const result = yield task;
        terminal.clear();
        return result;
      });
    }
    exports.renderWithTask = renderWithTask;
    var terminateHandler;
    function onTerminate(callback) {
      terminateHandler = callback;
    }
    exports.onTerminate = onTerminate;
  }
});

// src/cli/views.ts
var import_hanji, info;
var init_views = __esm({
  "src/cli/views.ts"() {
    init_source();
    import_hanji = __toESM(require_hanji());
    info = (msg, greyMsg = "") => {
      return `${source_default.blue.bold("Info:")} ${msg} ${greyMsg ? source_default.grey(greyMsg) : ""}`.trim();
    };
  }
});

// node_modules/.pnpm/zod@3.20.2/node_modules/zod/lib/index.mjs
function getErrorMap() {
  return overrideErrorMap;
}
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
function deepPartialify(schema4) {
  if (schema4 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema4.shape) {
      const fieldSchema = schema4.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema4._def,
      shape: () => newShape
    });
  } else if (schema4 instanceof ZodArray) {
    return ZodArray.create(deepPartialify(schema4.element));
  } else if (schema4 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema4.unwrap()));
  } else if (schema4 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema4.unwrap()));
  } else if (schema4 instanceof ZodTuple) {
    return ZodTuple.create(schema4.items.map((item) => deepPartialify(item)));
  } else {
    return schema4;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index4 = 0; index4 < a.length; index4++) {
      const itemA = a[index4];
      const itemB = b[index4];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var util, ZodParsedType, getParsedType, ZodIssueCode, ZodError, errorMap, overrideErrorMap, makeIssue, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync, errorUtil, ParseInputLazyPath, handleResult, ZodType, cuidRegex, uuidRegex, emailRegex, datetimeRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, objectUtil, AugmentFactory, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, late, ZodFirstPartyTypeKind, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType;
var init_lib = __esm({
  "node_modules/.pnpm/zod@3.20.2/node_modules/zod/lib/index.mjs"() {
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    ZodError = class extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error2) => {
          for (const issue of error2.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error2 = new ZodError(issues);
      return error2;
    };
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(issue.minimum)}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(issue.maximum)}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    overrideErrorMap = errorMap;
    makeIssue = (params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: issueData.message || errorMessage
      };
    };
    ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          syncPairs.push({
            key: await pair.key,
            value: await pair.value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (typeof value.value !== "undefined" || pair.alwaysSet) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== void 0 && x instanceof Promise;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        return this._path.concat(this._key);
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        const error2 = new ZodError(ctx.common.issues);
        return { success: false, error: error2 };
      }
    };
    ZodType = class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this);
      }
      nullable() {
        return ZodNullable.create(this);
      }
      nullish() {
        return this.optional().nullable();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this);
      }
      or(option) {
        return ZodUnion.create([this, option]);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming);
      }
      transform(transform) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(void 0)
        });
      }
      catch(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
    emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    datetimeRegex = (args) => {
      if (args.precision) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
        }
      } else if (args.precision === 0) {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
        }
      } else {
        if (args.offset) {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}:\\d{2})|Z)$`);
        } else {
          return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
        }
      }
    };
    ZodString = class _ZodString extends ZodType {
      constructor() {
        super(...arguments);
        this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
        this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
        this.trim = () => new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(
            ctx2,
            {
              code: ZodIssueCode.invalid_type,
              expected: ZodParsedType.string,
              received: ctx2.parsedType
            }
            //
          );
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      datetime(options) {
        var _a;
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
          offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
          ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
        });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      var _a;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int");
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBigInt.create = (params) => {
      var _a;
      return new ZodBigInt({
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all(ctx.data.map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = ctx.data.map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema4, params) => {
      return new ZodArray({
        type: schema4,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    AugmentFactory = (def) => (augmentation) => {
      return new ZodObject({
        ...def,
        shape: () => ({
          ...def.shape(),
          ...augmentation
        })
      });
    };
    ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = AugmentFactory(this._def);
        this.extend = AugmentFactory(this._def);
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              syncPairs.push({
                key,
                value: await pair.value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      setKey(key, schema4) {
        return this.augment({ [key]: schema4 });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      catchall(index4) {
        return new _ZodObject({
          ...this._def,
          catchall: index4
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).map((key) => {
          if (this.shape[key])
            shape[key] = this.shape[key];
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).map((key) => {
          if (util.objectKeys(mask).indexOf(key) === -1) {
            shape[key] = this.shape[key];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        if (mask) {
          util.objectKeys(this.shape).map((key) => {
            if (util.objectKeys(mask).indexOf(key) === -1) {
              newShape[key] = this.shape[key];
            } else {
              newShape[key] = this.shape[key].optional();
            }
          });
          return new _ZodObject({
            ...this._def,
            shape: () => newShape
          });
        } else {
          for (const key in this.shape) {
            const fieldSchema = this.shape[key];
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        if (mask) {
          util.objectKeys(this.shape).map((key) => {
            if (util.objectKeys(mask).indexOf(key) === -1) {
              newShape[key] = this.shape[key];
            } else {
              const fieldSchema = this.shape[key];
              let newField = fieldSchema;
              while (newField instanceof ZodOptional) {
                newField = newField._def.innerType;
              }
              newShape[key] = newField;
            }
          });
        } else {
          for (const key in this.shape) {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return Object.keys(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else {
        return null;
      }
    };
    ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = ctx.data.map((item, itemIndex) => {
          const schema4 = this._def.items[itemIndex] || this._def.rest;
          if (!schema4)
            return null;
          return schema4._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index4) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index4, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index4, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error2) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error2
            }
          });
        }
        function makeReturnsIssue(returns, error2) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error2
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          return OK(async (...args) => {
            const error2 = new ZodError([]);
            const parsedArgs = await this._def.args.parseAsync(args, params).catch((e) => {
              error2.addIssue(makeArgsIssue(args, e));
              throw error2;
            });
            const result = await fn(...parsedArgs);
            const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error2.addIssue(makeReturnsIssue(result, e));
              throw error2;
            });
            return parsedReturns;
          });
        } else {
          return OK((...args) => {
            const parsedArgs = this._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = fn(...parsedArgs.data);
            const parsedReturns = this._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (this._def.values.indexOf(input.data) === -1) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (nativeEnumValues.indexOf(input.data) === -1) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema4, params) => {
      return new ZodPromise({
        type: schema4,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data);
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => {
              return this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
            });
          } else {
            return this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
          }
        }
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return base;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return base;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema4, effect, params) => {
      return new ZodEffects({
        schema: schema4,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema4, params) => {
      return new ZodEffects({
        schema: schema4,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const result = this._def.innerType._parse({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.defaultValue()
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.defaultValue()
          };
        }
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
  }
});

// src/serializer/index.ts
import * as glob from "glob";
var init_serializer = __esm({
  "src/serializer/index.ts"() {
    init_source();
    init_views();
  }
});

// src/cli/validations/outputs.ts
var init_outputs = __esm({
  "src/cli/validations/outputs.ts"() {
    init_source();
  }
});

// src/utils.ts
init_views();
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from "fs";

// src/global.ts
var originUUID = "00000000-0000-0000-0000-000000000000";
var snapshotVersion = "5";
var mapValues = (obj, map) => {
  const result = Object.keys(obj).reduce(function(result2, key) {
    result2[key] = map(obj[key]);
    return result2;
  }, {});
  return result;
};

// src/serializer/mysqlSchema.ts
init_lib();
var index = objectType({
  name: stringType(),
  columns: stringType().array(),
  isUnique: booleanType(),
  using: enumType(["btree", "hash"]).optional(),
  algorithm: enumType(["default", "inplace", "copy"]).optional(),
  lock: enumType(["default", "none", "shared", "exclusive"]).optional()
}).strict();
var fk = objectType({
  name: stringType(),
  tableFrom: stringType(),
  columnsFrom: stringType().array(),
  tableTo: stringType(),
  columnsTo: stringType().array(),
  onUpdate: stringType().optional(),
  onDelete: stringType().optional()
}).strict();
var column = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType(),
  notNull: booleanType(),
  autoincrement: booleanType().optional(),
  default: anyType().optional(),
  onUpdate: anyType().optional()
}).strict();
var tableV3 = objectType({
  name: stringType(),
  columns: recordType(stringType(), column),
  indexes: recordType(stringType(), index),
  foreignKeys: recordType(stringType(), fk)
}).strict();
var compositePK = objectType({
  name: stringType(),
  columns: stringType().array()
}).strict();
var uniqueConstraint = objectType({
  name: stringType(),
  columns: stringType().array()
}).strict();
var tableV4 = objectType({
  name: stringType(),
  schema: stringType().optional(),
  columns: recordType(stringType(), column),
  indexes: recordType(stringType(), index),
  foreignKeys: recordType(stringType(), fk)
}).strict();
var table = objectType({
  name: stringType(),
  schema: stringType().optional(),
  columns: recordType(stringType(), column),
  indexes: recordType(stringType(), index),
  foreignKeys: recordType(stringType(), fk),
  compositePrimaryKeys: recordType(stringType(), compositePK),
  uniqueConstraints: recordType(stringType(), uniqueConstraint).default({})
}).strict();
var dialect = literalType("mysql");
var schemaHash = objectType({
  id: stringType(),
  prevId: stringType()
});
var schemaInternalV3 = objectType({
  version: literalType("3"),
  dialect,
  tables: recordType(stringType(), tableV3)
}).strict();
var schemaInternalV4 = objectType({
  version: literalType("4"),
  dialect,
  tables: recordType(stringType(), tableV4),
  schemas: recordType(stringType(), stringType())
}).strict();
var kitInternals = objectType({
  tables: recordType(
    stringType(),
    objectType({
      columns: recordType(
        stringType(),
        objectType({ isDefaultAnExpression: booleanType().optional() }).optional()
      )
    }).optional()
  )
}).optional();
var schemaInternal = objectType({
  version: literalType("5"),
  dialect,
  tables: recordType(stringType(), table),
  schemas: recordType(stringType(), stringType()),
  _meta: objectType({
    schemas: recordType(stringType(), stringType()),
    tables: recordType(stringType(), stringType()),
    columns: recordType(stringType(), stringType())
  }),
  internal: kitInternals
}).strict();
var schemaV3 = schemaInternalV3.merge(schemaHash);
var schemaV4 = schemaInternalV4.merge(schemaHash);
var schema = schemaInternal.merge(schemaHash);
var tableSquashedV4 = objectType({
  name: stringType(),
  schema: stringType().optional(),
  columns: recordType(stringType(), column),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType())
}).strict();
var tableSquashed = objectType({
  name: stringType(),
  schema: stringType().optional(),
  columns: recordType(stringType(), column),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType()),
  compositePrimaryKeys: recordType(stringType(), stringType()),
  uniqueConstraints: recordType(stringType(), stringType()).default({})
}).strict();
var schemaSquashed = objectType({
  version: literalType("5"),
  dialect,
  tables: recordType(stringType(), tableSquashed),
  schemas: recordType(stringType(), stringType())
}).strict();
var schemaSquashedV4 = objectType({
  version: literalType("4"),
  dialect,
  tables: recordType(stringType(), tableSquashedV4),
  schemas: recordType(stringType(), stringType())
}).strict();
var MySqlSquasher = {
  squashIdx: (idx) => {
    index.parse(idx);
    return `${idx.name};${idx.columns.join(",")};${idx.isUnique};${idx.using ?? ""};${idx.algorithm ?? ""};${idx.lock ?? ""}`;
  },
  unsquashIdx: (input) => {
    const [name, columnsString, isUnique, using, algorithm, lock] = input.split(";");
    const destructed = {
      name,
      columns: columnsString.split(","),
      isUnique: isUnique === "true",
      using: using ? using : void 0,
      algorithm: algorithm ? algorithm : void 0,
      lock: lock ? lock : void 0
    };
    return index.parse(destructed);
  },
  squashPK: (pk) => {
    return `${pk.name};${pk.columns.join(",")}`;
  },
  unsquashPK: (pk) => {
    const splitted = pk.split(";");
    return { name: splitted[0], columns: splitted[1].split(",") };
  },
  squashUnique: (unq) => {
    return `${unq.name};${unq.columns.join(",")}`;
  },
  unsquashUnique: (unq) => {
    const [name, columns] = unq.split(";");
    return { name, columns: columns.split(",") };
  },
  squashFK: (fk4) => {
    return `${fk4.name};${fk4.tableFrom};${fk4.columnsFrom.join(",")};${fk4.tableTo};${fk4.columnsTo.join(",")};${fk4.onUpdate ?? ""};${fk4.onDelete ?? ""}`;
  },
  unsquashFK: (input) => {
    const [
      name,
      tableFrom,
      columnsFromStr,
      tableTo,
      columnsToStr,
      onUpdate,
      onDelete
    ] = input.split(";");
    const result = fk.parse({
      name,
      tableFrom,
      columnsFrom: columnsFromStr.split(","),
      tableTo,
      columnsTo: columnsToStr.split(","),
      onUpdate,
      onDelete
    });
    return result;
  }
};
var mysqlSchema = schema;
var backwardCompatibleMysqlSchema = unionType([
  schemaV3,
  schemaV4,
  schema
]);
var dryMySql = mysqlSchema.parse({
  version: snapshotVersion,
  dialect: "mysql",
  id: originUUID,
  prevId: "",
  tables: {},
  schemas: {},
  _meta: {
    schemas: {},
    tables: {},
    columns: {}
  }
});

// src/serializer/pgSchema.ts
init_lib();
var indexV2 = objectType({
  name: stringType(),
  columns: recordType(
    stringType(),
    objectType({
      name: stringType()
    })
  ),
  isUnique: booleanType()
}).strict();
var columnV2 = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType(),
  notNull: booleanType(),
  default: anyType().optional(),
  references: stringType().optional()
}).strict();
var tableV2 = objectType({
  name: stringType(),
  columns: recordType(stringType(), columnV2),
  indexes: recordType(stringType(), indexV2)
}).strict();
var enumSchema = objectType({
  name: stringType(),
  values: recordType(stringType(), stringType())
}).strict();
var pgSchemaV2 = objectType({
  version: literalType("2"),
  tables: recordType(stringType(), tableV2),
  enums: recordType(stringType(), enumSchema)
}).strict();
var references = objectType({
  foreignKeyName: stringType(),
  table: stringType(),
  column: stringType(),
  onDelete: stringType().optional(),
  onUpdate: stringType().optional()
}).strict();
var columnV1 = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType(),
  notNull: booleanType(),
  default: anyType().optional(),
  references: references.optional()
}).strict();
var tableV1 = objectType({
  name: stringType(),
  columns: recordType(stringType(), columnV1),
  indexes: recordType(stringType(), indexV2)
}).strict();
var pgSchemaV1 = objectType({
  version: literalType("1"),
  tables: recordType(stringType(), tableV1),
  enums: recordType(stringType(), enumSchema)
}).strict();
var index2 = objectType({
  name: stringType(),
  columns: stringType().array(),
  isUnique: booleanType()
}).strict();
var fk2 = objectType({
  name: stringType(),
  tableFrom: stringType(),
  columnsFrom: stringType().array(),
  tableTo: stringType(),
  schemaTo: stringType().optional(),
  columnsTo: stringType().array(),
  onUpdate: stringType().optional(),
  onDelete: stringType().optional()
}).strict();
var column2 = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType(),
  notNull: booleanType(),
  default: anyType().optional(),
  isUnique: anyType().optional(),
  uniqueName: stringType().optional(),
  nullsNotDistinct: booleanType().optional()
}).strict();
var tableV32 = objectType({
  name: stringType(),
  columns: recordType(stringType(), column2),
  indexes: recordType(stringType(), index2),
  foreignKeys: recordType(stringType(), fk2)
}).strict();
var compositePK2 = objectType({
  name: stringType(),
  columns: stringType().array()
}).strict();
var uniqueConstraint2 = objectType({
  name: stringType(),
  columns: stringType().array(),
  nullsNotDistinct: booleanType()
}).strict();
var tableV42 = objectType({
  name: stringType(),
  schema: stringType(),
  columns: recordType(stringType(), column2),
  indexes: recordType(stringType(), index2),
  foreignKeys: recordType(stringType(), fk2)
}).strict();
var table2 = objectType({
  name: stringType(),
  schema: stringType(),
  columns: recordType(stringType(), column2),
  indexes: recordType(stringType(), index2),
  foreignKeys: recordType(stringType(), fk2),
  compositePrimaryKeys: recordType(stringType(), compositePK2),
  uniqueConstraints: recordType(stringType(), uniqueConstraint2).default({})
}).strict();
var schemaHash2 = objectType({
  id: stringType(),
  prevId: stringType()
});
var pgSchemaInternalV3 = objectType({
  version: literalType("3"),
  dialect: literalType("pg"),
  tables: recordType(stringType(), tableV32),
  enums: recordType(stringType(), enumSchema)
}).strict();
var pgSchemaInternalV4 = objectType({
  version: literalType("4"),
  dialect: literalType("pg"),
  tables: recordType(stringType(), tableV42),
  enums: recordType(stringType(), enumSchema),
  schemas: recordType(stringType(), stringType())
}).strict();
var pgSchemaExternal = objectType({
  version: literalType("5"),
  dialect: literalType("pg"),
  tables: arrayType(table2),
  enums: arrayType(enumSchema),
  schemas: arrayType(objectType({ name: stringType() })),
  _meta: objectType({
    schemas: recordType(stringType(), stringType()),
    tables: recordType(stringType(), stringType()),
    columns: recordType(stringType(), stringType())
  })
}).strict();
var kitInternals2 = objectType({
  tables: recordType(
    stringType(),
    objectType({
      columns: recordType(
        stringType(),
        objectType({
          isArray: booleanType().optional(),
          dimensions: numberType().optional(),
          rawType: stringType().optional()
        }).optional()
      )
    }).optional()
  )
}).optional();
var pgSchemaInternal = objectType({
  version: literalType("5"),
  dialect: literalType("pg"),
  tables: recordType(stringType(), table2),
  enums: recordType(stringType(), enumSchema),
  schemas: recordType(stringType(), stringType()),
  _meta: objectType({
    schemas: recordType(stringType(), stringType()),
    tables: recordType(stringType(), stringType()),
    columns: recordType(stringType(), stringType())
  }),
  internal: kitInternals2
}).strict();
var tableSquashed2 = objectType({
  name: stringType(),
  schema: stringType(),
  columns: recordType(stringType(), column2),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType()),
  compositePrimaryKeys: recordType(stringType(), stringType()),
  uniqueConstraints: recordType(stringType(), stringType())
}).strict();
var tableSquashedV42 = objectType({
  name: stringType(),
  schema: stringType(),
  columns: recordType(stringType(), column2),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType())
}).strict();
var pgSchemaSquashedV4 = objectType({
  version: literalType("4"),
  dialect: enumType(["pg"]),
  tables: recordType(stringType(), tableSquashedV42),
  enums: recordType(stringType(), enumSchema),
  schemas: recordType(stringType(), stringType())
}).strict();
var pgSchemaSquashed = objectType({
  version: literalType("5"),
  dialect: enumType(["pg"]),
  tables: recordType(stringType(), tableSquashed2),
  enums: recordType(stringType(), enumSchema),
  schemas: recordType(stringType(), stringType())
}).strict();
var pgSchemaV3 = pgSchemaInternalV3.merge(schemaHash2);
var pgSchemaV4 = pgSchemaInternalV4.merge(schemaHash2);
var pgSchema = pgSchemaInternal.merge(schemaHash2);
var backwardCompatiblePgSchema = unionType([
  pgSchemaV1,
  pgSchemaV2,
  pgSchemaV3,
  pgSchemaV4,
  pgSchema
]);
var PgSquasher = {
  squashIdx: (idx) => {
    index2.parse(idx);
    return `${idx.name};${idx.columns.join(",")};${idx.isUnique}`;
  },
  unsquashIdx: (input) => {
    const [name, columnsString, isUnique] = input.split(";");
    const result = index2.parse({
      name,
      columns: columnsString.split(","),
      isUnique: isUnique === "true"
    });
    return result;
  },
  squashFK: (fk4) => {
    return `${fk4.name};${fk4.tableFrom};${fk4.columnsFrom.join(",")};${fk4.tableTo};${fk4.columnsTo.join(",")};${fk4.onUpdate ?? ""};${fk4.onDelete ?? ""};${fk4.schemaTo ?? ""}`;
  },
  squashPK: (pk) => {
    return `${pk.columns.join(",")};${pk.name}`;
  },
  unsquashPK: (pk) => {
    const splitted = pk.split(";");
    return { name: splitted[1], columns: splitted[0].split(",") };
  },
  squashUnique: (unq) => {
    return `${unq.name};${unq.columns.join(",")};${unq.nullsNotDistinct}`;
  },
  unsquashUnique: (unq) => {
    const [name, columns, nullsNotDistinct] = unq.split(";");
    return {
      name,
      columns: columns.split(","),
      nullsNotDistinct: nullsNotDistinct === "true"
    };
  },
  unsquashFK: (input) => {
    const [
      name,
      tableFrom,
      columnsFromStr,
      tableTo,
      columnsToStr,
      onUpdate,
      onDelete,
      schemaTo
    ] = input.split(";");
    const result = fk2.parse({
      name,
      tableFrom,
      columnsFrom: columnsFromStr.split(","),
      schemaTo,
      tableTo,
      columnsTo: columnsToStr.split(","),
      onUpdate,
      onDelete
    });
    return result;
  }
};
var squashPgScheme = (json) => {
  const mappedTables = Object.fromEntries(
    Object.entries(json.tables).map((it) => {
      const squashedIndexes = mapValues(it[1].indexes, (index4) => {
        return PgSquasher.squashIdx(index4);
      });
      const squashedFKs = mapValues(it[1].foreignKeys, (fk4) => {
        return PgSquasher.squashFK(fk4);
      });
      const squashedPKs = mapValues(it[1].compositePrimaryKeys, (pk) => {
        return PgSquasher.squashPK(pk);
      });
      const squashedUniqueConstraints = mapValues(
        it[1].uniqueConstraints,
        (unq) => {
          return PgSquasher.squashUnique(unq);
        }
      );
      return [
        it[0],
        {
          name: it[1].name,
          schema: it[1].schema,
          columns: it[1].columns,
          indexes: squashedIndexes,
          foreignKeys: squashedFKs,
          compositePrimaryKeys: squashedPKs,
          uniqueConstraints: squashedUniqueConstraints
        }
      ];
    })
  );
  return {
    version: "5",
    dialect: json.dialect,
    tables: mappedTables,
    enums: json.enums,
    schemas: json.schemas
  };
};
var dryPg = pgSchema.parse({
  version: snapshotVersion,
  dialect: "pg",
  id: originUUID,
  prevId: "",
  tables: {},
  enums: {},
  schemas: {},
  _meta: {
    schemas: {},
    tables: {},
    columns: {}
  }
});

// src/serializer/sqliteSchema.ts
init_lib();
var index3 = objectType({
  name: stringType(),
  columns: stringType().array(),
  where: stringType().optional(),
  isUnique: booleanType()
}).strict();
var fk3 = objectType({
  name: stringType(),
  tableFrom: stringType(),
  columnsFrom: stringType().array(),
  tableTo: stringType(),
  columnsTo: stringType().array(),
  onUpdate: stringType().optional(),
  onDelete: stringType().optional()
}).strict();
var compositePK3 = objectType({
  columns: stringType().array(),
  name: stringType().optional()
}).strict();
var column3 = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType(),
  notNull: booleanType(),
  autoincrement: booleanType().optional(),
  default: anyType().optional()
}).strict();
var tableV33 = objectType({
  name: stringType(),
  columns: recordType(stringType(), column3),
  indexes: recordType(stringType(), index3),
  foreignKeys: recordType(stringType(), fk3)
}).strict();
var uniqueConstraint3 = objectType({
  name: stringType(),
  columns: stringType().array()
}).strict();
var table3 = objectType({
  name: stringType(),
  columns: recordType(stringType(), column3),
  indexes: recordType(stringType(), index3),
  foreignKeys: recordType(stringType(), fk3),
  compositePrimaryKeys: recordType(stringType(), compositePK3),
  uniqueConstraints: recordType(stringType(), uniqueConstraint3).default({})
}).strict();
var dialect2 = enumType(["sqlite"]);
var schemaHash3 = objectType({
  id: stringType(),
  prevId: stringType()
}).strict();
var schemaInternalV32 = objectType({
  version: literalType("3"),
  dialect: dialect2,
  tables: recordType(stringType(), tableV33),
  enums: objectType({})
}).strict();
var schemaInternalV42 = objectType({
  version: literalType("4"),
  dialect: dialect2,
  tables: recordType(stringType(), table3),
  enums: objectType({})
}).strict();
var latestVersion = literalType("5");
var schemaInternal2 = objectType({
  version: latestVersion,
  dialect: dialect2,
  tables: recordType(stringType(), table3),
  enums: objectType({}),
  _meta: objectType({
    tables: recordType(stringType(), stringType()),
    columns: recordType(stringType(), stringType())
  })
}).strict();
var schemaV32 = schemaInternalV32.merge(schemaHash3).strict();
var schemaV42 = schemaInternalV42.merge(schemaHash3).strict();
var schema2 = schemaInternal2.merge(schemaHash3).strict();
var tableSquashed3 = objectType({
  name: stringType(),
  columns: recordType(stringType(), column3),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType()),
  compositePrimaryKeys: recordType(stringType(), stringType()),
  uniqueConstraints: recordType(stringType(), stringType()).default({})
}).strict();
var schemaSquashed2 = objectType({
  version: latestVersion,
  dialect: dialect2,
  tables: recordType(stringType(), tableSquashed3),
  enums: anyType()
}).strict();
var SQLiteSquasher = {
  squashIdx: (idx) => {
    index3.parse(idx);
    return `${idx.name};${idx.columns.join(",")};${idx.isUnique};${idx.where ?? ""}`;
  },
  unsquashIdx: (input) => {
    const [name, columnsString, isUnique, where] = input.split(";");
    const result = index3.parse({
      name,
      columns: columnsString.split(","),
      isUnique: isUnique === "true",
      where: where ?? void 0
    });
    return result;
  },
  squashUnique: (unq) => {
    return `${unq.name};${unq.columns.join(",")}`;
  },
  unsquashUnique: (unq) => {
    const [name, columns] = unq.split(";");
    return { name, columns: columns.split(",") };
  },
  squashFK: (fk4) => {
    return `${fk4.name};${fk4.tableFrom};${fk4.columnsFrom.join(",")};${fk4.tableTo};${fk4.columnsTo.join(",")};${fk4.onUpdate ?? ""};${fk4.onDelete ?? ""}`;
  },
  unsquashFK: (input) => {
    const [
      name,
      tableFrom,
      columnsFromStr,
      tableTo,
      columnsToStr,
      onUpdate,
      onDelete
    ] = input.split(";");
    const result = fk3.parse({
      name,
      tableFrom,
      columnsFrom: columnsFromStr.split(","),
      tableTo,
      columnsTo: columnsToStr.split(","),
      onUpdate,
      onDelete
    });
    return result;
  },
  squashPK: (pk) => {
    return pk.columns.join(",");
  },
  unsquashPK: (pk) => {
    return pk.split(",");
  }
};
var drySQLite = schema2.parse({
  version: snapshotVersion,
  dialect: "sqlite",
  id: originUUID,
  prevId: "",
  tables: {},
  enums: {},
  _meta: {
    tables: {},
    columns: {}
  }
});
var backwardCompatibleSqliteSchema = unionType([schemaV32, schemaV42, schema2]);

// src/utils.ts
init_source();
import { join } from "path";

// src/jsonDiffer.js
import { diff } from "json-diff";
function diffForRenamedTables(pairs) {
  const renamed = pairs.map((it) => {
    const from = it.from;
    const to = it.to;
    const newFrom = { ...from, name: to.name };
    return [newFrom, to];
  });
  const altered = renamed.map((pair) => {
    return diffForRenamedTable(pair[0], pair[1]);
  });
  return altered;
}
function diffForRenamedTable(t1, t2) {
  t1.name = t2.name;
  const diffed = diff(t1, t2) || {};
  diffed.name = t2.name;
  return findAlternationsInTable(diffed, t2.schema);
}
function diffForRenamedColumn(t1, t2) {
  const renamed = { ...t1, name: t2.name };
  const diffed = diff(renamed, t2) || {};
  diffed.name = t2.name;
  return alternationsInColumn(diffed);
}
function applyJsonDiff(json1, json2) {
  json1 = JSON.parse(JSON.stringify(json1));
  json2 = JSON.parse(JSON.stringify(json2));
  const rawDiff = diff(json1, json2);
  const difference = rawDiff;
  const tableToSchema = Object.entries(json2.tables).reduce((res, it) => {
    res[it[0]] = it[1].schema;
    return res;
  }, {});
  if (!difference)
    return {};
  difference.tables = difference.tables ?? {};
  difference.enums = difference.enums ?? {};
  difference.schemas = difference.schemas ?? {};
  const tableEntries = Object.entries(difference.tables);
  const addedTables = tableEntries.filter((it) => it[0].includes("__added")).map((it) => it[1]);
  const deletedTables = tableEntries.filter((it) => it[0].includes("__deleted")).map((it) => it[1]);
  const enumsEntries = Object.entries(difference.enums);
  const addedEnums = enumsEntries.filter((it) => it[0].includes("__added")).map((it) => it[1]).map((it) => {
    const values = Object.entries(it.values).map((ve) => ve[1]);
    return { name: it.name, values };
  });
  const deletedEnums = enumsEntries.filter((it) => it[0].includes("__deleted")).map((it) => it[1]).map((it) => {
    const values = Object.entries(it.values).map((ve) => ve[1]);
    return { name: it.name, values };
  });
  const alteredEnums = enumsEntries.filter((it) => !(it[0].includes("__added") || it[0].includes("__deleted"))).map((it) => {
    const vals = it[1].values;
    const addedValues = Object.entries(vals).filter((val) => val[0].includes("__added")).map((val) => val[1]);
    const deletedValues = Object.entries(vals).filter((val) => val[0].includes("__deleted")).map((val) => val[1]);
    return { name: it[0], addedValues, deletedValues };
  });
  const alteredTables = Object.keys(difference.tables).filter((it) => !(it.includes("__added") || it.includes("__deleted"))).map((it) => {
    return { name: it, ...difference.tables[it] };
  });
  const schemasEntries = Object.entries(difference.schemas);
  const addedSchemas = schemasEntries.filter((it) => it[0].endsWith("__added")).map((it) => it[1]);
  const deletedSchemas = schemasEntries.filter((it) => it[0].endsWith("__deleted")).map((it) => it[1]);
  const alteredTablesWithColumns = alteredTables.map((table4) => findAlternationsInTable(table4, tableToSchema[table4.name]));
  return {
    addedTables,
    deletedTables,
    alteredTablesWithColumns,
    addedEnums,
    deletedEnums,
    alteredEnums,
    addedSchemas,
    deletedSchemas
  };
}
var findAlternationsInTable = (table4, tableSchema) => {
  const columns = table4.columns ?? {};
  let schema4 = {
    type: "none",
    value: tableSchema
  };
  if ("schema" in table4) {
    if (table4.schema.__new) {
      schema4 = { type: "changed", old: table4.schema.__old, new: table4.schema.__new };
    } else {
      schema4 = { type: "deleted", value: table4.schema.__old };
    }
  }
  if ("schema__added" in table4) {
    schema4 = { type: "added", value: table4.schema__added };
  }
  if ("schema__deleted" in table4) {
    schema4 = { type: "deleted", value: table4.schema__deleted };
  }
  const added = Object.keys(columns).filter((it) => it.includes("__added")).map((it) => {
    return { ...columns[it] };
  });
  const deleted = Object.keys(columns).filter((it) => it.includes("__deleted")).map((it) => {
    return { ...columns[it] };
  });
  const altered = Object.keys(columns).filter((it) => !(it.includes("__deleted") || it.includes("__added"))).map((it) => {
    return { name: it, ...columns[it] };
  });
  const deletedIndexes = Object.fromEntries(
    Object.entries(table4.indexes__deleted || {}).concat(Object.entries(table4.indexes || {}).filter((it) => it[0].includes("__deleted"))).map((entry) => [entry[0].replace("__deleted", ""), entry[1]])
  );
  const addedIndexes = Object.fromEntries(
    Object.entries(table4.indexes__added || {}).concat(Object.entries(table4.indexes || {}).filter((it) => it[0].includes("__added"))).map((entry) => [entry[0].replace("__added", ""), entry[1]])
  );
  const alteredIndexes = Object.fromEntries(Object.entries(table4.indexes || {}).filter((it) => {
    return !it[0].endsWith("__deleted") && !it[0].endsWith("__added");
  }));
  const deletedForeignKeys = Object.fromEntries(
    Object.entries(table4.foreignKeys__deleted || {}).concat(Object.entries(table4.foreignKeys || {}).filter((it) => it[0].includes("__deleted"))).map((entry) => [entry[0].replace("__deleted", ""), entry[1]])
  );
  const addedForeignKeys = Object.fromEntries(
    Object.entries(table4.foreignKeys__added || {}).concat(Object.entries(table4.foreignKeys || {}).filter((it) => it[0].includes("__added"))).map((entry) => [entry[0].replace("__added", ""), entry[1]])
  );
  const alteredForeignKeys = Object.fromEntries(Object.entries(table4.foreignKeys || {}).filter((it) => !it[0].endsWith("__added") && !it[0].endsWith("__deleted")).map((entry) => [entry[0], entry[1]]));
  const addedCompositePKs = Object.fromEntries(Object.entries(table4.compositePrimaryKeys || {}).filter((it) => {
    return it[0].endsWith("__added");
  }));
  const deletedCompositePKs = Object.fromEntries(Object.entries(table4.compositePrimaryKeys || {}).filter((it) => {
    return it[0].endsWith("__deleted");
  }));
  const alteredCompositePKs = Object.fromEntries(Object.entries(table4.compositePrimaryKeys || {}).filter((it) => {
    return !it[0].endsWith("__deleted") && !it[0].endsWith("__added");
  }));
  const addedUniqueConstraints = Object.fromEntries(Object.entries(table4.uniqueConstraints || {}).filter((it) => {
    return it[0].endsWith("__added");
  }));
  const deletedUniqueConstraints = Object.fromEntries(Object.entries(table4.uniqueConstraints || {}).filter((it) => {
    return it[0].endsWith("__deleted");
  }));
  const alteredUniqueConstraints = Object.fromEntries(Object.entries(table4.uniqueConstraints || {}).filter((it) => {
    return !it[0].endsWith("__deleted") && !it[0].endsWith("__added");
  }));
  const mappedAltered = altered.map((it) => alternationsInColumn(it));
  return {
    name: table4.name,
    schema: schema4,
    deleted,
    added,
    altered: mappedAltered,
    addedIndexes,
    deletedIndexes,
    alteredIndexes,
    addedForeignKeys,
    deletedForeignKeys,
    alteredForeignKeys,
    addedCompositePKs,
    deletedCompositePKs,
    alteredCompositePKs,
    addedUniqueConstraints,
    deletedUniqueConstraints,
    alteredUniqueConstraints
  };
};
var alternationsInColumn = (column4) => {
  const altered = [column4];
  const result = altered.map((it) => {
    if (typeof it.name !== "string" && "__old" in it.name) {
      return { ...it, name: { type: "changed", old: it.name.__old, new: it.name.__new } };
    }
    return it;
  }).map((it) => {
    if ("type" in it) {
      return { ...it, type: { type: "changed", old: it.type.__old, new: it.type.__new } };
    }
    return it;
  }).map((it) => {
    if ("default" in it) {
      return { ...it, default: { type: "changed", old: it.default.__old, new: it.default.__new } };
    }
    if ("default__added" in it) {
      const { default__added, ...others } = it;
      return { ...others, default: { type: "added", value: it.default__added } };
    }
    if ("default__deleted" in it) {
      const { default__deleted, ...others } = it;
      return { ...others, default: { type: "deleted", value: it.default__deleted } };
    }
    return it;
  }).map((it) => {
    if ("notNull" in it) {
      return { ...it, notNull: { type: "changed", old: it.notNull.__old, new: it.notNull.__new } };
    }
    if ("notNull__added" in it) {
      const { notNull__added, ...others } = it;
      return { ...others, notNull: { type: "added", value: it.notNull__added } };
    }
    if ("notNull__deleted" in it) {
      const { notNull__deleted, ...others } = it;
      return { ...others, notNull: { type: "deleted", value: it.notNull__deleted } };
    }
    return it;
  }).map((it) => {
    if ("primaryKey" in it) {
      return { ...it, primaryKey: { type: "changed", old: it.primaryKey.__old, new: it.primaryKey.__new } };
    }
    if ("primaryKey__added" in it) {
      const { notNull__added, ...others } = it;
      return { ...others, primaryKey: { type: "added", value: it.primaryKey__added } };
    }
    if ("primaryKey__deleted" in it) {
      const { notNull__deleted, ...others } = it;
      return { ...others, primaryKey: { type: "deleted", value: it.primaryKey__deleted } };
    }
    return it;
  }).map((it) => {
    if ("onUpdate" in it) {
      return { ...it, onUpdate: { type: "changed", old: it.onUpdate.__old, new: it.onUpdate.__new } };
    }
    if ("onUpdate__added" in it) {
      const { onUpdate__added, ...others } = it;
      return { ...others, onUpdate: { type: "added", value: it.onUpdate__added } };
    }
    if ("onUpdate__deleted" in it) {
      const { onUpdate__deleted, ...others } = it;
      return { ...others, onUpdate: { type: "deleted", value: it.onUpdate__deleted } };
    }
    return it;
  }).map((it) => {
    if ("autoincrement" in it) {
      return { ...it, autoincrement: { type: "changed", old: it.autoincrement.__old, new: it.autoincrement.__new } };
    }
    if ("autoincrement__added" in it) {
      const { autoincrement__added, ...others } = it;
      return { ...others, autoincrement: { type: "added", value: it.autoincrement__added } };
    }
    if ("autoincrement__deleted" in it) {
      const { autoincrement__deleted, ...others } = it;
      return { ...others, autoincrement: { type: "deleted", value: it.autoincrement__deleted } };
    }
    return it;
  });
  return result[0];
};

// src/migrationPreparator.ts
init_serializer();

// src/cli/commands/migrate.ts
var import_hanji2 = __toESM(require_hanji());
init_views();
init_source();
init_outputs();
var BREAKPOINT = "--> statement-breakpoint\n";

// src/sqlgenerator.ts
var pgNativeTypes = /* @__PURE__ */ new Set([
  "uuid",
  "smallint",
  "integer",
  "bigint",
  "boolean",
  "text",
  "varchar",
  "serial",
  "bigserial",
  "decimal",
  "numeric",
  "real",
  "json",
  "jsonb",
  "time",
  "time with time zone",
  "time without time zone",
  "time",
  "timestamp",
  "timestamp with time zone",
  "timestamp without time zone",
  "date",
  "interval",
  "bigint",
  "bigserial",
  "double precision",
  "interval year",
  "interval month",
  "interval day",
  "interval hour",
  "interval minute",
  "interval second",
  "interval year to month",
  "interval day to hour",
  "interval day to minute",
  "interval day to second",
  "interval hour to minute",
  "interval hour to second",
  "interval minute to second"
]);
var isPgNativeType = (it) => {
  if (pgNativeTypes.has(it))
    return true;
  const toCheck = it.replace(/ /g, "");
  return toCheck.startsWith("varchar(") || toCheck.startsWith("char(") || toCheck.startsWith("numeric(") || toCheck.startsWith("timestamp(") || toCheck.startsWith("intervalyear(") || toCheck.startsWith("intervalmonth(") || toCheck.startsWith("intervalday(") || toCheck.startsWith("intervalhour(") || toCheck.startsWith("intervalminute(") || toCheck.startsWith("intervalsecond(") || toCheck.startsWith("intervalyeartomonth(") || toCheck.startsWith("intervaldaytohour(") || toCheck.startsWith("intervaldaytominute(") || toCheck.startsWith("intervaldaytosecond(") || toCheck.startsWith("intervalhourtominute(") || toCheck.startsWith("intervalhourtosecond(") || toCheck.startsWith("intervalminutetosecond(") || /^(\w+)(\[\d*])+$/.test(it);
};
var Convertor = class {
};
var PgCreateTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_table" && dialect3 === "pg";
  }
  convert(st) {
    const { tableName, schema: schema4, columns, compositePKs, uniqueConstraints } = st;
    let statement = "";
    const name = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    statement += `CREATE TABLE IF NOT EXISTS ${name} (
`;
    for (let i = 0; i < columns.length; i++) {
      const column4 = columns[i];
      const primaryKeyStatement = column4.primaryKey ? " PRIMARY KEY" : "";
      const notNullStatement = column4.notNull ? " NOT NULL" : "";
      const defaultStatement = column4.default !== void 0 ? ` DEFAULT ${column4.default}` : "";
      const uniqueConstraint4 = column4.isUnique ? ` CONSTRAINT "${column4.uniqueName}" UNIQUE${column4.nullsNotDistinct ? " NULLS NOT DISTINCT" : ""}` : "";
      const type = isPgNativeType(column4.type) ? column4.type : `"${column4.type}"`;
      statement += `	"${column4.name}" ${type}${primaryKeyStatement}${defaultStatement}${notNullStatement}${uniqueConstraint4}`;
      statement += i === columns.length - 1 ? "" : ",\n";
    }
    if (typeof compositePKs !== "undefined" && compositePKs.length > 0) {
      statement += ",\n";
      const compositePK4 = PgSquasher.unsquashPK(compositePKs[0]);
      statement += `	CONSTRAINT "${st.compositePkName}" PRIMARY KEY("${compositePK4.columns.join(`","`)}")`;
    }
    if (typeof uniqueConstraints !== "undefined" && uniqueConstraints.length > 0) {
      for (const uniqueConstraint4 of uniqueConstraints) {
        statement += ",\n";
        const unsquashedUnique = PgSquasher.unsquashUnique(uniqueConstraint4);
        statement += `	CONSTRAINT "${unsquashedUnique.name}" UNIQUE${unsquashedUnique.nullsNotDistinct ? " NULLS NOT DISTINCT" : ""}("${unsquashedUnique.columns.join(`","`)}")`;
      }
    }
    statement += `
);`;
    statement += `
`;
    return statement;
  }
};
var MySqlCreateTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_table" && dialect3 === "mysql";
  }
  convert(st) {
    const { tableName, columns, schema: schema4, compositePKs, uniqueConstraints } = st;
    let statement = "";
    const tName = schema4 ? `\`${schema4}\`.\`${tableName}\`` : `\`${tableName}\``;
    statement += `CREATE TABLE ${tName} (
`;
    for (let i = 0; i < columns.length; i++) {
      const column4 = columns[i];
      const primaryKeyStatement = column4.primaryKey ? " PRIMARY KEY" : "";
      const notNullStatement = column4.notNull ? " NOT NULL" : "";
      const defaultStatement = column4.default !== void 0 ? ` DEFAULT ${column4.default}` : "";
      const onUpdateStatement = column4.onUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      const autoincrementStatement = column4.autoincrement ? " AUTO_INCREMENT" : "";
      statement += `	\`${column4.name}\` ${column4.type}${autoincrementStatement}${primaryKeyStatement}${notNullStatement}${defaultStatement}${onUpdateStatement}`;
      statement += i === columns.length - 1 ? "" : ",\n";
    }
    if (typeof compositePKs !== "undefined" && compositePKs.length > 0) {
      statement += ",\n";
      const compositePK4 = MySqlSquasher.unsquashPK(compositePKs[0]);
      statement += `	CONSTRAINT \`${st.compositePkName}\` PRIMARY KEY(\`${compositePK4.columns.join(`\`,\``)}\`)`;
    }
    if (typeof uniqueConstraints !== "undefined" && uniqueConstraints.length > 0) {
      for (const uniqueConstraint4 of uniqueConstraints) {
        statement += ",\n";
        const unsquashedUnique = MySqlSquasher.unsquashUnique(uniqueConstraint4);
        statement += `	CONSTRAINT \`${unsquashedUnique.name}\` UNIQUE(\`${unsquashedUnique.columns.join(`\`,\``)}\`)`;
      }
    }
    statement += `
);`;
    statement += `
`;
    return statement;
  }
};
var SQLiteCreateTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "sqlite_create_table" && dialect3 === "sqlite";
  }
  convert(st) {
    const {
      tableName,
      columns,
      referenceData,
      compositePKs,
      uniqueConstraints
    } = st;
    let statement = "";
    statement += `CREATE TABLE \`${tableName}\` (
`;
    for (let i = 0; i < columns.length; i++) {
      const column4 = columns[i];
      const primaryKeyStatement = column4.primaryKey ? " PRIMARY KEY" : "";
      const notNullStatement = column4.notNull ? " NOT NULL" : "";
      const defaultStatement = column4.default !== void 0 ? ` DEFAULT ${column4.default}` : "";
      const autoincrementStatement = column4.autoincrement ? " AUTOINCREMENT" : "";
      statement += "	";
      statement += `\`${column4.name}\` ${column4.type}${primaryKeyStatement}${autoincrementStatement}${defaultStatement}${notNullStatement}`;
      statement += i === columns.length - 1 ? "" : ",\n";
    }
    compositePKs.forEach((it) => {
      statement += ",\n	";
      statement += `PRIMARY KEY(${it.map((it2) => `\`${it2}\``).join(", ")})`;
    });
    for (let i = 0; i < referenceData.length; i++) {
      const referenceAsString = referenceData[i];
      const {
        name,
        tableFrom,
        tableTo,
        columnsFrom,
        columnsTo,
        onDelete,
        onUpdate
      } = SQLiteSquasher.unsquashFK(referenceAsString);
      const onDeleteStatement = onDelete ? ` ON DELETE ${onDelete}` : "";
      const onUpdateStatement = onUpdate ? ` ON UPDATE ${onUpdate}` : "";
      const fromColumnsString = columnsFrom.map((it) => `\`${it}\``).join(",");
      const toColumnsString = columnsTo.map((it) => `\`${it}\``).join(",");
      statement += ",";
      statement += "\n	";
      statement += `FOREIGN KEY (${fromColumnsString}) REFERENCES \`${tableTo}\`(${toColumnsString})${onUpdateStatement}${onDeleteStatement}`;
    }
    if (typeof uniqueConstraints !== "undefined" && uniqueConstraints.length > 0) {
      for (const uniqueConstraint4 of uniqueConstraints) {
        statement += ",\n";
        const unsquashedUnique = MySqlSquasher.unsquashUnique(uniqueConstraint4);
        statement += `	CONSTRAINT ${unsquashedUnique.name} UNIQUE(\`${unsquashedUnique.columns.join(`\`,\``)}\`)`;
      }
    }
    statement += `
`;
    statement += `);`;
    statement += `
`;
    return statement;
  }
};
var PgAlterTableAddUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_unique_constraint" && dialect3 === "pg";
  }
  convert(statement) {
    const unsquashed = PgSquasher.unsquashUnique(statement.data);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ADD CONSTRAINT "${unsquashed.name}" UNIQUE${unsquashed.nullsNotDistinct ? " NULLS NOT DISTINCT" : ""}("${unsquashed.columns.join('","')}");`;
  }
};
var PgAlterTableDropUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_unique_constraint" && dialect3 === "pg";
  }
  convert(statement) {
    const unsquashed = PgSquasher.unsquashUnique(statement.data);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} DROP CONSTRAINT "${unsquashed.name}";`;
  }
};
var MySQLAlterTableAddUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_unique_constraint" && dialect3 === "mysql";
  }
  convert(statement) {
    const unsquashed = MySqlSquasher.unsquashUnique(statement.data);
    const tableNameWithSchema = statement.schema ? `\`${statement.schema}\`.\`${statement.tableName}\`` : `\`${statement.tableName}\``;
    return `ALTER TABLE ${tableNameWithSchema} ADD CONSTRAINT \`${unsquashed.name}\` UNIQUE(\`${unsquashed.columns.join("`,`")}\`);`;
  }
};
var MySQLAlterTableDropUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_unique_constraint" && dialect3 === "mysql";
  }
  convert(statement) {
    const unsquashed = MySqlSquasher.unsquashUnique(statement.data);
    const tableNameWithSchema = statement.schema ? `\`${statement.schema}\`.\`${statement.tableName}\`` : `\`${statement.tableName}\``;
    return `ALTER TABLE ${tableNameWithSchema} DROP INDEX \`${unsquashed.name}\`;`;
  }
};
var SQLiteAlterTableAddUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_unique_constraint" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Adding unique constraint to an existing table" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/unique.php

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var SQLiteAlterTableDropUniqueConstraintConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_unique_constraint" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Dropping unique constraint from an existing table" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/unique.php

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var CreateTypeEnumConvertor = class extends Convertor {
  can(statement) {
    return statement.type === "create_type_enum";
  }
  convert(st) {
    const { name, values } = st;
    let valuesStatement = "(";
    valuesStatement += values.map((it) => `'${it}'`).join(", ");
    valuesStatement += ")";
    let statement = "DO $$ BEGIN";
    statement += "\n";
    statement += ` CREATE TYPE "${name}" AS ENUM${valuesStatement};`;
    statement += "\n";
    statement += "EXCEPTION";
    statement += "\n";
    statement += " WHEN duplicate_object THEN null;";
    statement += "\n";
    statement += "END $$;";
    statement += "\n";
    return statement;
  }
};
var AlterTypeAddValueConvertor = class extends Convertor {
  can(statement) {
    return statement.type === "alter_type_add_value";
  }
  convert(st) {
    const { name, value } = st;
    return `ALTER TYPE "${name}" ADD VALUE '${value}';`;
  }
};
var PgDropTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_table" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `DROP TABLE ${tableNameWithSchema};`;
  }
};
var MySQLDropTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_table" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName } = statement;
    return `DROP TABLE \`${tableName}\`;`;
  }
};
var SQLiteDropTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_table" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { tableName } = statement;
    return `DROP TABLE \`${tableName}\`;`;
  }
};
var PgRenameTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "rename_table" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableNameFrom, tableNameTo, toSchema, fromSchema } = statement;
    const from = fromSchema ? `"${fromSchema}"."${tableNameFrom}"` : `"${tableNameFrom}"`;
    const to = `"${tableNameTo}"`;
    return `ALTER TABLE ${from} RENAME TO ${to};`;
  }
};
var SqliteRenameTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "rename_table" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { tableNameFrom, tableNameTo } = statement;
    return `ALTER TABLE \`${tableNameFrom}\` RENAME TO \`${tableNameTo}\`;`;
  }
};
var MySqlRenameTableConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "rename_table" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableNameFrom, tableNameTo, fromSchema, toSchema } = statement;
    const from = fromSchema ? `\`${fromSchema}\`.\`${tableNameFrom}\`` : `\`${tableNameFrom}\``;
    const to = fromSchema ? `\`${fromSchema}\`.\`${tableNameTo}\`` : `\`${tableNameTo}\``;
    return `RENAME TABLE ${from} TO ${to};`;
  }
};
var PgAlterTableRenameColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_rename_column" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, oldColumnName, newColumnName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} RENAME COLUMN "${oldColumnName}" TO "${newColumnName}";`;
  }
};
var MySqlAlterTableRenameColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_rename_column" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, oldColumnName, newColumnName } = statement;
    return `ALTER TABLE \`${tableName}\` RENAME COLUMN \`${oldColumnName}\` TO \`${newColumnName}\`;`;
  }
};
var SQLiteAlterTableRenameColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_rename_column" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { tableName, oldColumnName, newColumnName } = statement;
    return `ALTER TABLE \`${tableName}\` RENAME COLUMN \`${oldColumnName}\` TO \`${newColumnName}\`;`;
  }
};
var PgAlterTableDropColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_drop_column" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} DROP COLUMN IF EXISTS "${columnName}";`;
  }
};
var MySqlAlterTableDropColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_drop_column" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    return `ALTER TABLE \`${tableName}\` DROP COLUMN \`${columnName}\`;`;
  }
};
var SQLiteAlterTableDropColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_drop_column" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    return `ALTER TABLE \`${tableName}\` DROP COLUMN \`${columnName}\`;`;
  }
};
var PgAlterTableAddColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_add_column" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, column: column4, schema: schema4 } = statement;
    const { name, type, notNull } = column4;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    const defaultStatement = `${column4.default !== void 0 ? ` DEFAULT ${column4.default}` : ""}`;
    const fixedType = isPgNativeType(column4.type) ? column4.type : `"${column4.type}"`;
    const notNullStatement = `${notNull ? " NOT NULL" : ""}`;
    return `ALTER TABLE ${tableNameWithSchema} ADD COLUMN "${name}" ${fixedType}${defaultStatement}${notNullStatement};`;
  }
};
var MySqlAlterTableAddColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_add_column" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, column: column4 } = statement;
    const { name, type, notNull, primaryKey, autoincrement, onUpdate } = column4;
    const defaultStatement = `${column4.default !== void 0 ? ` DEFAULT ${column4.default}` : ""}`;
    const notNullStatement = `${notNull ? " NOT NULL" : ""}`;
    const primaryKeyStatement = `${primaryKey ? " PRIMARY KEY" : ""}`;
    const autoincrementStatement = `${autoincrement ? " AUTO_INCREMENT" : ""}`;
    const onUpdateStatement = `${onUpdate ? " ON UPDATE CURRENT_TIMESTAMP" : ""}`;
    return `ALTER TABLE \`${tableName}\` ADD \`${name}\` ${type}${primaryKeyStatement}${autoincrementStatement}${defaultStatement}${notNullStatement}${onUpdateStatement};`;
  }
};
var SQLiteAlterTableAddColumnConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "sqlite_alter_table_add_column" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { tableName, column: column4, referenceData } = statement;
    const { name, type, notNull, primaryKey } = column4;
    const defaultStatement = `${column4.default !== void 0 ? ` DEFAULT ${column4.default}` : ""}`;
    const notNullStatement = `${notNull ? " NOT NULL" : ""}`;
    const primaryKeyStatement = `${primaryKey ? " PRIMARY KEY" : ""}`;
    const referenceAsObject = referenceData ? SQLiteSquasher.unsquashFK(referenceData) : void 0;
    const referenceStatement = `${referenceAsObject ? ` REFERENCES ${referenceAsObject.tableTo}(${referenceAsObject.columnsTo})` : ""}`;
    return `ALTER TABLE ${tableName} ADD \`${name}\` ${type}${primaryKeyStatement}${defaultStatement}${notNullStatement}${referenceStatement};`;
  }
};
var PgAlterTableAlterColumnSetTypeConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_type" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName, newDataType, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ALTER COLUMN "${columnName}" SET DATA TYPE ${newDataType};`;
  }
};
var SQLiteAlterTableAlterColumnSetTypeConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_type" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgAlterTableAlterColumnSetDefaultConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_default" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ALTER COLUMN "${columnName}" SET DEFAULT ${statement.newDefaultValue};`;
  }
};
var SqliteAlterTableAlterColumnSetDefaultConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_default" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgAlterTableAlterColumnDropDefaultConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_default" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ALTER COLUMN "${columnName}" DROP DEFAULT;`;
  }
};
var MySqlAlterTableAddPk = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_pk" && dialect3 === "mysql";
  }
  convert(statement) {
    return `ALTER TABLE \`${statement.tableName}\` ADD PRIMARY KEY (\`${statement.columnName}\`);`;
  }
};
var MySqlAlterTableDropPk = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_pk" && dialect3 === "mysql";
  }
  convert(statement) {
    return `ALTER TABLE \`${statement.tableName}\` DROP PRIMARY KEY`;
  }
};
var MySqlModifyColumn = class extends Convertor {
  can(statement, dialect3) {
    return (statement.type === "alter_table_alter_column_set_type" || statement.type === "alter_table_alter_column_set_notnull" || statement.type === "alter_table_alter_column_drop_notnull" || statement.type === "alter_table_alter_column_drop_on_update" || statement.type === "alter_table_alter_column_set_on_update" || statement.type === "alter_table_alter_column_set_autoincrement" || statement.type === "alter_table_alter_column_drop_autoincrement" || statement.type === "alter_table_alter_column_set_default" || statement.type === "alter_table_alter_column_drop_default") && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    let columnType = ``;
    let columnDefault = "";
    let columnNotNull = "";
    let columnOnUpdate = "";
    let columnAutoincrement = "";
    let primaryKey = statement.columnPk ? " PRIMARY KEY" : "";
    if (statement.type === "alter_table_alter_column_drop_notnull") {
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else if (statement.type === "alter_table_alter_column_set_notnull") {
      columnNotNull = ` NOT NULL`;
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else if (statement.type === "alter_table_alter_column_drop_on_update") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnOnUpdate = "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else if (statement.type === "alter_table_alter_column_set_on_update") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = ` ON UPDATE CURRENT_TIMESTAMP`;
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else if (statement.type === "alter_table_alter_column_set_autoincrement") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnAutoincrement = " AUTO_INCREMENT";
    } else if (statement.type === "alter_table_alter_column_drop_autoincrement") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnType = ` ${statement.newDataType}`;
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnAutoincrement = "";
    } else if (statement.type === "alter_table_alter_column_set_default") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnType = ` ${statement.newDataType}`;
      columnDefault = ` DEFAULT ${statement.newDefaultValue}`;
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else if (statement.type === "alter_table_alter_column_drop_default") {
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnType = ` ${statement.newDataType}`;
      columnDefault = "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    } else {
      columnType = ` ${statement.newDataType}`;
      columnNotNull = statement.columnNotNull ? ` NOT NULL` : "";
      columnOnUpdate = columnOnUpdate = statement.columnOnUpdate ? ` ON UPDATE CURRENT_TIMESTAMP` : "";
      columnDefault = statement.columnDefault ? ` DEFAULT ${statement.columnDefault}` : "";
      columnAutoincrement = statement.columnAutoIncrement ? " AUTO_INCREMENT" : "";
    }
    columnDefault = columnDefault instanceof Date ? columnDefault.toISOString() : columnDefault;
    return `ALTER TABLE \`${tableName}\` MODIFY COLUMN \`${columnName}\`${columnType}${columnAutoincrement}${columnNotNull}${columnDefault}${columnOnUpdate};`;
  }
};
var SqliteAlterTableAlterColumnDropDefaultConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_default" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Drop default from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgAlterTableCreateCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_composite_pk" && dialect3 === "pg";
  }
  convert(statement) {
    const { name, columns } = PgSquasher.unsquashPK(statement.data);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ADD CONSTRAINT "${statement.constraintName}" PRIMARY KEY("${columns.join('","')}");`;
  }
};
var PgAlterTableDeleteCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_composite_pk" && dialect3 === "pg";
  }
  convert(statement) {
    const { name, columns } = PgSquasher.unsquashPK(statement.data);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} DROP CONSTRAINT "${statement.constraintName}";`;
  }
};
var PgAlterTableAlterCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_composite_pk" && dialect3 === "pg";
  }
  convert(statement) {
    const { name, columns } = PgSquasher.unsquashPK(statement.old);
    const { name: newName, columns: newColumns } = PgSquasher.unsquashPK(
      statement.new
    );
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} DROP CONSTRAINT ${statement.oldConstraintName};
${BREAKPOINT}ALTER TABLE ${tableNameWithSchema} ADD CONSTRAINT ${statement.newConstraintName} PRIMARY KEY(${newColumns.join(",")});`;
  }
};
var MySqlAlterTableCreateCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_composite_pk" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name, columns } = MySqlSquasher.unsquashPK(statement.data);
    return `ALTER TABLE \`${statement.tableName}\` ADD PRIMARY KEY(\`${columns.join("`,`")}\`);`;
  }
};
var MySqlAlterTableDeleteCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_composite_pk" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name, columns } = MySqlSquasher.unsquashPK(statement.data);
    return `ALTER TABLE \`${statement.tableName}\` DROP PRIMARY KEY;`;
  }
};
var MySqlAlterTableAlterCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_composite_pk" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name, columns } = MySqlSquasher.unsquashPK(statement.old);
    const { name: newName, columns: newColumns } = MySqlSquasher.unsquashPK(
      statement.new
    );
    return `ALTER TABLE \`${statement.tableName}\` DROP PRIMARY KEY, ADD PRIMARY KEY(\`${newColumns.join("`,`")}\`);`;
  }
};
var SqliteAlterTableCreateCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_composite_pk" && dialect3 === "sqlite";
  }
  convert(statement) {
    let msg = "/*\n";
    msg += `You're trying to add PRIMARY KEY(${statement.data}) to '${statement.tableName}' table
`;
    msg += "SQLite does not support adding primary key to an already created table\n";
    msg += "You can do it in 3 steps with drizzle orm:\n";
    msg += " - create new mirror table with needed pk, rename current table to old_table, generate SQL\n";
    msg += " - migrate old data from one table to another\n";
    msg += " - delete old_table in schema, generate sql\n\n";
    msg += "or create manual migration like below:\n\n";
    msg += "ALTER TABLE table_name RENAME TO old_table;\n";
    msg += "CREATE TABLE table_name (\n";
    msg += "	column1 datatype [ NULL | NOT NULL ],\n";
    msg += "	column2 datatype [ NULL | NOT NULL ],\n";
    msg += "	...\n";
    msg += "	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)\n";
    msg += " );\n";
    msg += "INSERT INTO table_name SELECT * FROM old_table;\n\n";
    msg += "Due to that we don't generate migration automatically and it has to be done manually\n";
    msg += "*/\n";
    return msg;
  }
};
var SqliteAlterTableDeleteCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_composite_pk" && dialect3 === "sqlite";
  }
  convert(statement) {
    let msg = "/*\n";
    msg += `You're trying to delete PRIMARY KEY(${statement.data}) from '${statement.tableName}' table
`;
    msg += "SQLite does not supportprimary key deletion from existing table\n";
    msg += "You can do it in 3 steps with drizzle orm:\n";
    msg += " - create new mirror table table without pk, rename current table to old_table, generate SQL\n";
    msg += " - migrate old data from one table to another\n";
    msg += " - delete old_table in schema, generate sql\n\n";
    msg += "or create manual migration like below:\n\n";
    msg += "ALTER TABLE table_name RENAME TO old_table;\n";
    msg += "CREATE TABLE table_name (\n";
    msg += "	column1 datatype [ NULL | NOT NULL ],\n";
    msg += "	column2 datatype [ NULL | NOT NULL ],\n";
    msg += "	...\n";
    msg += "	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)\n";
    msg += " );\n";
    msg += "INSERT INTO table_name SELECT * FROM old_table;\n\n";
    msg += "Due to that we don't generate migration automatically and it has to be done manually\n";
    msg += "*/\n";
    return msg;
  }
};
var SqliteAlterTableAlterCompositePrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_composite_pk" && dialect3 === "sqlite";
  }
  convert(statement) {
    let msg = "/*\n";
    msg += "SQLite does not support altering primary key\n";
    msg += "You can do it in 3 steps with drizzle orm:\n";
    msg += " - create new mirror table with needed pk, rename current table to old_table, generate SQL\n";
    msg += " - migrate old data from one table to another\n";
    msg += " - delete old_table in schema, generate sql\n\n";
    msg += "or create manual migration like below:\n\n";
    msg += "ALTER TABLE table_name RENAME TO old_table;\n";
    msg += "CREATE TABLE table_name (\n";
    msg += "	column1 datatype [ NULL | NOT NULL ],\n";
    msg += "	column2 datatype [ NULL | NOT NULL ],\n";
    msg += "	...\n";
    msg += "	PRIMARY KEY (pk_col1, pk_col2, ... pk_col_n)\n";
    msg += " );\n";
    msg += "INSERT INTO table_name SELECT * FROM old_table;\n\n";
    msg += "Due to that we don't generate migration automatically and it has to be done manually\n";
    msg += "*/\n";
    return msg;
  }
};
var PgAlterTableAlterColumnSetPrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_pk" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ADD PRIMARY KEY ("${columnName}");`;
  }
};
var PgAlterTableAlterColumnDropPrimaryKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_pk" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName, schema: schema4 } = statement;
    return `/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = '${typeof schema4 === "undefined" || schema4 === "" ? "public" : schema4}'
                AND table_name = '${tableName}'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "${tableName}" DROP CONSTRAINT "<constraint_name>";`;
  }
};
var PgAlterTableAlterColumnSetNotNullConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_notnull" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ALTER COLUMN "${columnName}" SET NOT NULL;`;
  }
};
var SqliteAlterTableAlterColumnSetNotNullConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_notnull" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var SqliteAlterTableAlterColumnSetAutoincrementConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_set_autoincrement" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Set autoincrement to a column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var SqliteAlterTableAlterColumnDropAutoincrementConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_autoincrement" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Drop autoincrement from a column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgAlterTableAlterColumnDropNotNullConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_notnull" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, columnName } = statement;
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} ALTER COLUMN "${columnName}" DROP NOT NULL;`;
  }
};
var SqliteAlterTableAlterColumnDropNotNullConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_alter_column_drop_notnull" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgCreateForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_reference" && dialect3 === "pg";
  }
  convert(statement) {
    const {
      name,
      tableFrom,
      tableTo,
      columnsFrom,
      columnsTo,
      onDelete,
      onUpdate,
      schemaTo
    } = PgSquasher.unsquashFK(statement.data);
    const onDeleteStatement = onDelete ? ` ON DELETE ${onDelete}` : "";
    const onUpdateStatement = onUpdate ? ` ON UPDATE ${onUpdate}` : "";
    const fromColumnsString = columnsFrom.map((it) => `"${it}"`).join(",");
    const toColumnsString = columnsTo.map((it) => `"${it}"`).join(",");
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${tableFrom}"` : `"${tableFrom}"`;
    const tableToNameWithSchema = schemaTo ? `"${schemaTo}"."${tableTo}"` : `"${tableTo}"`;
    const alterStatement = `ALTER TABLE ${tableNameWithSchema} ADD CONSTRAINT "${name}" FOREIGN KEY (${fromColumnsString}) REFERENCES ${tableToNameWithSchema}(${toColumnsString})${onDeleteStatement}${onUpdateStatement}`;
    let sql = "DO $$ BEGIN\n";
    sql += " " + alterStatement + ";\n";
    sql += "EXCEPTION\n";
    sql += " WHEN duplicate_object THEN null;\n";
    sql += "END $$;\n";
    return sql;
  }
};
var SqliteCreateForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_reference" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var MySqlCreateForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_reference" && dialect3 === "mysql";
  }
  convert(statement) {
    const {
      name,
      tableFrom,
      tableTo,
      columnsFrom,
      columnsTo,
      onDelete,
      onUpdate
    } = MySqlSquasher.unsquashFK(statement.data);
    const onDeleteStatement = onDelete ? ` ON DELETE ${onDelete}` : "";
    const onUpdateStatement = onUpdate ? ` ON UPDATE ${onUpdate}` : "";
    const fromColumnsString = columnsFrom.map((it) => `\`${it}\``).join(",");
    const toColumnsString = columnsTo.map((it) => `\`${it}\``).join(",");
    return `ALTER TABLE \`${tableFrom}\` ADD CONSTRAINT \`${name}\` FOREIGN KEY (${fromColumnsString}) REFERENCES \`${tableTo}\`(${toColumnsString})${onDeleteStatement}${onUpdateStatement};`;
  }
};
var PgAlterForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_reference" && dialect3 === "pg";
  }
  convert(statement) {
    const newFk = PgSquasher.unsquashFK(statement.data);
    const oldFk = PgSquasher.unsquashFK(statement.oldFkey);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${oldFk.tableFrom}"` : `"${oldFk.tableFrom}"`;
    let sql = `ALTER TABLE ${tableNameWithSchema} DROP CONSTRAINT "${oldFk.name}";
`;
    const onDeleteStatement = newFk.onDelete ? ` ON DELETE ${newFk.onDelete}` : "";
    const onUpdateStatement = newFk.onUpdate ? ` ON UPDATE ${newFk.onUpdate}` : "";
    const fromColumnsString = newFk.columnsFrom.map((it) => `"${it}"`).join(",");
    const toColumnsString = newFk.columnsTo.map((it) => `"${it}"`).join(",");
    const tableFromNameWithSchema = oldFk.schemaTo ? `"${oldFk.schemaTo}"."${oldFk.tableFrom}"` : `"${oldFk.tableFrom}"`;
    const tableToNameWithSchema = newFk.schemaTo ? `"${newFk.schemaTo}"."${newFk.tableFrom}"` : `"${newFk.tableFrom}"`;
    const alterStatement = `ALTER TABLE ${tableFromNameWithSchema} ADD CONSTRAINT "${newFk.name}" FOREIGN KEY (${fromColumnsString}) REFERENCES ${tableToNameWithSchema}(${toColumnsString})${onDeleteStatement}${onUpdateStatement}`;
    sql += "DO $$ BEGIN\n";
    sql += " " + alterStatement + ";\n";
    sql += "EXCEPTION\n";
    sql += " WHEN duplicate_object THEN null;\n";
    sql += "END $$;\n";
    return sql;
  }
};
var SqliteAlterForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_reference" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Changing existing foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var PgDeleteForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_reference" && dialect3 === "pg";
  }
  convert(statement) {
    const tableFrom = statement.tableName;
    const { name } = PgSquasher.unsquashFK(statement.data);
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${tableFrom}"` : `"${tableFrom}"`;
    return `ALTER TABLE ${tableNameWithSchema} DROP CONSTRAINT "${name}";
`;
  }
};
var SqliteDeleteForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_reference" && dialect3 === "sqlite";
  }
  convert(statement) {
    return `/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/`;
  }
};
var MySqlDeleteForeignKeyConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "delete_reference" && dialect3 === "mysql";
  }
  convert(statement) {
    const tableFrom = statement.tableName;
    const { name } = MySqlSquasher.unsquashFK(statement.data);
    return `ALTER TABLE \`${tableFrom}\` DROP FOREIGN KEY \`${name}\`;
`;
  }
};
var CreatePgIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_index" && dialect3 === "pg";
  }
  convert(statement) {
    const { name, columns, isUnique } = PgSquasher.unsquashIdx(statement.data);
    const indexPart = isUnique ? "UNIQUE INDEX" : "INDEX";
    const value = columns.map((it) => `"${it}"`).join(",");
    const tableNameWithSchema = statement.schema ? `"${statement.schema}"."${statement.tableName}"` : `"${statement.tableName}"`;
    return `CREATE ${indexPart} IF NOT EXISTS "${name}" ON ${tableNameWithSchema} (${value});`;
  }
};
var CreateMySqlIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_index" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name, columns, isUnique } = MySqlSquasher.unsquashIdx(
      statement.data
    );
    const indexPart = isUnique ? "UNIQUE INDEX" : "INDEX";
    const value = columns.map((it) => `\`${it}\``).join(",");
    return `CREATE ${indexPart} \`${name}\` ON \`${statement.tableName}\` (${value});`;
  }
};
var CreateSqliteIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_index" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { name, columns, isUnique, where } = SQLiteSquasher.unsquashIdx(
      statement.data
    );
    const indexPart = isUnique ? "UNIQUE INDEX" : "INDEX";
    const whereStatement = where ? ` WHERE ${where}` : "";
    const value = columns.map((it) => `\`${it}\``).join(",");
    return `CREATE ${indexPart} \`${name}\` ON \`${statement.tableName}\` (${value})${whereStatement};`;
  }
};
var PgDropIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_index" && dialect3 === "pg";
  }
  convert(statement) {
    const { name } = PgSquasher.unsquashIdx(statement.data);
    return `DROP INDEX IF EXISTS "${name}";`;
  }
};
var PgCreateSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { name } = statement;
    return `CREATE SCHEMA "${name}";
`;
  }
};
var PgRenameSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "rename_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { from, to } = statement;
    return `ALTER SCHEMA "${from}" RENAME TO "${to}";
`;
  }
};
var PgDropSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { name } = statement;
    return `DROP SCHEMA "${name}";
`;
  }
};
var PgAlterTableSetSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_set_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, schema: schema4 } = statement;
    return `ALTER TABLE "${tableName}" SET SCHEMA "${schema4}";
`;
  }
};
var PgAlterTableSetNewSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_set_new_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, to, from } = statement;
    const tableNameWithSchema = from ? `"${from}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} SET SCHEMA "${to}";
`;
  }
};
var PgAlterTableRemoveFromSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_remove_from_schema" && dialect3 === "pg";
  }
  convert(statement) {
    const { tableName, schema: schema4 } = statement;
    const tableNameWithSchema = schema4 ? `"${schema4}"."${tableName}"` : `"${tableName}"`;
    return `ALTER TABLE ${tableNameWithSchema} SET SCHEMA public;
`;
  }
};
var SqliteDropIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_index" && dialect3 === "sqlite";
  }
  convert(statement) {
    const { name } = PgSquasher.unsquashIdx(statement.data);
    return `DROP INDEX IF EXISTS \`${name}\`;`;
  }
};
var MysqlCreateSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "create_schema" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name } = statement;
    return `CREATE DATABASE \`${name}\`;
`;
  }
};
var MysqlDropSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_schema" && dialect3 === "mysql";
  }
  convert(statement) {
    const { name } = statement;
    return `DROP DATABASE \`${name}\`;
`;
  }
};
var MysqlAlterTableSetSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_set_schema" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, schema: schema4 } = statement;
    const nameFrom = `\`${tableName}\``;
    const nameTo = `\`${schema4}\`.\`${tableName}\``;
    return `RENAME TABLE ${nameFrom} TO ${nameTo};
`;
  }
};
var MysqlAlterTableSetNewSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_set_new_schema" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, to, from } = statement;
    const nameFrom = from ? `\`${from}\`.\`${tableName}\`` : `\`${tableName}\``;
    const nameTo = to ? `\`${to}\`.\`${tableName}\`` : `\`${tableName}\``;
    return `RENAME TABLE ${nameFrom} TO ${nameTo};
`;
  }
};
var MysqlAlterTableRemoveFromSchemaConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "alter_table_remove_from_schema" && dialect3 === "mysql";
  }
  convert(statement) {
    const { tableName, schema: schema4 } = statement;
    const nameFrom = `\`${schema4}\`.\`${tableName}\``;
    const nameTo = `\`${tableName}\``;
    return `RENAME TABLE ${nameFrom} TO ${nameTo};
`;
  }
};
var MySqlDropIndexConvertor = class extends Convertor {
  can(statement, dialect3) {
    return statement.type === "drop_index" && dialect3 === "mysql";
  }
  convert(statement) {
    const tableName = typeof statement.schema === "undefined" ? `\`${statement.tableName}\`` : `\`${statement.schema}\`.\`${statement.tableName}\``;
    const { name } = MySqlSquasher.unsquashIdx(statement.data);
    return `DROP INDEX \`${name}\` ON ${tableName};`;
  }
};
var convertors = [];
convertors.push(new PgCreateTableConvertor());
convertors.push(new MySqlCreateTableConvertor());
convertors.push(new SQLiteCreateTableConvertor());
convertors.push(new CreateTypeEnumConvertor());
convertors.push(new PgDropTableConvertor());
convertors.push(new MySQLDropTableConvertor());
convertors.push(new SQLiteDropTableConvertor());
convertors.push(new PgRenameTableConvertor());
convertors.push(new MySqlRenameTableConvertor());
convertors.push(new SqliteRenameTableConvertor());
convertors.push(new PgAlterTableRenameColumnConvertor());
convertors.push(new MySqlAlterTableRenameColumnConvertor());
convertors.push(new SQLiteAlterTableRenameColumnConvertor());
convertors.push(new PgAlterTableDropColumnConvertor());
convertors.push(new MySqlAlterTableDropColumnConvertor());
convertors.push(new SQLiteAlterTableDropColumnConvertor());
convertors.push(new PgAlterTableAddColumnConvertor());
convertors.push(new MySqlAlterTableAddColumnConvertor());
convertors.push(new SQLiteAlterTableAddColumnConvertor());
convertors.push(new PgAlterTableAlterColumnSetTypeConvertor());
convertors.push(new PgAlterTableAddUniqueConstraintConvertor());
convertors.push(new PgAlterTableDropUniqueConstraintConvertor());
convertors.push(new MySQLAlterTableAddUniqueConstraintConvertor());
convertors.push(new MySQLAlterTableDropUniqueConstraintConvertor());
convertors.push(new CreatePgIndexConvertor());
convertors.push(new CreateMySqlIndexConvertor());
convertors.push(new CreateSqliteIndexConvertor());
convertors.push(new PgDropIndexConvertor());
convertors.push(new SqliteDropIndexConvertor());
convertors.push(new MySqlDropIndexConvertor());
convertors.push(new AlterTypeAddValueConvertor());
convertors.push(new PgAlterTableAlterColumnSetPrimaryKeyConvertor());
convertors.push(new PgAlterTableAlterColumnDropPrimaryKeyConvertor());
convertors.push(new PgAlterTableAlterColumnSetNotNullConvertor());
convertors.push(new PgAlterTableAlterColumnDropNotNullConvertor());
convertors.push(new PgAlterTableAlterColumnSetDefaultConvertor());
convertors.push(new PgAlterTableAlterColumnDropDefaultConvertor());
convertors.push(new MySqlModifyColumn());
convertors.push(new PgCreateForeignKeyConvertor());
convertors.push(new MySqlCreateForeignKeyConvertor());
convertors.push(new PgAlterForeignKeyConvertor());
convertors.push(new PgDeleteForeignKeyConvertor());
convertors.push(new MySqlDeleteForeignKeyConvertor());
convertors.push(new PgCreateSchemaConvertor());
convertors.push(new PgRenameSchemaConvertor());
convertors.push(new PgDropSchemaConvertor());
convertors.push(new PgAlterTableSetSchemaConvertor());
convertors.push(new PgAlterTableSetNewSchemaConvertor());
convertors.push(new PgAlterTableRemoveFromSchemaConvertor());
convertors.push(new MysqlCreateSchemaConvertor());
convertors.push(new MysqlDropSchemaConvertor());
convertors.push(new MysqlAlterTableSetSchemaConvertor());
convertors.push(new MysqlAlterTableSetNewSchemaConvertor());
convertors.push(new MysqlAlterTableRemoveFromSchemaConvertor());
convertors.push(new SQLiteAlterTableAlterColumnSetTypeConvertor());
convertors.push(new SqliteAlterForeignKeyConvertor());
convertors.push(new SqliteDeleteForeignKeyConvertor());
convertors.push(new SqliteCreateForeignKeyConvertor());
convertors.push(new SQLiteAlterTableAddUniqueConstraintConvertor());
convertors.push(new SQLiteAlterTableDropUniqueConstraintConvertor());
convertors.push(new SqliteAlterTableAlterColumnSetNotNullConvertor());
convertors.push(new SqliteAlterTableAlterColumnDropNotNullConvertor());
convertors.push(new SqliteAlterTableAlterColumnSetDefaultConvertor());
convertors.push(new SqliteAlterTableAlterColumnDropDefaultConvertor());
convertors.push(new SqliteAlterTableAlterColumnSetAutoincrementConvertor());
convertors.push(new SqliteAlterTableAlterColumnDropAutoincrementConvertor());
convertors.push(new SqliteAlterTableCreateCompositePrimaryKeyConvertor());
convertors.push(new SqliteAlterTableDeleteCompositePrimaryKeyConvertor());
convertors.push(new SqliteAlterTableAlterCompositePrimaryKeyConvertor());
convertors.push(new PgAlterTableCreateCompositePrimaryKeyConvertor());
convertors.push(new PgAlterTableDeleteCompositePrimaryKeyConvertor());
convertors.push(new PgAlterTableAlterCompositePrimaryKeyConvertor());
convertors.push(new MySqlAlterTableDeleteCompositePrimaryKeyConvertor());
convertors.push(new MySqlAlterTableDropPk());
convertors.push(new MySqlAlterTableCreateCompositePrimaryKeyConvertor());
convertors.push(new MySqlAlterTableAddPk());
convertors.push(new MySqlAlterTableAlterCompositePrimaryKeyConvertor());
var fromJson = (statements, dialect3) => {
  const result = statements.map((statement) => {
    const filtered = convertors.filter((it) => {
      return it.can(statement, dialect3);
    });
    const convertor = filtered.length === 1 ? filtered[0] : void 0;
    if (!convertor) {
      return "";
    }
    return convertor.convert(statement);
  }).filter((it) => it !== "");
  return result;
};
https:
  `
create table users (
	id int,
    name character varying(128)
);

create type venum as enum('one', 'two', 'three');
alter table users add column typed venum;

insert into users(id, name, typed) values (1, 'name1', 'one');
insert into users(id, name, typed) values (2, 'name2', 'two');
insert into users(id, name, typed) values (3, 'name3', 'three');

alter type venum rename to __venum;
create type venum as enum ('one', 'two', 'three', 'four', 'five');

ALTER TABLE users ALTER COLUMN typed TYPE venum USING typed::text::venum;

insert into users(id, name, typed) values (4, 'name4', 'four');
insert into users(id, name, typed) values (5, 'name5', 'five');

drop type __venum;
`;

// src/snapshotsDiffer.ts
init_lib();

// src/jsonStatements.ts
var preparePgCreateTableJson = (table4, json2) => {
  const { name, schema: schema4, columns, compositePrimaryKeys, uniqueConstraints } = table4;
  return {
    type: "create_table",
    tableName: name,
    schema: schema4,
    columns: Object.values(columns),
    compositePKs: Object.values(compositePrimaryKeys),
    compositePkName: Object.values(compositePrimaryKeys).length > 0 ? json2.tables[name].compositePrimaryKeys[`${PgSquasher.unsquashPK(
      Object.values(compositePrimaryKeys)[0]
    ).name}`].name : "",
    uniqueConstraints: Object.values(uniqueConstraints)
  };
};
var prepareMySqlCreateTableJson = (table4, json2) => {
  const { name, schema: schema4, columns, compositePrimaryKeys, uniqueConstraints } = table4;
  return {
    type: "create_table",
    tableName: name,
    schema: schema4,
    columns: Object.values(columns),
    compositePKs: Object.values(compositePrimaryKeys),
    compositePkName: Object.values(compositePrimaryKeys).length > 0 ? json2.tables[name].compositePrimaryKeys[MySqlSquasher.unsquashPK(Object.values(compositePrimaryKeys)[0]).name].name : "",
    uniqueConstraints: Object.values(uniqueConstraints)
  };
};
var prepareSQLiteCreateTable = (table4) => {
  const { name, columns, uniqueConstraints } = table4;
  const references2 = Object.values(table4.foreignKeys);
  const composites = Object.values(table4.compositePrimaryKeys).map(
    (it) => SQLiteSquasher.unsquashPK(it)
  );
  return {
    type: "sqlite_create_table",
    tableName: name,
    columns: Object.values(columns),
    referenceData: references2,
    compositePKs: composites,
    uniqueConstraints: Object.values(uniqueConstraints)
  };
};
var prepareDropTableJson = (table4) => {
  return {
    type: "drop_table",
    tableName: table4.name,
    schema: table4.schema
  };
};
var prepareRenameTableJson = (tableFrom, tableTo) => {
  return {
    type: "rename_table",
    fromSchema: tableFrom.schema,
    toSchema: tableTo.schema,
    tableNameFrom: tableFrom.name,
    tableNameTo: tableTo.name
  };
};
var prepareCreateEnumJson = (name, values) => {
  return {
    type: "create_type_enum",
    name,
    values
  };
};
var prepareAddValuesToEnumJson = (name, values) => {
  return values.map((it) => {
    return {
      type: "alter_type_add_value",
      name,
      value: it
    };
  });
};
var prepareCreateSchemasJson = (values) => {
  return values.map((it) => {
    return {
      type: "create_schema",
      name: it
    };
  });
};
var prepareRenameSchemasJson = (values) => {
  return values.map((it) => {
    return {
      type: "rename_schema",
      from: it.from,
      to: it.to
    };
  });
};
var prepareDeleteSchemasJson = (values) => {
  return values.map((it) => {
    return {
      type: "drop_schema",
      name: it
    };
  });
};
var prepareRenameColumns = (tableName, schema4, pairs) => {
  return pairs.map((it) => {
    return {
      type: "alter_table_rename_column",
      tableName,
      oldColumnName: it.from.name,
      newColumnName: it.to.name,
      schema: schema4
    };
  });
};
var prepareAlterTableColumnsJson = (tableName, schema4, deleted, added, altered, addedFk, json2, dialect3) => {
  const addColumns = [];
  const dropColumns = _prepareDropColumns(tableName, schema4, deleted);
  const alterColumns = _prepareAlterColumns(tableName, schema4, altered, json2);
  if (dialect3 === "sqlite") {
    let jsonCreateFKStatements = Object.values(addedFk);
    const sqliteAddColumns = _prepareSQLiteAddColumns(
      tableName,
      added,
      jsonCreateFKStatements
    );
    addColumns.push(...sqliteAddColumns);
  } else {
    addColumns.push(..._prepareAddColumns(tableName, schema4, added));
  }
  return { addColumns, dropColumns, alterColumns };
};
var _prepareDropColumns = (taleName, schema4, columns) => {
  return columns.map((it) => {
    return {
      type: "alter_table_drop_column",
      tableName: taleName,
      columnName: it.name,
      schema: schema4
    };
  });
};
var _prepareAddColumns = (tableName, schema4, columns) => {
  return columns.map((it) => {
    return {
      type: "alter_table_add_column",
      tableName,
      column: it,
      schema: schema4
    };
  });
};
var _prepareSQLiteAddColumns = (tableName, columns, referenceData) => {
  const unsquashed = referenceData.map(
    (addedFkValue) => SQLiteSquasher.unsquashFK(addedFkValue)
  );
  return columns.map((it) => {
    const columnsWithReference = unsquashed.find(
      (t) => t.columnsFrom.includes(it.name)
    );
    return {
      type: "sqlite_alter_table_add_column",
      tableName,
      column: it,
      referenceData: columnsWithReference ? SQLiteSquasher.squashFK(columnsWithReference) : void 0
    };
  });
};
var _prepareAlterColumns = (tableName, schema4, columns, json2) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  let statements = [];
  let dropPkStatements = [];
  let setPkStatements = [];
  for (const column4 of columns) {
    const columnName = typeof column4.name !== "string" ? column4.name.new : column4.name;
    const columnType = json2.tables[tableName].columns[columnName].type;
    const columnDefault = json2.tables[tableName].columns[columnName].default;
    const columnOnUpdate = json2.tables[tableName].columns[columnName].onUpdate;
    const columnNotNull = json2.tables[tableName].columns[columnName].notNull;
    const columnAutoIncrement = json2.tables[tableName].columns[columnName].autoincrement;
    const columnPk = json2.tables[tableName].columns[columnName].primaryKey;
    if (((_a = column4.autoincrement) == null ? void 0 : _a.type) === "added") {
      statements.push({
        type: "alter_table_alter_column_set_autoincrement",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_b = column4.autoincrement) == null ? void 0 : _b.type) === "changed") {
      const type = column4.autoincrement.new ? "alter_table_alter_column_set_autoincrement" : "alter_table_alter_column_drop_autoincrement";
      statements.push({
        type,
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_c = column4.autoincrement) == null ? void 0 : _c.type) === "deleted") {
      statements.push({
        type: "alter_table_alter_column_drop_autoincrement",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
  }
  for (const column4 of columns) {
    const columnName = typeof column4.name !== "string" ? column4.name.new : column4.name;
    const columnType = json2.tables[tableName].columns[columnName].type;
    const columnDefault = json2.tables[tableName].columns[columnName].default;
    const columnOnUpdate = json2.tables[tableName].columns[columnName].onUpdate;
    const columnNotNull = json2.tables[tableName].columns[columnName].notNull;
    const columnAutoIncrement = json2.tables[tableName].columns[columnName].autoincrement;
    const columnPk = json2.tables[tableName].columns[columnName].primaryKey;
    const compositePk = json2.tables[tableName].compositePrimaryKeys[`${tableName}_${columnName}`];
    if (typeof column4.name !== "string") {
      statements.push({
        type: "alter_table_rename_column",
        tableName,
        oldColumnName: column4.name.old,
        newColumnName: column4.name.new,
        schema: schema4
      });
    }
    if (((_d = column4.type) == null ? void 0 : _d.type) === "changed") {
      statements.push({
        type: "alter_table_alter_column_set_type",
        tableName,
        columnName,
        newDataType: column4.type.new,
        oldDataType: column4.type.old,
        schema: schema4,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_e = column4.primaryKey) == null ? void 0 : _e.type) === "deleted" || ((_f = column4.primaryKey) == null ? void 0 : _f.type) === "changed" && !column4.primaryKey.new && typeof compositePk === "undefined") {
      dropPkStatements.push({
        ////
        type: "alter_table_alter_column_drop_pk",
        tableName,
        columnName,
        schema: schema4
      });
    }
    if (((_g = column4.default) == null ? void 0 : _g.type) === "added") {
      statements.push({
        type: "alter_table_alter_column_set_default",
        tableName,
        columnName,
        newDefaultValue: column4.default.value,
        schema: schema4,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        newDataType: columnType,
        columnPk
      });
    }
    if (((_h = column4.default) == null ? void 0 : _h.type) === "changed") {
      statements.push({
        type: "alter_table_alter_column_set_default",
        tableName,
        columnName,
        newDefaultValue: column4.default.new,
        oldDefaultValue: column4.default.old,
        schema: schema4,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        newDataType: columnType,
        columnPk
      });
    }
    if (((_i = column4.default) == null ? void 0 : _i.type) === "deleted") {
      statements.push({
        type: "alter_table_alter_column_drop_default",
        tableName,
        columnName,
        schema: schema4,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        newDataType: columnType,
        columnPk
      });
    }
    if (((_j = column4.notNull) == null ? void 0 : _j.type) === "added") {
      statements.push({
        type: "alter_table_alter_column_set_notnull",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_k = column4.notNull) == null ? void 0 : _k.type) === "changed") {
      const type = column4.notNull.new ? "alter_table_alter_column_set_notnull" : "alter_table_alter_column_drop_notnull";
      statements.push({
        type,
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_l = column4.notNull) == null ? void 0 : _l.type) === "deleted") {
      statements.push({
        type: "alter_table_alter_column_drop_notnull",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_m = column4.primaryKey) == null ? void 0 : _m.type) === "added" || ((_n = column4.primaryKey) == null ? void 0 : _n.type) === "changed" && column4.primaryKey.new) {
      const wasAutoincrement = statements.filter(
        (it) => it.type === "alter_table_alter_column_set_autoincrement"
      );
      if (wasAutoincrement.length === 0) {
        setPkStatements.push({
          type: "alter_table_alter_column_set_pk",
          tableName,
          schema: schema4,
          columnName
        });
      }
    }
    if (((_o = column4.onUpdate) == null ? void 0 : _o.type) === "added") {
      statements.push({
        type: "alter_table_alter_column_set_on_update",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
    if (((_p = column4.onUpdate) == null ? void 0 : _p.type) === "deleted") {
      statements.push({
        type: "alter_table_alter_column_drop_on_update",
        tableName,
        columnName,
        schema: schema4,
        newDataType: columnType,
        columnDefault,
        columnOnUpdate,
        columnNotNull,
        columnAutoIncrement,
        columnPk
      });
    }
  }
  return [...dropPkStatements, ...setPkStatements, ...statements];
};
var prepareCreateIndexesJson = (tableName, schema4, indexes) => {
  return Object.values(indexes).map((indexData) => {
    return {
      type: "create_index",
      tableName,
      data: indexData,
      schema: schema4
    };
  });
};
var prepareCreateReferencesJson = (tableName, schema4, foreignKeys) => {
  return Object.values(foreignKeys).map((fkData) => {
    return {
      type: "create_reference",
      tableName,
      data: fkData,
      schema: schema4
    };
  });
};
var prepareDropReferencesJson = (tableName, schema4, foreignKeys) => {
  return Object.values(foreignKeys).map((fkData) => {
    return {
      type: "delete_reference",
      tableName,
      data: fkData,
      schema: schema4
    };
  });
};
var prepareAlterReferencesJson = (tableName, schema4, foreignKeys) => {
  const keys = Object.keys(foreignKeys);
  const stmts = [];
  if (keys.length > 0) {
    stmts.push(
      ...prepareDropReferencesJson(tableName, schema4, {
        [keys[0]]: foreignKeys[keys[0]].__old
      })
    );
    stmts.push(
      ...prepareCreateReferencesJson(tableName, schema4, {
        [keys[0]]: foreignKeys[keys[0]].__new
      })
    );
  }
  return stmts;
};
var prepareDropIndexesJson = (tableName, schema4, indexes) => {
  return Object.values(indexes).map((indexData) => {
    return {
      type: "drop_index",
      tableName,
      data: indexData,
      schema: schema4
    };
  });
};
var prepareAddCompositePrimaryKeySqlite = (tableName, pks) => {
  return Object.values(pks).map((it) => {
    return {
      type: "create_composite_pk",
      tableName,
      data: it
    };
  });
};
var prepareDeleteCompositePrimaryKeySqlite = (tableName, pks) => {
  return Object.values(pks).map((it) => {
    return {
      type: "delete_composite_pk",
      tableName,
      data: it
    };
  });
};
var prepareAlterCompositePrimaryKeySqlite = (tableName, pks) => {
  return Object.values(pks).map((it) => {
    return {
      type: "alter_composite_pk",
      tableName,
      old: it.__old,
      new: it.__new
    };
  });
};
var prepareAddCompositePrimaryKeyPg = (tableName, schema4, pks, json2) => {
  return Object.values(pks).map((it) => {
    const unsquashed = PgSquasher.unsquashPK(it);
    return {
      type: "create_composite_pk",
      tableName,
      data: it,
      schema: schema4,
      constraintName: json2.tables[tableName].compositePrimaryKeys[unsquashed.name].name
    };
  });
};
var prepareDeleteCompositePrimaryKeyPg = (tableName, schema4, pks, json1) => {
  return Object.values(pks).map((it) => {
    return {
      type: "delete_composite_pk",
      tableName,
      data: it,
      schema: schema4,
      constraintName: json1.tables[tableName].compositePrimaryKeys[PgSquasher.unsquashPK(it).name].name
    };
  });
};
var prepareAlterCompositePrimaryKeyPg = (tableName, schema4, pks, json1, json2) => {
  return Object.values(pks).map((it) => {
    return {
      type: "alter_composite_pk",
      tableName,
      old: it.__old,
      new: it.__new,
      schema: schema4,
      oldConstraintName: json1.tables[tableName].compositePrimaryKeys[PgSquasher.unsquashPK(it.__old).name].name,
      newConstraintName: json2.tables[tableName].compositePrimaryKeys[PgSquasher.unsquashPK(it.__new).name].name
    };
  });
};
var prepareAddUniqueConstraintPg = (tableName, schema4, unqs) => {
  return Object.values(unqs).map((it) => {
    return {
      type: "create_unique_constraint",
      tableName,
      data: it,
      schema: schema4
    };
  });
};
var prepareDeleteUniqueConstraintPg = (tableName, schema4, unqs) => {
  return Object.values(unqs).map((it) => {
    return {
      type: "delete_unique_constraint",
      tableName,
      data: it,
      schema: schema4
    };
  });
};
var prepareAddCompositePrimaryKeyMySql = (tableName, pks, json1, json2) => {
  var _a, _b;
  const res = [];
  for (const it of Object.values(pks)) {
    const unsquashed = MySqlSquasher.unsquashPK(it);
    if (unsquashed.columns.length === 1 && ((_b = (_a = json1.tables[tableName]) == null ? void 0 : _a.columns[unsquashed.columns[0]]) == null ? void 0 : _b.primaryKey)) {
      continue;
    }
    res.push({
      type: "create_composite_pk",
      tableName,
      data: it,
      constraintName: json2.tables[tableName].compositePrimaryKeys[unsquashed.name].name
    });
  }
  return res;
};
var prepareDeleteCompositePrimaryKeyMySql = (tableName, pks, json1) => {
  return Object.values(pks).map((it) => {
    return {
      type: "delete_composite_pk",
      tableName,
      data: it,
      constraintName: json1.tables[tableName].compositePrimaryKeys[MySqlSquasher.unsquashPK(it).name].name
    };
  });
};
var prepareAlterCompositePrimaryKeyMySql = (tableName, pks, json1, json2) => {
  return Object.values(pks).map((it) => {
    return {
      type: "alter_composite_pk",
      tableName,
      old: it.__old,
      new: it.__new,
      oldConstraintName: json1.tables[tableName].compositePrimaryKeys[MySqlSquasher.unsquashPK(it.__old).name].name,
      newConstraintName: json2.tables[tableName].compositePrimaryKeys[MySqlSquasher.unsquashPK(it.__new).name].name
    };
  });
};

// src/snapshotsDiffer.ts
var makeChanged = (schema4) => {
  return objectType({
    type: enumType(["changed"]),
    old: schema4,
    new: schema4
  });
};
var makeSelfOrChanged = (schema4) => {
  return unionType([
    schema4,
    objectType({
      type: enumType(["changed"]),
      old: schema4,
      new: schema4
    })
  ]);
};
var makePatched = (schema4) => {
  return unionType([
    objectType({
      type: literalType("added"),
      value: schema4
    }),
    objectType({
      type: literalType("deleted"),
      value: schema4
    }),
    objectType({
      type: literalType("changed"),
      old: schema4,
      new: schema4
    })
  ]);
};
var makeSelfOrPatched = (schema4) => {
  return unionType([
    objectType({
      type: literalType("none"),
      value: schema4.optional()
    }),
    objectType({
      type: literalType("added"),
      value: schema4
    }),
    objectType({
      type: literalType("deleted"),
      value: schema4
    }),
    objectType({
      type: literalType("changed"),
      old: schema4,
      new: schema4
    })
  ]);
};
var valueFromSelfOrPatchedNew = (it) => {
  switch (it.type) {
    case "none":
      return it.value;
    case "added":
      return it.value;
    case "deleted":
      return it.value;
    case "changed":
      return it.new;
  }
};
var columnSchema = objectType({
  name: stringType(),
  type: stringType(),
  primaryKey: booleanType().optional(),
  default: anyType().optional(),
  notNull: booleanType().optional(),
  // should it be optional? should if be here?
  autoincrement: booleanType().optional(),
  onUpdate: booleanType().optional(),
  isUnique: anyType().optional(),
  uniqueName: stringType().optional(),
  nullsNotDistinct: booleanType().optional()
}).strict();
var alteredColumnSchema = objectType({
  name: makeSelfOrChanged(stringType()),
  type: makeChanged(stringType()).optional(),
  default: makePatched(anyType()).optional(),
  primaryKey: makePatched(booleanType()).optional(),
  notNull: makePatched(booleanType()).optional(),
  onUpdate: makePatched(booleanType()).optional(),
  autoincrement: makePatched(booleanType()).optional()
}).strict();
var enumSchema2 = objectType({
  name: stringType(),
  values: arrayType(stringType())
}).strict();
var changedEnumSchema = objectType({
  name: stringType(),
  addedValues: arrayType(stringType()),
  deletedValues: arrayType(stringType())
}).strict();
var tableScheme = objectType({
  name: stringType(),
  schema: stringType().default(""),
  columns: recordType(stringType(), columnSchema),
  indexes: recordType(stringType(), stringType()),
  foreignKeys: recordType(stringType(), stringType()),
  compositePrimaryKeys: recordType(stringType(), stringType()).default({}),
  uniqueConstraints: recordType(stringType(), stringType()).default({})
}).strict();
var alteredTableScheme = objectType({
  name: stringType(),
  schema: makeSelfOrPatched(stringType()),
  deleted: columnSchema.array(),
  added: columnSchema.array(),
  altered: alteredColumnSchema.array(),
  addedIndexes: recordType(stringType(), stringType()),
  deletedIndexes: recordType(stringType(), stringType()),
  alteredIndexes: recordType(
    stringType(),
    objectType({
      __new: stringType(),
      __old: stringType()
    }).strict()
  ),
  addedForeignKeys: recordType(stringType(), stringType()),
  deletedForeignKeys: recordType(stringType(), stringType()),
  alteredForeignKeys: recordType(
    stringType(),
    objectType({
      __new: stringType(),
      __old: stringType()
    }).strict()
  ),
  addedCompositePKs: recordType(stringType(), stringType()),
  deletedCompositePKs: recordType(stringType(), stringType()),
  alteredCompositePKs: recordType(
    stringType(),
    objectType({
      __new: stringType(),
      __old: stringType()
    })
  ),
  addedUniqueConstraints: recordType(stringType(), stringType()),
  deletedUniqueConstraints: recordType(stringType(), stringType()),
  alteredUniqueConstraints: recordType(
    stringType(),
    objectType({
      __new: stringType(),
      __old: stringType()
    })
  )
}).strict();
var diffResultScheme = objectType({
  addedTables: tableScheme.array(),
  deletedTables: tableScheme.array(),
  alteredTablesWithColumns: alteredTableScheme.array(),
  addedEnums: enumSchema2.array(),
  deletedEnums: enumSchema2.array(),
  alteredEnums: changedEnumSchema.array(),
  addedSchemas: stringType().array(),
  deletedSchemas: stringType().array()
}).strict();
var applySnapshotsDiff = async (json1, json2, dialect3, schemasResolver, tablesResolver, columnsResolver, prevFull, curFull) => {
  var _a, _b;
  let diffResult;
  if (dialect3 === "mysql") {
    for (const tableName in json1.tables) {
      const table4 = json1.tables[tableName];
      for (const indexName in table4.indexes) {
        const index4 = MySqlSquasher.unsquashIdx(table4.indexes[indexName]);
        if (index4.isUnique) {
          table4.uniqueConstraints[indexName] = MySqlSquasher.squashUnique({
            name: index4.name,
            columns: index4.columns
          });
          delete json1.tables[tableName].indexes[index4.name];
        }
      }
    }
    for (const tableName in json2.tables) {
      const table4 = json2.tables[tableName];
      for (const indexName in table4.indexes) {
        const index4 = MySqlSquasher.unsquashIdx(table4.indexes[indexName]);
        if (index4.isUnique) {
          table4.uniqueConstraints[indexName] = MySqlSquasher.squashUnique({
            name: index4.name,
            columns: index4.columns
          });
          delete json2.tables[tableName].indexes[index4.name];
        }
      }
    }
    diffResult = applyJsonDiff(json1, json2);
  }
  diffResult = applyJsonDiff(json1, json2);
  if (Object.keys(diffResult).length === 0) {
    return { statements: [], sqlStatements: [], _meta: void 0 };
  }
  const typedResult = diffResultScheme.parse(diffResult);
  const {
    created: createdSchemas,
    deleted: deletedSchemas,
    renamed: renamedSchemas
  } = await schemasResolver({
    created: typedResult.addedSchemas.map((it) => ({ name: it })),
    deleted: typedResult.deletedSchemas.map((it) => ({ name: it }))
  });
  const { created, deleted, renamed } = await tablesResolver({
    created: typedResult.addedTables,
    deleted: typedResult.deletedTables
  });
  const rSchemas = renamedSchemas.map((it) => ({
    from: it.from.name,
    to: it.to.name
  }));
  const rTables = renamed.map((it) => {
    return { from: it.from, to: it.to };
  });
  const jsonStatements = [];
  const jsonSQLiteCreateTables = created.map((it) => {
    return prepareSQLiteCreateTable(it);
  });
  const jsonCreateIndexesForCreatedTables = created.map((it) => {
    return prepareCreateIndexesJson(it.name, it.schema, it.indexes);
  }).flat();
  const jsonDropTables = deleted.map((it) => {
    return prepareDropTableJson(it);
  });
  const jsonRenameTables = renamed.map((it) => {
    return prepareRenameTableJson(it.from, it.to);
  });
  const renamedWithAlternations = Object.values(
    alteredTableScheme.array().parse(diffForRenamedTables(renamed))
  ).map((it) => it);
  const allAltered = typedResult.alteredTablesWithColumns.concat(
    renamedWithAlternations
  );
  const jsonRenameColumnsStatements = [];
  const allAlteredResolved = [];
  for (const table4 of allAltered) {
    const schemaUnwrapped = valueFromSelfOrPatchedNew(table4.schema);
    const result = await columnsResolver({
      tableName: table4.name,
      schema: schemaUnwrapped,
      created: table4.added,
      deleted: table4.deleted
    });
    const schema4 = valueFromSelfOrPatchedNew(table4.schema);
    jsonRenameColumnsStatements.push(
      ...prepareRenameColumns(table4.name, schema4, result.renamed)
    );
    const renamedColumnsAltered = result.renamed.map(
      (it) => alteredColumnSchema.parse(diffForRenamedColumn(it.from, it.to))
    );
    const allAltered2 = table4.altered.concat(renamedColumnsAltered);
    const resolved = {
      name: table4.name,
      schema: table4.schema,
      deleted: result.deleted,
      added: result.created,
      altered: allAltered2,
      addedIndexes: table4.addedIndexes,
      deletedIndexes: table4.deletedIndexes,
      alteredIndexes: table4.alteredIndexes,
      addedForeignKeys: table4.addedForeignKeys,
      deletedForeignKeys: table4.deletedForeignKeys,
      alteredForeignKeys: table4.alteredForeignKeys,
      addedCompositePKs: table4.addedCompositePKs,
      deletedCompositePKs: table4.deletedCompositePKs,
      alteredCompositePKs: table4.alteredCompositePKs,
      addedUniqueConstraints: table4.addedUniqueConstraints,
      deletedUniqueConstraints: table4.deletedUniqueConstraints,
      alteredUniqueConstraints: table4.alteredUniqueConstraints
    };
    allAlteredResolved.push(resolved);
  }
  const jsonAddedCompositePKs = [];
  const jsonDeletedCompositePKs = [];
  const jsonAlteredCompositePKs = [];
  const jsonAddedUniqueConstraints = [];
  const jsonDeletedUniqueConstraints = [];
  const jsonAlteredUniqueConstraints = [];
  const jsonSetTableSchemas = [];
  const jsonRemoveTableFromSchemas = [];
  const jsonSetNewTableSchemas = [];
  allAlteredResolved.forEach((it) => {
    const schemaUnwrapped = valueFromSelfOrPatchedNew(it.schema);
    let addedColumns = [];
    for (const addedPkName of Object.keys(it.addedCompositePKs)) {
      const addedPkColumns = it.addedCompositePKs[addedPkName];
      if (dialect3 === "sqlite") {
        addedColumns = SQLiteSquasher.unsquashPK(addedPkColumns);
      } else if (dialect3 === "mysql") {
        addedColumns = MySqlSquasher.unsquashPK(addedPkColumns).columns;
      } else {
        addedColumns = SQLiteSquasher.unsquashPK(addedPkColumns);
      }
    }
    let deletedColumns = [];
    for (const deletedPkName of Object.keys(it.deletedCompositePKs)) {
      const deletedPkColumns = it.deletedCompositePKs[deletedPkName];
      if (dialect3 === "sqlite") {
        deletedColumns = SQLiteSquasher.unsquashPK(deletedPkColumns);
      } else if (dialect3 === "mysql") {
        deletedColumns = MySqlSquasher.unsquashPK(deletedPkColumns).columns;
      } else {
        deletedColumns = SQLiteSquasher.unsquashPK(deletedPkColumns);
      }
    }
    const doPerformDeleteAndCreate = JSON.stringify(addedColumns) !== JSON.stringify(deletedColumns);
    let addedCompositePKs = [];
    let deletedCompositePKs = [];
    let alteredCompositePKs = [];
    if (dialect3 === "sqlite") {
      if (doPerformDeleteAndCreate) {
        addedCompositePKs = prepareAddCompositePrimaryKeySqlite(
          it.name,
          it.addedCompositePKs
        );
        deletedCompositePKs = prepareDeleteCompositePrimaryKeySqlite(
          it.name,
          it.deletedCompositePKs
        );
      }
      alteredCompositePKs = prepareAlterCompositePrimaryKeySqlite(
        it.name,
        it.alteredCompositePKs
      );
    } else if (dialect3 === "pg") {
      if (doPerformDeleteAndCreate) {
        addedCompositePKs = prepareAddCompositePrimaryKeyPg(
          it.name,
          schemaUnwrapped,
          it.addedCompositePKs,
          curFull
        );
        deletedCompositePKs = prepareDeleteCompositePrimaryKeyPg(
          it.name,
          schemaUnwrapped,
          it.deletedCompositePKs,
          prevFull
        );
      }
      alteredCompositePKs = prepareAlterCompositePrimaryKeyPg(
        it.name,
        schemaUnwrapped,
        it.alteredCompositePKs,
        prevFull,
        curFull
      );
    } else {
      addedCompositePKs = prepareAddCompositePrimaryKeyMySql(
        it.name,
        it.addedCompositePKs,
        prevFull,
        curFull
      );
      deletedCompositePKs = prepareDeleteCompositePrimaryKeyMySql(
        it.name,
        it.deletedCompositePKs,
        prevFull
      );
      alteredCompositePKs = prepareAlterCompositePrimaryKeyMySql(
        it.name,
        it.alteredCompositePKs,
        prevFull,
        curFull
      );
    }
    let addedUniqueConstraints = [];
    let deletedUniqueConstraints = [];
    let alteredUniqueConstraints = [];
    addedUniqueConstraints = prepareAddUniqueConstraintPg(
      it.name,
      schemaUnwrapped,
      it.addedUniqueConstraints
    );
    deletedUniqueConstraints = prepareDeleteUniqueConstraintPg(
      it.name,
      schemaUnwrapped,
      it.deletedUniqueConstraints
    );
    if (it.alteredUniqueConstraints) {
      const added = {};
      const deleted2 = {};
      for (const k of Object.keys(it.alteredUniqueConstraints)) {
        added[k] = it.alteredUniqueConstraints[k].__new;
        deleted2[k] = it.alteredUniqueConstraints[k].__old;
      }
      addedUniqueConstraints.push(
        ...prepareAddUniqueConstraintPg(it.name, schemaUnwrapped, added)
      );
      deletedUniqueConstraints.push(
        ...prepareDeleteUniqueConstraintPg(it.name, schemaUnwrapped, deleted2)
      );
    }
    if (it.schema && typeof it.schema !== "string") {
      switch (it.schema.type) {
        case "added": {
          jsonSetTableSchemas.push({
            schema: it.schema.value,
            tableName: it.name,
            type: "alter_table_set_schema"
          });
          break;
        }
        case "changed": {
          jsonSetNewTableSchemas.push({
            type: "alter_table_set_new_schema",
            tableName: it.name,
            from: it.schema.old,
            to: it.schema.new
          });
          break;
        }
        case "deleted": {
          jsonRemoveTableFromSchemas.push({
            type: "alter_table_remove_from_schema",
            tableName: it.name,
            schema: it.schema.value
          });
          break;
        }
      }
    }
    jsonAddedCompositePKs.push(...addedCompositePKs);
    jsonDeletedCompositePKs.push(...deletedCompositePKs);
    jsonAlteredCompositePKs.push(...alteredCompositePKs);
    jsonAddedUniqueConstraints.push(...addedUniqueConstraints);
    jsonDeletedUniqueConstraints.push(...deletedUniqueConstraints);
    jsonAlteredUniqueConstraints.push(...alteredUniqueConstraints);
  });
  const rColumns = jsonRenameColumnsStatements.map((it) => {
    const tableName = it.tableName;
    const schema4 = it.schema;
    return {
      from: { schema: schema4, table: tableName, column: it.oldColumnName },
      to: { schema: schema4, table: tableName, column: it.newColumnName }
    };
  });
  const jsonTableAlternations = allAlteredResolved.map((it) => {
    const schema4 = valueFromSelfOrPatchedNew(it.schema);
    return prepareAlterTableColumnsJson(
      it.name,
      schema4,
      it.deleted,
      it.added,
      it.altered,
      it.addedForeignKeys,
      json2,
      dialect3
    );
  }).flat().reduce(
    (res, it) => {
      res.createColumns.push(...it.addColumns);
      res.dropColumns.push(...it.dropColumns);
      res.alterColumns.push(...it.alterColumns);
      return res;
    },
    { createColumns: [], dropColumns: [], alterColumns: [] }
  );
  const jsonCreateIndexesForAllAlteredTables = allAltered.map((it) => {
    const schema4 = valueFromSelfOrPatchedNew(it.schema);
    return prepareCreateIndexesJson(it.name, schema4, it.addedIndexes || {});
  }).flat();
  const jsonDropIndexesForAllAlteredTables = allAltered.map((it) => {
    const schema4 = valueFromSelfOrPatchedNew(it.schema);
    return prepareDropIndexesJson(it.name, schema4, it.deletedIndexes || {});
  }).flat();
  allAltered.forEach((it) => {
    const schema4 = valueFromSelfOrPatchedNew(it.schema);
    const droppedIndexes = Object.keys(it.alteredIndexes).reduce(
      (current, item) => {
        current[item] = it.alteredIndexes[item].__old;
        return current;
      },
      {}
    );
    const createdIndexes = Object.keys(it.alteredIndexes).reduce(
      (current, item) => {
        current[item] = it.alteredIndexes[item].__new;
        return current;
      },
      {}
    );
    jsonCreateIndexesForAllAlteredTables.push(
      ...prepareCreateIndexesJson(it.name, schema4, createdIndexes || {})
    );
    jsonDropIndexesForAllAlteredTables.push(
      ...prepareDropIndexesJson(it.name, schema4, droppedIndexes || {})
    );
  });
  const jsonCreateReferencesForCreatedTables = created.map((it) => {
    return prepareCreateReferencesJson(it.name, it.schema, it.foreignKeys);
  }).flat();
  const jsonReferencesForAllAlteredTables = allAltered.map((it) => {
    const schema4 = valueFromSelfOrPatchedNew(it.schema);
    const forAdded = prepareCreateReferencesJson(
      it.name,
      schema4,
      it.addedForeignKeys
    );
    const forAltered = prepareDropReferencesJson(
      it.name,
      schema4,
      it.deletedForeignKeys
    );
    const alteredFKs = prepareAlterReferencesJson(
      it.name,
      schema4,
      it.alteredForeignKeys
    );
    return [...forAdded, ...forAltered, ...alteredFKs];
  }).flat();
  const jsonCreateReferences = jsonCreateReferencesForCreatedTables;
  const jsonCreatedReferencesForAlteredTables = jsonReferencesForAllAlteredTables.filter(
    (t) => t.type === "create_reference"
  );
  const jsonDroppedReferencesForAlteredTables = jsonReferencesForAllAlteredTables.filter(
    (t) => t.type === "delete_reference"
  );
  const createEnums = ((_a = typedResult.addedEnums) == null ? void 0 : _a.map((it) => {
    return prepareCreateEnumJson(it.name, it.values);
  })) ?? [];
  const jsonAlterEnumsWithAddedValues = ((_b = typedResult.alteredEnums) == null ? void 0 : _b.map((it) => {
    return prepareAddValuesToEnumJson(it.name, it.addedValues);
  }).flat()) ?? [];
  if (dialect3 === "mysql") {
    createdSchemas.push(...renamedSchemas.map((it) => it.to));
    deletedSchemas.push(...renamedSchemas.map((it) => it.from));
    renamedSchemas.splice(0, renamedSchemas.length);
  }
  const createSchemas = prepareCreateSchemasJson(
    createdSchemas.map((it) => it.name)
  );
  const renameSchemas = prepareRenameSchemasJson(
    renamedSchemas.map((it) => ({ from: it.from.name, to: it.to.name }))
  );
  const dropSchemas = prepareDeleteSchemasJson(
    deletedSchemas.map((it) => it.name)
  );
  const renamedSchemasSet = new Set(
    renameSchemas.map((it) => `${it.from}-${it.to}`)
  );
  const filteredJsonSetNewTableSchemas = jsonSetNewTableSchemas.filter((it) => {
    return !renamedSchemasSet.has(`${it.from}-${it.to}`);
  });
  jsonStatements.push(...createSchemas);
  jsonStatements.push(...renameSchemas);
  jsonStatements.push(...createEnums);
  jsonStatements.push(...jsonAlterEnumsWithAddedValues);
  if (dialect3 === "sqlite") {
    jsonStatements.push(...jsonSQLiteCreateTables);
  } else if (dialect3 === "pg") {
    const jsonPgCreateTables = created.map((it) => {
      return preparePgCreateTableJson(it, curFull);
    });
    jsonStatements.push(...jsonPgCreateTables);
  } else {
    const jsonMySqlCreateTables = created.map((it) => {
      return prepareMySqlCreateTableJson(it, curFull);
    });
    jsonStatements.push(...jsonMySqlCreateTables);
  }
  jsonStatements.push(...jsonDropTables);
  jsonStatements.push(...jsonRenameTables);
  jsonStatements.push(...jsonRenameColumnsStatements);
  if (dialect3 !== "mysql") {
    jsonStatements.push(...jsonDeletedUniqueConstraints);
  }
  jsonStatements.push(...jsonDroppedReferencesForAlteredTables);
  jsonStatements.push(...jsonDropIndexesForAllAlteredTables);
  jsonStatements.push(...jsonDeletedCompositePKs);
  jsonStatements.push(...jsonTableAlternations.alterColumns);
  jsonStatements.push(...jsonAddedCompositePKs);
  if (dialect3 === "mysql") {
    jsonStatements.push(...jsonAddedUniqueConstraints);
    jsonStatements.push(...jsonDeletedUniqueConstraints);
  }
  jsonStatements.push(...jsonTableAlternations.createColumns);
  jsonStatements.push(...jsonCreateIndexesForCreatedTables);
  jsonStatements.push(...jsonCreateIndexesForAllAlteredTables);
  jsonStatements.push(...jsonCreatedReferencesForAlteredTables);
  jsonStatements.push(...jsonTableAlternations.dropColumns);
  if (dialect3 !== "sqlite")
    jsonStatements.push(...jsonCreateReferences);
  jsonStatements.push(...jsonAlteredCompositePKs);
  if (dialect3 !== "mysql") {
    jsonStatements.push(...jsonAddedUniqueConstraints);
  }
  jsonStatements.push(...jsonAlteredUniqueConstraints);
  jsonStatements.push(...jsonSetTableSchemas);
  jsonStatements.push(...filteredJsonSetNewTableSchemas);
  jsonStatements.push(...jsonRemoveTableFromSchemas);
  jsonStatements.push(...dropSchemas);
  const sqlStatements = fromJson(jsonStatements, dialect3);
  const uniqueSqlStatements = [];
  sqlStatements.forEach((ss) => {
    if (!uniqueSqlStatements.includes(ss)) {
      uniqueSqlStatements.push(ss);
    }
  });
  const _meta = prepareMigrationMeta(rSchemas, rTables, rColumns);
  return {
    statements: jsonStatements,
    sqlStatements: uniqueSqlStatements,
    _meta
  };
};

// src/cli/commands/pgUp.ts
init_source();

// src/cli/commands/mysqlUp.ts
init_source();

// src/cli/commands/upFolders.ts
var resolveSchemas = (missingSchemas, newSchemas, predicate) => {
  try {
    if (missingSchemas.length === 0 || newSchemas.length === 0) {
      return { created: newSchemas, renamed: [], deleted: missingSchemas };
    }
    const result = {
      created: [],
      renamed: [],
      deleted: []
    };
    let index4 = 0;
    let leftMissing = [...missingSchemas];
    do {
      const created = newSchemas[index4];
      index4 += 1;
      const renamed = predicate(leftMissing, created);
      if (!renamed) {
        result.created.push(created);
      } else {
        const it = renamed;
        result.renamed.push({ from: it, to: created });
        delete leftMissing[leftMissing.indexOf(it)];
        leftMissing = leftMissing.filter(Boolean);
      }
    } while (index4 < newSchemas.length);
    result.deleted.push(...leftMissing);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
var resolveTables = (missingTables, newTables, resolver) => {
  try {
    if (missingTables.length === 0 || newTables.length === 0) {
      return { created: newTables, renamed: [], deleted: missingTables };
    }
    const result = {
      created: [],
      renamed: [],
      deleted: []
    };
    let index4 = 0;
    let leftMissing = [...missingTables];
    do {
      const created = newTables[index4];
      index4 += 1;
      const renamed = resolver(leftMissing, created);
      if (!renamed) {
        result.created.push(created);
      } else {
        const it = renamed;
        result.renamed.push({ from: it, to: created });
        delete leftMissing[leftMissing.indexOf(it)];
        leftMissing = leftMissing.filter(Boolean);
      }
    } while (index4 < newTables.length);
    result.deleted.push(...leftMissing);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
var resolveColumns = (missingColumns, newColumns, predicate) => {
  try {
    if (missingColumns.length === 0 || newColumns.length === 0) {
      return { created: newColumns, renamed: [], deleted: missingColumns };
    }
    const result = {
      created: [],
      renamed: [],
      deleted: []
    };
    let index4 = 0;
    let leftMissing = [...missingColumns];
    do {
      const created = newColumns[index4];
      index4 += 1;
      const renamed = predicate(leftMissing, created);
      if (!renamed) {
        result.created.push(created);
      } else {
        const it = renamed;
        result.renamed.push({ from: it, to: created });
        delete leftMissing[leftMissing.indexOf(it)];
        leftMissing = leftMissing.filter(Boolean);
      }
    } while (index4 < newColumns.length);
    result.deleted.push(...leftMissing);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// src/utils.ts
var assertV1OutFolder = (out, dialect3) => {
  if (!existsSync(out))
    return;
  const oldMigrationFolders = readdirSync(out).filter(
    (it) => it.length === 14 && /^\d+$/.test(it)
  );
  if (oldMigrationFolders.length > 0) {
    console.log(
      `Your migrations folder format is outdated, please run ${source_default.green.bold(
        `drizzle-kit up:${dialect3}`
      )}`
    );
    process.exit(1);
  }
};
var dryJournal = (dialect3) => {
  return {
    version: snapshotVersion,
    dialect: dialect3,
    entries: []
  };
};
var snapshotsPriorV4 = (out) => {
  const oldMigrationFolders = readdirSync(out).filter(
    (it) => it.length === 14 && /^\d+$/.test(it)
  );
  oldMigrationFolders.sort();
  return oldMigrationFolders.map((it) => {
    const pathJson = join(out, it, "snapshot.json");
    console.log(pathJson);
    return pathJson;
  });
};
var prepareOutFolder2 = (out, dialect3) => {
  const meta = join(out, "meta");
  const journalPath = join(meta, "_journal.json");
  if (!existsSync(join(out, "meta"))) {
    mkdirSync(meta, { recursive: true });
    writeFileSync(journalPath, JSON.stringify(dryJournal(dialect3)));
  }
  const journal = JSON.parse(readFileSync(journalPath).toString());
  const snapshots = readdirSync(meta).filter((it) => !it.startsWith("_")).map((it) => join(meta, it));
  snapshots.sort();
  return { meta, snapshots, journal };
};
var validatorForDialect = (dialect3) => {
  switch (dialect3) {
    case "pg":
      return { validator: backwardCompatiblePgSchema, version: 5 };
    case "sqlite":
      return { validator: backwardCompatibleSqliteSchema, version: 5 };
    case "mysql":
      return { validator: backwardCompatibleMysqlSchema, version: 5 };
  }
};
var validateWithReport = (snapshots, dialect3) => {
  const { validator, version } = validatorForDialect(dialect3);
  const result = snapshots.reduce(
    (accum, it) => {
      const raw = JSON.parse(readFileSync(`./${it}`).toString());
      accum.rawMap[it] = raw;
      if (raw["version"] && Number(raw["version"]) > version) {
        console.log(
          info(
            `${it} snapshot is of unsupported version, please update drizzle-kit`
          )
        );
        process.exit(0);
      }
      const result2 = validator.safeParse(raw);
      if (!result2.success) {
        accum.malformed.push(it);
        return accum;
      }
      const snapshot = result2.data;
      if (snapshot.version !== String(version)) {
        accum.nonLatest.push(it);
        return accum;
      }
      const idEntry = accum.idsMap[snapshot["prevId"]] ?? {
        parent: it,
        snapshots: []
      };
      idEntry.snapshots.push(it);
      accum.idsMap[snapshot["prevId"]] = idEntry;
      return accum;
    },
    {
      malformed: [],
      nonLatest: [],
      idToNameMap: {},
      idsMap: {},
      rawMap: {}
    }
  );
  return result;
};
var prepareMigrationFolder = (outFolder = "drizzle", dialect3) => {
  const { snapshots, journal } = prepareOutFolder2(outFolder, dialect3);
  const report = validateWithReport(snapshots, dialect3);
  if (report.nonLatest.length > 0) {
    console.log(
      report.nonLatest.map((it) => {
        return `${it}/snapshot.json is not of the latest version`;
      }).concat(`Run ${source_default.green.bold(`drizzle-kit up:${dialect3}`)}`).join("\n")
    );
    process.exit(0);
  }
  if (report.malformed.length) {
    const message2 = report.malformed.map((it) => {
      return `${it} data is malformed`;
    }).join("\n");
    console.log(message2);
  }
  const collisionEntries = Object.entries(report.idsMap).filter(
    (it) => it[1].snapshots.length > 1
  );
  const message = collisionEntries.map((it) => {
    const data = it[1];
    return `[${data.snapshots.join(
      ", "
    )}] are pointing to a parent snapshot: ${data.parent}/snapshot.json which is a collision.`;
  }).join("\n").trim();
  if (message) {
    console.log(source_default.red.bold("Error:"), message);
  }
  const abort = report.malformed.length || collisionEntries.length > 0;
  if (abort) {
    process.exit(0);
  }
  return { snapshots, journal };
};
var prepareMigrationMeta = (schemas, tables, columns) => {
  const _meta = {
    schemas: {},
    tables: {},
    columns: {}
  };
  schemas.forEach((it) => {
    const from = schemaRenameKey(it.from);
    const to = schemaRenameKey(it.to);
    _meta.schemas[from] = to;
  });
  tables.forEach((it) => {
    const from = tableRenameKey(it.from);
    const to = tableRenameKey(it.to);
    _meta.tables[from] = to;
  });
  columns.forEach((it) => {
    const from = columnRenameKey(it.from.table, it.from.schema, it.from.column);
    const to = columnRenameKey(it.to.table, it.to.schema, it.to.column);
    _meta.columns[from] = to;
  });
  return _meta;
};
var schemaRenameKey = (it) => {
  return it;
};
var tableRenameKey = (it) => {
  const out = it.schema ? `"${it.schema}"."${it.name}"` : `"${it.name}"`;
  return out;
};
var columnRenameKey = (table4, schema4, column4) => {
  const out = schema4 ? `"${schema4}"."${table4}"."${column4}"` : `"${table4}"."${column4}"`;
  return out;
};
var kloudMeta = () => {
  return {
    pg: [5],
    mysql: [],
    sqlite: []
  };
};
var statementsForDiffs = async (in1, in2) => {
  const left = pgSchema.parse(in1 ?? dryPg);
  const right = pgSchema.parse(in2);
  const lsquashed = squashPgScheme(left);
  const rsquashed = squashPgScheme(right);
  const schemasChecker = (leftMissing, created) => {
    for (let i = 0; i < leftMissing.length; i++) {
      const it = leftMissing[i];
      if (right._meta.schemas[it.name] === created.name) {
        return it;
      }
    }
    return void 0;
  };
  const schemasResolver = async (input) => {
    const { created, deleted, renamed } = resolveSchemas(
      input.deleted,
      input.created,
      schemasChecker
    );
    return { created, deleted, renamed };
  };
  const tablesChecker = (leftMissing, created) => {
    for (let i = 0; i < leftMissing.length; i++) {
      const it = leftMissing[i];
      if (right._meta.tables[tableRenameKey(it)] === tableRenameKey(created)) {
        return it;
      }
    }
    return void 0;
  };
  const tablesResolver = async (input) => {
    const { created, deleted, renamed } = resolveTables(
      input.deleted,
      input.created,
      tablesChecker
    );
    return { created, deleted, renamed };
  };
  const columnsResolver = async (input) => {
    const tableName = input.tableName;
    const schema4 = input.schema;
    const predicate = (leftMissing, created2) => {
      for (let i = 0; i < leftMissing.length; i++) {
        const it = leftMissing[i];
        if (right._meta.columns[columnRenameKey(tableName, schema4, it.name)] === columnRenameKey(tableName, schema4, created2.name)) {
          return it;
        }
      }
      return void 0;
    };
    const { created, deleted, renamed } = resolveColumns(
      input.deleted,
      input.created,
      predicate
    );
    return { tableName, schema: schema4, created, renamed, deleted };
  };
  const result = await applySnapshotsDiff(
    lsquashed,
    rsquashed,
    "pg",
    schemasResolver,
    tablesResolver,
    columnsResolver
  );
  return { ...result, left, right };
};
export {
  assertV1OutFolder,
  columnRenameKey,
  dryJournal,
  kloudMeta,
  prepareMigrationFolder,
  prepareMigrationMeta,
  prepareOutFolder2 as prepareOutFolder,
  schemaRenameKey,
  snapshotsPriorV4,
  statementsForDiffs,
  tableRenameKey,
  validateWithReport
};
