var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/.pnpm/react-fast-compare@3.2.0/node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "../node_modules/.pnpm/react-fast-compare@3.2.0/node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// rui2/AccordionItem.tsx
import * as React3 from "react";

// rui2/tokens.ts
import { css } from "@emotion/react";

// themes/util.ts
import chroma2 from "chroma-js";

// ../shared/mapObject.ts
function mapObject(obj, fn2) {
  const obj2 = {};
  for (const k1 in obj) {
    const result = fn2(k1, obj[k1]);
    if (Array.isArray(result)) {
      obj2[result[0]] = result[1];
    } else {
      for (const [k2, v2] of result) {
        obj2[k2] = v2;
      }
    }
  }
  return obj2;
}

// ../shared/themes/tokens.ts
var baseTokens = {
  borderRadius1: ["--border-radius-1", "1px"],
  borderRadius2: ["--border-radius-2", "2px"],
  borderRadius4: ["--border-radius-4", "4px"],
  borderRadius8: ["--border-radius-8", "8px"],
  borderRadius12: ["--border-radius-12", "12px"],
  borderRadius16: ["--border-radius-16", "16px"],
  borderRadiusDefault: ["--border-radius-default", "var(--border-radius-8)"],
  borderRadiusRound: ["--border-radius-round", "1028px"],
  space2: ["--space-2", "2px"],
  space4: ["--space-4", "4px"],
  space8: ["--space-8", "8px"],
  space12: ["--space-12", "12px"],
  space16: ["--space-16", "16px"],
  space24: ["--space-24", "24px"],
  space32: ["--space-32", "32px"],
  space48: ["--space-48", "48px"],
  space64: ["--space-64", "64px"],
  space128: ["--space-128", "128px"],
  space256: ["--space-256", "256px"],
  spaceDefault: ["--space-default", "var(--space-8)"],
  shadow1: ["--shadow-1", "0px 4px 8px 0px rgba(2, 2, 3, 0.16)"],
  shadow2: ["--shadow-2", "0px 8px 16px 0px rgba(2, 2, 3, 0.32)"],
  shadow3: ["--shadow-3", "0px 16px 32px 0px rgba(2, 2, 3, 0.48)"],
  shadowDefault: ["--shadow-default", "var(--shadow-1)"],
  fontFamilyDefault: ["--font-family-default", "'IBM Plex Sans', sans-serif"],
  fontFamilyCode: ["--font-family-code", "'ReplitHack',  monospace"],
  fontSizeSmall: ["--font-size-small", "12px"],
  lineHeightSmall: ["--line-height-small", "1.5"],
  fontSizeDefault: ["--font-size-default", "14px"],
  lineHeightDefault: ["--line-height-default", "1.6"],
  fontSizeSubheadDefault: ["--font-size-subhead-default", "16px"],
  lineHeightSubheadDefault: ["--line-height-subhead-default", "1.375"],
  fontSizeSubheadBig: ["--font-size-subhead-big", "20px"],
  lineHeightSubheadBig: ["--line-height-subhead-big", "1.2"],
  fontSizeHeaderDefault: ["--font-size-header-default", "24px"],
  lineHeightHeaderDefault: ["--line-height-header-default", "1"],
  fontSizeHeaderBig: ["--font-size-header-big", "32px"],
  lineHeightHeaderBig: ["--line-height-header-big", "1"],
  fontWeightRegular: ["--font-weight-regular", "400"],
  fontWeightMedium: ["--font-weight-medium", "500"],
  fontWeightBold: ["--font-weight-bold", "600"],
  transitionDurationSnappy: ["--transition-duration-snappy", "120ms"],
  transitionTimingFunctionSnappy: [
    "--transition-timing-function-snappy",
    "ease-out"
  ],
  transitionDurationChill: ["--transition-duration-chill", "300ms"],
  transitionTimingFunctionChill: [
    "--transition-timing-function-chill",
    "ease-in-out"
  ],
  borderWidthDefault: ["--border-width-default", "1px"],
  singleLine: ["--single-line", "1"]
};
var themeValueToCssPropertyMap = {
  backgroundRoot: "--background-root",
  backgroundDefault: "--background-default",
  backgroundHigher: "--background-higher",
  backgroundHighest: "--background-highest",
  backgroundOverlay: "--background-overlay",
  foregroundDefault: "--foreground-default",
  foregroundDimmer: "--foreground-dimmer",
  foregroundDimmest: "--foreground-dimmest",
  outlineDimmest: "--outline-dimmest",
  outlineDimmer: "--outline-dimmer",
  outlineDefault: "--outline-default",
  outlineStronger: "--outline-stronger",
  outlineStrongest: "--outline-strongest",
  accentPrimaryDimmest: "--accent-primary-dimmest",
  accentPrimaryDimmer: "--accent-primary-dimmer",
  accentPrimaryDefault: "--accent-primary-default",
  accentPrimaryStronger: "--accent-primary-stronger",
  accentPrimaryStrongest: "--accent-primary-strongest",
  accentPositiveDimmest: "--accent-positive-dimmest",
  accentPositiveDimmer: "--accent-positive-dimmer",
  accentPositiveDefault: "--accent-positive-default",
  accentPositiveStronger: "--accent-positive-stronger",
  accentPositiveStrongest: "--accent-positive-strongest",
  accentNegativeDimmest: "--accent-negative-dimmest",
  accentNegativeDimmer: "--accent-negative-dimmer",
  accentNegativeDefault: "--accent-negative-default",
  accentNegativeStronger: "--accent-negative-stronger",
  accentNegativeStrongest: "--accent-negative-strongest",
  redDimmest: "--accent-red-dimmest",
  redDimmer: "--accent-red-dimmer",
  redDefault: "--accent-red-default",
  redStronger: "--accent-red-stronger",
  redStrongest: "--accent-red-strongest",
  orangeDimmest: "--accent-orange-dimmest",
  orangeDimmer: "--accent-orange-dimmer",
  orangeDefault: "--accent-orange-default",
  orangeStronger: "--accent-orange-stronger",
  orangeStrongest: "--accent-orange-strongest",
  yellowDimmest: "--accent-yellow-dimmest",
  yellowDimmer: "--accent-yellow-dimmer",
  yellowDefault: "--accent-yellow-default",
  yellowStronger: "--accent-yellow-stronger",
  yellowStrongest: "--accent-yellow-strongest",
  limeDimmest: "--accent-lime-dimmest",
  limeDimmer: "--accent-lime-dimmer",
  limeDefault: "--accent-lime-default",
  limeStronger: "--accent-lime-stronger",
  limeStrongest: "--accent-lime-strongest",
  greenDimmest: "--accent-green-dimmest",
  greenDimmer: "--accent-green-dimmer",
  greenDefault: "--accent-green-default",
  greenStronger: "--accent-green-stronger",
  greenStrongest: "--accent-green-strongest",
  tealDimmest: "--accent-teal-dimmest",
  tealDimmer: "--accent-teal-dimmer",
  tealDefault: "--accent-teal-default",
  tealStronger: "--accent-teal-stronger",
  tealStrongest: "--accent-teal-strongest",
  blueDimmest: "--accent-blue-dimmest",
  blueDimmer: "--accent-blue-dimmer",
  blueDefault: "--accent-blue-default",
  blueStronger: "--accent-blue-stronger",
  blueStrongest: "--accent-blue-strongest",
  blurpleDimmest: "--accent-blurple-dimmest",
  blurpleDimmer: "--accent-blurple-dimmer",
  blurpleDefault: "--accent-blurple-default",
  blurpleStronger: "--accent-blurple-stronger",
  blurpleStrongest: "--accent-blurple-strongest",
  purpleDimmest: "--accent-purple-dimmest",
  purpleDimmer: "--accent-purple-dimmer",
  purpleDefault: "--accent-purple-default",
  purpleStronger: "--accent-purple-stronger",
  purpleStrongest: "--accent-purple-strongest",
  magentaDimmest: "--accent-magenta-dimmest",
  magentaDimmer: "--accent-magenta-dimmer",
  magentaDefault: "--accent-magenta-default",
  magentaStronger: "--accent-magenta-stronger",
  magentaStrongest: "--accent-magenta-strongest",
  pinkDimmest: "--accent-pink-dimmest",
  pinkDimmer: "--accent-pink-dimmer",
  pinkDefault: "--accent-pink-default",
  pinkStronger: "--accent-pink-stronger",
  pinkStrongest: "--accent-pink-strongest",
  greyDimmest: "--accent-grey-dimmest",
  greyDimmer: "--accent-grey-dimmer",
  greyDefault: "--accent-grey-default",
  greyStronger: "--accent-grey-stronger",
  greyStrongest: "--accent-grey-strongest",
  brownDimmest: "--accent-brown-dimmest",
  brownDimmer: "--accent-brown-dimmer",
  brownDefault: "--accent-brown-default",
  brownStronger: "--accent-brown-stronger",
  brownStrongest: "--accent-brown-strongest",
  black: "--black",
  white: "--white"
};
var cssPropertyToThemeValueMap = mapObject(
  themeValueToCssPropertyMap,
  (key, value) => [`var(${value})`, key]
);
var tokens = {
  ...mapObject(baseTokens, (key, [cssProp]) => [key, `var(${cssProp})`]),
  ...mapObject(themeValueToCssPropertyMap, (key, cssProp) => [
    key,
    `var(${cssProp})`
  ])
};
function isGlobalTokenName(name) {
  return name in themeValueToCssPropertyMap;
}

// ../shared/themes/replitDark.ts
var replitDark = {
  id: "replitDark",
  name: "Dark",
  description: "The official Replit dark theme",
  colorScheme: "dark" /* Dark */,
  isOfficial: true,
  values: {
    global: {
      backgroundRoot: "#0E1525",
      backgroundDefault: "#1C2333",
      backgroundHigher: "#2B3245",
      backgroundHighest: "#3C445C",
      backgroundOverlay: "#0e1525A0",
      foregroundDefault: "#F5F9FC",
      foregroundDimmer: "#C2C8CC",
      foregroundDimmest: "#9DA2A6",
      outlineDimmest: "#2B3245",
      outlineDimmer: "#3C445C",
      outlineDefault: "#4E5569",
      outlineStronger: "#5F677A",
      outlineStrongest: "#70788C",
      accentPrimaryDimmest: "#004182",
      accentPrimaryDimmer: "#0053A6",
      accentPrimaryDefault: "#0079F2",
      accentPrimaryStronger: "#57ABFF",
      accentPrimaryStrongest: "#B2D9FF",
      accentPositiveDimmest: "#044A10",
      accentPositiveDimmer: "#046113",
      accentPositiveDefault: "#009118",
      accentPositiveStronger: "#6CD97E",
      accentPositiveStrongest: "#BFFFCA",
      accentNegativeDimmest: "#660000",
      accentNegativeDimmer: "#A60808",
      accentNegativeDefault: "#E52222",
      accentNegativeStronger: "#FF6666",
      accentNegativeStrongest: "#FFCFCF",
      redDimmest: "#660000",
      redDimmer: "#A60808",
      redDefault: "#E52222",
      redStronger: "#FF6666",
      redStrongest: "#FFCFCF",
      orangeDimmest: "#542A00",
      orangeDimmer: "#703800",
      orangeDefault: "#AD5700",
      orangeStronger: "#D4781C",
      orangeStrongest: "#FFBD7A",
      yellowDimmest: "#4D4000",
      yellowDimmer: "#635300",
      yellowDefault: "#967D00",
      yellowStronger: "#BFA730",
      yellowStrongest: "#F2E088",
      limeDimmest: "#314A00",
      limeDimmer: "#3D5C00",
      limeDefault: "#5A8700",
      limeStronger: "#87B825",
      limeStrongest: "#C4E581",
      greenDimmest: "#044A10",
      greenDimmer: "#046113",
      greenDefault: "#009118",
      greenStronger: "#6CD97E",
      greenStrongest: "#7AEB8D",
      tealDimmest: "#004452",
      tealDimmer: "#006073",
      tealDefault: "#0093B0",
      tealStronger: "#27B9D6",
      tealStrongest: "#69D9F0",
      blueDimmest: "#004182",
      blueDimmer: "#0053A6",
      blueDefault: "#0079F2",
      blueStronger: "#57ABFF",
      blueStrongest: "#B2D9FF",
      blurpleDimmest: "#39298A",
      blurpleDimmer: "#5239CC",
      blurpleDefault: "#795EFF",
      blurpleStronger: "#A694FF",
      blurpleStrongest: "#CEC4FF",
      purpleDimmest: "#582987",
      purpleDimmer: "#7633B8",
      purpleDefault: "#A64DFF",
      purpleStronger: "#C78FFF",
      purpleStrongest: "#E2C4FF",
      magentaDimmest: "#6B1A6B",
      magentaDimmer: "#8A218A",
      magentaDefault: "#C73AC7",
      magentaStronger: "#F562F5",
      magentaStrongest: "#FFBFFF",
      pinkDimmest: "#6E1B52",
      pinkDimmer: "#8F226B",
      pinkDefault: "#D4359F",
      pinkStronger: "#FF70CF",
      pinkStrongest: "#FFBAE8",
      greyDimmest: "#404040",
      greyDimmer: "#545454",
      greyDefault: "#808080",
      greyStronger: "#A6A6A6",
      greyStrongest: "#D4D4D4",
      brownDimmest: "#594031",
      brownDimmer: "#75503B",
      brownDefault: "#A3765C",
      brownStronger: "#D49877",
      brownStrongest: "#FFC8A8",
      black: "#0E1525",
      white: "#FCFCFC"
    },
    editor: {
      syntaxHighlighting: [
        { tags: [{ name: "url" }], values: { textDecoration: "underline" } },
        {
          tags: [{ name: "heading1" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.2em" }
        },
        {
          tags: [{ name: "heading2" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.1em" }
        },
        {
          tags: [{ name: "heading3" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.05" }
        },
        { tags: [{ name: "emphasis" }], values: { fontStyle: "italic" } },
        {
          tags: [{ name: "heading" }, { name: "strong" }],
          values: { fontWeight: tokens.fontWeightBold }
        },
        {
          tags: [{ name: "strikethrough" }, { name: "deleted" }],
          values: { textDecoration: "line-through" }
        },
        {
          tags: [{ name: "monospace" }],
          values: { fontFamily: tokens.fontFamilyCode }
        },
        {
          tags: [{ name: "bracket" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "squareBracket" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "angleBracket" }],
          values: { color: tokens.foregroundDimmest }
        },
        {
          tags: [{ name: "variableName" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "variableName", modifiers: ["definition"] }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "comment" }],
          values: {
            color: tokens.greenDefault
          }
        },
        {
          tags: [{ name: "invalid" }],
          values: { color: tokens.redStronger }
        },
        {
          tags: [
            { name: "string" },
            { name: "string", modifiers: ["special"] },
            { name: "character" }
          ],
          values: { color: tokens.orangeStrongest }
        },
        {
          tags: [{ name: "deleted" }],
          values: { color: tokens.orangeStrongest }
        },
        {
          tags: [{ name: "literal" }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "inserted" }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "link" }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "contentSeparator" }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "labelName" }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "propertyName", modifiers: ["function"] }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "variableName", modifiers: ["function"] }],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [
            { name: "variableName", modifiers: ["function", "definition"] }
          ],
          values: { color: tokens.yellowStrongest }
        },
        {
          tags: [{ name: "number" }, { name: "integer" }, { name: "float" }],
          values: { color: tokens.limeStrongest }
        },
        {
          tags: [{ name: "variableName", modifiers: ["local"] }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "propertyName", modifiers: ["definition"] }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "propertyName" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "attributeName" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "operator" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "bool" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "className" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "macroName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["special"] }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "typeName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "tagName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "meta" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "atom" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "keyword" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["standard"] }],
          values: { color: tokens.purpleStronger }
        },
        {
          tags: [{ name: "namespace" }],
          values: { color: tokens.tealStrongest }
        },
        {
          tags: [{ name: "escape" }],
          values: { color: tokens.pinkStronger }
        },
        {
          tags: [{ name: "regexp" }],
          values: { color: tokens.pinkStronger }
        }
      ]
    }
  }
};

// ../shared/themes/replitLight.ts
var replitLight = {
  id: "replitLight",
  name: "Light",
  description: "The official Replit light theme",
  colorScheme: "light" /* Light */,
  isOfficial: true,
  values: {
    global: {
      backgroundRoot: "#EBECED",
      backgroundDefault: "#FCFCFC",
      backgroundHigher: "#F0F1F2",
      backgroundHighest: "#E4E5E6",
      backgroundOverlay: "#F0F1F2A0",
      foregroundDefault: "#07080A",
      foregroundDimmer: "#3D4047",
      foregroundDimmest: "#5C5F66",
      outlineDimmest: "#D2D4D6",
      outlineDimmer: "#C0C3C4",
      outlineDefault: "#AFB1B3",
      outlineStronger: "#98999C",
      outlineStrongest: "#74767A",
      accentPrimaryDimmest: "#B2D9FF",
      accentPrimaryDimmer: "#6BB5FF",
      accentPrimaryDefault: "#0F87FF",
      accentPrimaryStronger: "#005CB8",
      accentPrimaryStrongest: "#004182",
      accentPositiveDimmest: "#7AEB8D",
      accentPositiveDimmer: "#3CC954",
      accentPositiveDefault: "#00A11B",
      accentPositiveStronger: "#036E15",
      accentPositiveStrongest: "#004D0D",
      accentNegativeDimmest: "#FFC7C7",
      accentNegativeDimmer: "#FF9494",
      accentNegativeDefault: "#FA4B4B",
      accentNegativeStronger: "#C20A0A",
      accentNegativeStrongest: "#8A0000",
      redDimmest: "#FFC7C7",
      redDimmer: "#FF9494",
      redDefault: "#FA4B4B",
      redStronger: "#C20A0A",
      redStrongest: "#8A0000",
      orangeDimmest: "#FFCC99",
      orangeDimmer: "#FF9933",
      orangeDefault: "#D96D00",
      orangeStronger: "#964B00",
      orangeStrongest: "#693400",
      yellowDimmest: "#EBD66E",
      yellowDimmer: "#CFB015",
      yellowDefault: "#A68A00",
      yellowStronger: "#736000",
      yellowStrongest: "#4F4200",
      limeDimmest: "#C0E378",
      limeDimmer: "#93C926",
      limeDefault: "#639400",
      limeStronger: "#466900",
      limeStrongest: "#3A5700",
      greenDimmest: "#7AEB8D",
      greenDimmer: "#3CC954",
      greenDefault: "#00A11B",
      greenStronger: "#036E15",
      greenStrongest: "#004D0D",
      tealDimmest: "#6FE5FC",
      tealDimmer: "#22C1E0",
      tealDefault: "#0093B0",
      tealStronger: "#00687D",
      tealStrongest: "#004857",
      blueDimmest: "#B2D9FF",
      blueDimmer: "#6BB5FF",
      blueDefault: "#0F87FF",
      blueStronger: "#005CB8",
      blueStrongest: "#004182",
      blurpleDimmest: "#D7CFFF",
      blurpleDimmer: "#B2A3FF",
      blurpleDefault: "#8E78FF",
      blurpleStronger: "#5B40E3",
      blurpleStrongest: "#412F9C",
      purpleDimmest: "#E6CCFF",
      purpleDimmer: "#D0A1FF",
      purpleDefault: "#B266FF",
      purpleStronger: "#7F38C7",
      purpleStrongest: "#5B278F",
      magentaDimmest: "#FFBFFF",
      magentaDimmer: "#FF82FF",
      magentaDefault: "#EB3BEB",
      magentaStronger: "#A321A3",
      magentaStrongest: "#731C73",
      pinkDimmest: "#FFC7EC",
      pinkDimmer: "#FF87D7",
      pinkDefault: "#F545BA",
      pinkStronger: "#AB2980",
      pinkStrongest: "#781E5A",
      greyDimmest: "#D5D5D5",
      greyDimmer: "#B0B0B0",
      greyDefault: "#898989",
      greyStronger: "#616161",
      greyStrongest: "#454545",
      brownDimmest: "#FFC9AB",
      brownDimmer: "#DEA483",
      brownDefault: "#B07F63",
      brownStronger: "#805740",
      brownStrongest: "#573E30",
      black: "#0E1525",
      white: "#FCFCFC"
    },
    editor: {
      syntaxHighlighting: [
        { tags: [{ name: "url" }], values: { textDecoration: "underline" } },
        {
          tags: [{ name: "heading1" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.2em" }
        },
        {
          tags: [{ name: "heading2" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.1em" }
        },
        {
          tags: [{ name: "heading3" }],
          values: { fontWeight: tokens.fontWeightBold, fontSize: "1.05" }
        },
        { tags: [{ name: "emphasis" }], values: { fontStyle: "italic" } },
        {
          tags: [{ name: "heading" }, { name: "strong" }],
          values: { fontWeight: tokens.fontWeightBold }
        },
        {
          tags: [{ name: "strikethrough" }, { name: "deleted" }],
          values: { textDecoration: "line-through" }
        },
        {
          tags: [{ name: "monospace" }],
          values: { fontFamily: tokens.fontFamilyCode }
        },
        {
          tags: [{ name: "bracket" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "squareBracket" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "angleBracket" }],
          values: { color: tokens.foregroundDimmest }
        },
        {
          tags: [{ name: "variableName" }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "variableName", modifiers: ["definition"] }],
          values: { color: tokens.foregroundDefault }
        },
        {
          tags: [{ name: "comment" }],
          values: {
            color: tokens.outlineStronger
          }
        },
        {
          tags: [{ name: "invalid" }],
          values: { color: tokens.redDefault }
        },
        {
          tags: [
            { name: "string" },
            { name: "string", modifiers: ["special"] },
            { name: "character" }
          ],
          values: { color: tokens.orangeStronger }
        },
        {
          tags: [{ name: "deleted" }],
          values: { color: tokens.orangeStronger }
        },
        {
          tags: [{ name: "literal" }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "inserted" }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "link" }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "contentSeparator" }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "labelName" }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "propertyName", modifiers: ["function"] }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["function"] }],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [
            { name: "variableName", modifiers: ["function", "definition"] }
          ],
          values: { color: tokens.yellowStronger }
        },
        {
          tags: [{ name: "number" }, { name: "integer" }, { name: "float" }],
          values: { color: tokens.limeStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["local"] }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "propertyName", modifiers: ["definition"] }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "propertyName" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "attributeName" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "operator" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "bool" }],
          values: { color: tokens.blueStrongest }
        },
        {
          tags: [{ name: "className" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "macroName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["special"] }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "typeName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "tagName" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "meta" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "atom" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "keyword" }],
          values: { color: tokens.blueStronger }
        },
        {
          tags: [{ name: "variableName", modifiers: ["standard"] }],
          values: { color: tokens.purpleStronger }
        },
        {
          tags: [{ name: "namespace" }],
          values: { color: tokens.tealStronger }
        },
        {
          tags: [{ name: "escape" }],
          values: { color: tokens.pinkStronger }
        },
        {
          tags: [{ name: "regexp" }],
          values: { color: tokens.pinkStronger }
        }
      ]
    }
  }
};

// ../shared/themes/replitSpooky.ts
var replitSpooky = {
  id: "replitSpooky",
  name: "Spooky",
  description: "The official Replit spooky theme",
  colorScheme: "dark" /* Dark */,
  isOfficial: true,
  values: {
    global: {
      backgroundRoot: "#020203",
      backgroundDefault: "#292C33",
      backgroundHigher: "#383B42",
      backgroundHighest: "#474A52",
      backgroundOverlay: "#F0F1F2A0",
      foregroundDefault: "#F5F9FC",
      foregroundDimmer: "#C2C8CC",
      foregroundDimmest: "#9DA2A6",
      outlineDimmest: "#4E5569",
      outlineDimmer: "#5F677A",
      outlineDefault: "#70788C",
      outlineStronger: "#828899",
      outlineStrongest: "#9195A1",
      accentPrimaryDimmest: "#753B00",
      accentPrimaryDimmer: "#9C4E00",
      accentPrimaryDefault: "#D96D00",
      accentPrimaryStronger: "#FFC285",
      accentPrimaryStrongest: "#FFD9B2",
      accentPositiveDimmest: "#753B00",
      accentPositiveDimmer: "#9C4E00",
      accentPositiveDefault: "#D96D00",
      accentPositiveStronger: "#FFC285",
      accentPositiveStrongest: "#FFD9B2",
      accentNegativeDimmest: "#573A3A",
      accentNegativeDimmer: "#8F2828",
      accentNegativeDefault: "#F23F3F",
      accentNegativeStronger: "#FF8585",
      accentNegativeStrongest: "#FFBFBF",
      redDimmest: "#6E0000",
      redDimmer: "#A60000",
      redDefault: "#E50000",
      redStronger: "#FF8585",
      redStrongest: "#FFC7C7",
      orangeDimmest: "#753B00",
      orangeDimmer: "#9C4E00",
      orangeDefault: "#D96D00",
      orangeStronger: "#FFC285",
      orangeStrongest: "#FFD9B2",
      yellowDimmest: "#756200",
      yellowDimmer: "#A68A00",
      yellowDefault: "#CCAD14",
      yellowStronger: "#FFEA7F",
      yellowStrongest: "#FFF2B2",
      limeDimmest: "#314A00",
      limeDimmer: "#3D5C00",
      limeDefault: "#5A8700",
      limeStronger: "#87B825",
      limeStrongest: "#C4E581",
      greenDimmest: "#00540E",
      greenDimmer: "#007814",
      greenDefault: "#36B24A",
      greenStronger: "#66FF7F",
      greenStrongest: "#B2FFBF",
      tealDimmest: "#005B6E",
      tealDimmer: "#007F99",
      tealDefault: "#3DB4CC",
      tealStronger: "#7FEAFF",
      tealStrongest: "#BFF4FF",
      blueDimmest: "#004D99",
      blueDimmer: "#005EBD",
      blueDefault: "#2E8AE5",
      blueStronger: "#7FBFFF",
      blueStrongest: "#B2D9FF",
      blurpleDimmest: "#422F9E",
      blurpleDimmer: "#563CD6",
      blurpleDefault: "#7559FF",
      blurpleStronger: "#A18FFF",
      blurpleStrongest: "#CEC4FF",
      purpleDimmest: "#6C32A6",
      purpleDimmer: "#9140E3",
      purpleDefault: "#A64DFF",
      purpleStronger: "#C78FFF",
      purpleStrongest: "#E2C4FF",
      magentaDimmest: "#802680",
      magentaDimmer: "#B031B0",
      magentaDefault: "#E55AE5",
      magentaStronger: "#FF8AFF",
      magentaStrongest: "#FFC2FF",
      pinkDimmest: "#802662",
      pinkDimmer: "#B03186",
      pinkDefault: "#E545B0",
      pinkStronger: "#FF8AD8",
      pinkStrongest: "#FFC2EB",
      greyDimmest: "#595959",
      greyDimmer: "#666666",
      greyDefault: "#808080",
      greyStronger: "#999999",
      greyStrongest: "#BFBFBF",
      brownDimmest: "#594031",
      brownDimmer: "#75503B",
      brownDefault: "#A3765C",
      brownStronger: "#D49877",
      brownStrongest: "#FFC8A8",
      black: "#0E1525",
      white: "#FCFCFC"
    },
    editor: replitDark.values.editor
  }
};

// ../shared/themes/index.ts
var allOfficialThemes = [replitLight, replitDark, replitSpooky];
var officialReplitThemeKeys = allOfficialThemes.map(
  (theme) => theme.id
);
var ROOT_THEME_CLASS = "replit-ui-theme-root";

// ../shared/themes/sanitizeValues.ts
import chroma from "chroma-js";
function tagToString(tag) {
  if (!tag.modifiers) {
    return tag.name;
  }
  return `${tag.name} (${tag.modifiers.slice().sort().join(",")})`;
}
var globalValuesAllowList = new Set(Object.keys(replitLight.values.global));
var syntaxHighlightingTagsAllowList = new Set(
  replitLight.values.editor.syntaxHighlighting.reduce(
    (arr, curr) => {
      arr.push(...curr.tags.map(tagToString));
      return arr;
    },
    []
  )
);
var syntaxHighlightingStyleAttributesAllowList = new Set(
  replitLight.values.editor.syntaxHighlighting.reduce(
    (arr, curr) => {
      arr.push(...Object.keys(curr.values));
      return arr;
    },
    []
  )
);

// themes/util.ts
var AUTO_LIGHT_CLASSNAME = "replitLight";
var AUTO_DARK_CLASSNAME = "replitDark";
function getThemeSettingsCss(values) {
  const themeCssProps = {};
  Object.entries(values.global).forEach(([key, val]) => {
    if (isGlobalTokenName(key)) {
      const cssPropertyName = themeValueToCssPropertyMap[key];
      themeCssProps[cssPropertyName] = val;
    }
  });
  return themeCssProps;
}

// ui/constants.ts
var BREAKPOINTS = {
  mobileMin: 320,
  mobileMax: 480,
  tabletMin: 768,
  tabletMax: 1024
};
var TRANSITIONS = {
  duration: "120ms",
  timingFunction: "ease-out"
};

// rui2/tokens.ts
var globalStyles = {
  [`.${ROOT_THEME_CLASS}, :root`]: mapObject(
    baseTokens,
    (_key, [cssVar, value]) => [cssVar, value]
  ),
  [`.${ROOT_THEME_CLASS}.${AUTO_LIGHT_CLASSNAME}`]: mapObject(
    replitLight.values.global,
    (key, value) => [themeValueToCssPropertyMap[key], value]
  ),
  [`.${ROOT_THEME_CLASS}.${AUTO_DARK_CLASSNAME}`]: mapObject(
    replitDark.values.global,
    (key, value) => [themeValueToCssPropertyMap[key], value]
  )
};
var toSpace = (space) => `var(--space-${space})`;
var toBorderRadius = (radius) => {
  if (radius === "full") {
    return "50%";
  }
  if (radius === 0) {
    return "0";
  }
  return `var(--border-radius-${radius})`;
};
var toShadow = (shadow) => `var(--shadow-${shadow})`;
var ModalZIndex = 3e5;
var truncate = css({
  display: "inline-block",
  lineHeight: 1.2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
var rcss = {
  p: (space) => css({ padding: toSpace(space) }),
  px: (space) => css({ paddingLeft: toSpace(space), paddingRight: toSpace(space) }),
  py: (space) => css({ paddingTop: toSpace(space), paddingBottom: toSpace(space) }),
  pt: (space) => css({ paddingTop: toSpace(space) }),
  pb: (space) => css({ paddingBottom: toSpace(space) }),
  pl: (space) => css({ paddingLeft: toSpace(space) }),
  pr: (space) => css({ paddingRight: toSpace(space) }),
  shadow: (shadow) => css({ boxShadow: toShadow(shadow) }),
  m: (space) => css({ margin: toSpace(space) }),
  mx: (space) => css({ marginLeft: toSpace(space), marginRight: toSpace(space) }),
  my: (space) => css({ marginTop: toSpace(space), marginBottom: toSpace(space) }),
  mt: (space) => css({ marginTop: toSpace(space) }),
  mb: (space) => css({ marginBottom: toSpace(space) }),
  ml: (space) => css({ marginLeft: toSpace(space) }),
  mr: (space) => css({ marginRight: toSpace(space) }),
  position: {
    static: css({ position: "static" }),
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" })
  },
  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    rowReverse: css({ display: "flex", flexDirection: "row-reverse" }),
    columnReverse: css({ display: "flex", flexDirection: "column-reverse" }),
    grow: (flexGrow) => css({ flexGrow }),
    growAndShrink: (flex) => css({ flexGrow: flex, flexShrink: flex }),
    shrink: (flex) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
    wrapReverse: css({ flexWrap: "wrap-reverse" })
  },
  layout: {
    columns: css({
      display: "grid",
      gridTemplateColumns: "repeat(var(--column-number), minmax(0, 1fr))",
      gap: tokens.space16,
      gridAutoColumns: "max-content"
    }),
    colSpan: (columns) => {
      return css({
        gridColumn: "span min(" + columns + ", var(--column-number)) / span min(" + columns + ", var(--column-number))"
      });
    }
  },
  display: {
    none: css({ display: "none" }),
    block: css({ display: "block" }),
    inline: css({ display: "inline" }),
    inlineBlock: css({ display: "inline-block" }),
    flex: css({ display: "flex" }),
    inlineFlex: css({ display: "inline-flex" }),
    grid: css({ display: "grid" })
  },
  visibility: {
    visible: css({ visibility: "visible" }),
    hidden: css({ visibility: "hidden" })
  },
  center: css({ alignItems: "center", justifyContent: "center" }),
  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    stretch: css({ alignItems: "stretch" }),
    baseline: css({ alignItems: "baseline" }),
    end: css({ alignItems: "flex-end" })
  },
  justify: {
    start: css({ justifyContent: "flex-start" }),
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
    spaceAround: css({ justifyContent: "space-around" }),
    spaceEvenly: css({ justifyContent: "space-evenly" })
  },
  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0
  }),
  rowWithGap: (space) => css({
    flexDirection: "row",
    "& > *": { marginRight: toSpace(space) },
    "& > *:last-child": { marginRight: 0 }
  }),
  colWithGap: (space) => css({
    flexDirection: "column",
    "& > *": { marginBottom: toSpace(space) },
    "& > *:last-child": { marginBottom: 0 }
  }),
  rowReverseWithGap: (space) => css({
    flexDirection: "row-reverse",
    "& > *": { marginRight: toSpace(space) },
    "& > *:first-child": { marginRight: 0 }
  }),
  colReverseWithGap: (space) => css({
    flexDirection: "column-reverse",
    "& > *": { marginBottom: toSpace(space) },
    "& > *:first-child": { marginBottom: 0 }
  }),
  borderRadius: (...radius) => {
    return css({
      borderRadius: radius.map(toBorderRadius).join(" ")
    });
  },
  font: {
    default: css({ fontFamily: tokens.fontFamilyDefault }),
    code: css({ fontFamily: tokens.fontFamilyCode })
  },
  fontWeight: {
    normal: css({ fontWeight: tokens.fontWeightRegular }),
    medium: css({ fontWeight: tokens.fontWeightMedium }),
    bold: css({ fontWeight: tokens.fontWeightBold })
  },
  fontSize: (fontSize) => css({ fontSize }),
  textAlign: {
    left: css({ textAlign: "left" }),
    center: css({ textAlign: "center" }),
    right: css({ textAlign: "right" })
  },
  color: {
    ...mapObject(themeValueToCssPropertyMap, (name, cssProp) => [
      name,
      css({
        color: `var(${cssProp})`
      })
    ])
  },
  backgroundColor: {
    ...mapObject(themeValueToCssPropertyMap, (name, cssProp) => [
      name,
      css({
        backgroundColor: `var(${cssProp})`
      })
    ])
  },
  backgroundImage: (url) => css({
    backgroundImage: `url("${url}")`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  }),
  cursor: {
    pointer: css({ cursor: "pointer" }),
    default: css({ cursor: "default" }),
    progress: css({ cursor: "progress" }),
    auto: css({ cursor: "auto" })
  },
  overflow: (overflow) => css({ overflow }),
  overflowX: (overflowX) => css({ overflowX }),
  overflowY: (overflowY) => css({ overflowY }),
  zIndex: (zIndex) => css({ zIndex }),
  top: (top2) => css({ top: top2 }),
  bottom: (bottom2) => css({ bottom: bottom2 }),
  left: (left2) => css({ left: left2 }),
  right: (right2) => css({ right: right2 }),
  width: (width) => css({ width }),
  height: (height) => css({ height }),
  maxWidth: (maxWidth) => css({ maxWidth }),
  maxHeight: (maxHeight) => css({ maxHeight }),
  minWidth: (minWidth) => css({ minWidth }),
  minHeight: (minHeight) => css({ minHeight }),
  coverContainer: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }),
  transition: {
    snappy: css({
      transitionProperty: "all",
      transitionDuration: "120ms",
      transitionTimingFunction: "ease-out"
    }),
    chill: css({
      transitionProperty: "all",
      transitionDuration: "300ms",
      transitionTimingFunction: "ease-in-out"
    })
  },
  focusRing: css({
    ":focus": {
      boxShadow: "0 0 0 2px " + tokens.accentPrimaryDefault,
      outline: "2px solid transparent",
      outlineOffset: "4px",
      ":not(:focus-visible)": {
        outline: "none",
        boxShadow: "none"
      }
    }
  }),
  reset: {
    button: css({
      border: "none",
      background: "transparent",
      color: "inherit",
      font: "inherit",
      lineHeight: "normal"
    })
  },
  noScrollbars: css({
    "&::-webkit-scrollbar": { width: 0 },
    scrollbarWidth: "none"
  }),
  truncate,
  viewStyle: css({
    alignItems: "stretch",
    borderWidth: 0,
    borderStyle: "solid",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    outline: "none",
    minHeight: 0,
    minWidth: 0
  }),
  pageContent: css({
    paddingTop: tokens.space32,
    paddingBottom: tokens.space32,
    paddingLeft: tokens.space16,
    paddingRight: tokens.space16,
    maxWidth: 1080,
    marginLeft: "auto",
    marginRight: "auto",
    [`@media screen and (min-width: ${BREAKPOINTS.tabletMax}px) `]: {
      paddingTop: tokens.space64,
      paddingBottom: tokens.space64,
      paddingLeft: tokens.space32,
      paddingRight: tokens.space32
    }
  })
};

// rui2/View.tsx
import {
  forwardRef
} from "react";
import { jsx } from "@emotion/react/jsx-runtime";
function View({
  tag: TagElt = "div",
  innerRef,
  dataCy,
  ...props
}) {
  return /* @__PURE__ */ jsx(TagElt, {
    ref: innerRef,
    css: rcss.viewStyle,
    "data-cy": dataCy,
    ...props
  });
}
var SpecializedView = {
  a: forwardRef(function Anchor({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("a", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  button: forwardRef(function Button({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("button", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  div: forwardRef(function Div({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("div", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  h1: forwardRef(function Heading({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("h1", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  h2: forwardRef(function Heading2({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("h2", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  h3: forwardRef(function Heading3({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("h3", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  img: forwardRef(function Image({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("img", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  label: forwardRef(function Label({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("label", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  li: forwardRef(function LI({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("li", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  nav: forwardRef(function Div2({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("nav", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  ol: forwardRef(function OList({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("ol", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  p: forwardRef(function Paragraph({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("p", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  span: forwardRef(function Span({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("span", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  svg: forwardRef(function VG({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("svg", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  ul: forwardRef(function UList({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("ul", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  input: forwardRef(function Input({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("input", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  textarea: forwardRef(function TextArea({ dataCy, ...props }, ref) {
    return /* @__PURE__ */ jsx("textarea", {
      ref,
      css: rcss.viewStyle,
      "data-cy": dataCy,
      ...props
    });
  }),
  form: forwardRef(function Form(props, ref) {
    return /* @__PURE__ */ jsx("form", {
      ref,
      css: rcss.viewStyle,
      "data-cy": props.dataCy,
      ...props
    });
  })
};

// rui2/Interactive.tsx
var Interactive_exports = {};
__export(Interactive_exports, {
  focusRing: () => focusRing,
  interactive: () => interactive,
  interactiveTokens: () => interactiveTokens,
  interactiveVars: () => interactiveVars
});
var interactiveTokens = {
  interactiveBackground: "--interactive-background",
  interactiveBackgroundActive: "--interactive-background--active",
  interactiveBorder: "--interactive-border",
  interactiveBorderHover: "--interactive-border--hover"
};
var interactiveVars = {
  interactiveBackground: `var(${interactiveTokens.interactiveBackground})`,
  interactiveBackgroundActive: `var(${interactiveTokens.interactiveBackgroundActive})`,
  interactiveBorder: `var(${interactiveTokens.interactiveBorder})`,
  interactiveBorderHover: `var(${interactiveTokens.interactiveBorderHover})`
};
var borderActive = tokens.accentPrimaryDefault;
var focusRing = {
  ":focus": {
    boxShadow: "0 0 0 2px " + borderActive,
    outline: "2px solid transparent",
    outlineOffset: "4px",
    ":not(:focus-visible)": {
      outline: "none",
      boxShadow: "none"
    }
  }
};
var interactive = {
  nofill: {
    transitionProperty: "background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": {
      ...focusRing,
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: interactiveVars.interactiveBackground
        }
      },
      ":not(textarea):active": {
        backgroundColor: interactiveVars.interactiveBackground,
        borderColor: borderActive
      }
    }
  },
  filled: {
    transitionProperty: "background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": {
      ...focusRing,
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: interactiveVars.interactiveBackgroundActive
        }
      },
      ":active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: borderActive
      }
    }
  },
  outlined: {
    transitionProperty: "background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: interactiveVars.interactiveBorder,
    ":not([disabled])": {
      ...focusRing,
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: interactiveVars.interactiveBackground
        }
      },
      ":not(textarea):active": {
        borderColor: borderActive
      }
    }
  },
  filledAndOutlined: {
    transitionProperty: "border-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": {
      borderColor: interactiveVars.interactiveBorder,
      ...focusRing,
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          borderColor: interactiveVars.interactiveBorderHover
        }
      },
      ":not(textarea):active": {
        borderColor: borderActive,
        transition: "none"
      }
    }
  },
  listItem: {
    transitionProperty: "box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    ":not([disabled])": {
      ...focusRing,
      cursor: "pointer",
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: interactiveVars.interactiveBackground
        }
      },
      ":not(textarea):active": {
        backgroundColor: interactiveVars.interactiveBackgroundActive,
        borderColor: borderActive
      }
    }
  }
};

// ui/icons/Icon.tsx
import { jsx as jsx2, jsxs } from "@emotion/react/jsx-runtime";
function Icon({
  size = 16,
  rotate: rotate2 = 0,
  color = "currentColor",
  style,
  children,
  alt,
  viewBox,
  ...rest
}) {
  return /* @__PURE__ */ jsxs("svg", {
    preserveAspectRatio: "xMidYMin",
    width: size,
    height: size,
    viewBox: viewBox ? viewBox : "0 0 24 24",
    fill: color,
    style: { ...style, verticalAlign: "middle" },
    "aria-hidden": !alt,
    css: [
      {
        minWidth: size,
        minHeight: size
      },
      rotate2 && {
        transform: `rotate(${rotate2}deg);`
      }
    ],
    ...rest,
    children: [
      alt ? /* @__PURE__ */ jsx2("title", {
        children: alt
      }) : null,
      children
    ]
  });
}

// ui/icons/ChevronUp.tsx
import { jsx as jsx3 } from "@emotion/react/jsx-runtime";
function ChevronUpIcon(props) {
  return /* @__PURE__ */ jsx3(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx3("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M11.4697 8.46967C11.7626 8.17678 12.2374 8.17678 12.5303 8.46967L18.5303 14.4697C18.8232 14.7626 18.8232 15.2374 18.5303 15.5303C18.2374 15.8232 17.7626 15.8232 17.4697 15.5303L12 10.0607L6.53033 15.5303C6.23744 15.8232 5.76256 15.8232 5.46967 15.5303C5.17678 15.2374 5.17678 14.7626 5.46967 14.4697L11.4697 8.46967Z"
    })
  });
}

// ui/media.ts
var screenMediaForMaxWidth = (bp) => `@media screen and (max-width: ${BREAKPOINTS[bp]}px)`;

// ../node_modules/.pnpm/react-uid@2.3.2_q5o373oqrklnndq2vhekyuzhxi/node_modules/react-uid/dist/es2015/uid.js
var generateUID = function() {
  var counter2 = 1;
  var map = /* @__PURE__ */ new WeakMap();
  var uid2 = function(item, index) {
    if (typeof item === "number" || typeof item === "string") {
      return index ? "idx-" + index : "val-" + item;
    }
    if (!map.has(item)) {
      map.set(item, counter2++);
      return uid2(item);
    }
    return "uid" + map.get(item);
  };
  return uid2;
};
var uid = generateUID();

// ../node_modules/.pnpm/react-uid@2.3.2_q5o373oqrklnndq2vhekyuzhxi/node_modules/react-uid/dist/es2015/context.js
import * as React from "react";
var createSource = function(prefix) {
  if (prefix === void 0) {
    prefix = "";
  }
  return {
    value: 1,
    prefix,
    uid: generateUID()
  };
};
var counter = createSource();
var source = React.createContext(createSource());
var getId = function(source2) {
  return source2.value++;
};
var getPrefix = function(source2) {
  return source2 ? source2.prefix : "";
};

// ../node_modules/.pnpm/react-uid@2.3.2_q5o373oqrklnndq2vhekyuzhxi/node_modules/react-uid/dist/es2015/hooks.js
import * as React2 from "react";
var generateUID2 = function(context) {
  var quartz = context || counter;
  var prefix = getPrefix(quartz);
  var id = getId(quartz);
  var uid2 = prefix + id;
  var gen = function(item) {
    return uid2 + quartz.uid(item);
  };
  return { uid: uid2, gen };
};
var useUIDState = function() {
  if (true) {
    if (!("useContext" in React2)) {
      throw new Error("Hooks API requires React 16.8+");
    }
  }
  return React2.useState(generateUID2(React2.useContext(source)));
};
var useUID = function() {
  var uid2 = useUIDState()[0].uid;
  return uid2;
};
var useUIDSeed = function() {
  var gen = useUIDState()[0].gen;
  return gen;
};

// rui2/AccordionItem.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "@emotion/react/jsx-runtime";
var getToggleAttributes = ({
  uuid,
  isExpanded
}) => ({
  role: "button",
  tag: "button",
  ["aria-expanded"]: isExpanded,
  id: `${"AccordionControl" + uuid}`,
  ["aria-controls"]: `${"AccordionContent" + uuid}`,
  type: "button"
});
var AccordionToggle = ({ toggleOn, uuid, onClick, isExpanded, children, ...rest }) => {
  const toggleAttributes = React3.useMemo(
    () => getToggleAttributes({
      uuid,
      isExpanded
    }),
    [uuid, isExpanded]
  );
  return /* @__PURE__ */ jsx4(View, {
    ...toggleOn ? {
      css: [rcss.reset.button, interactive.listItem],
      onClick,
      ...toggleAttributes,
      ...rest
    } : rest,
    children
  });
};
function AccordionItem({
  className,
  children,
  headerContent,
  expanded = false,
  variant = "default",
  chevron = "end",
  toggleOn = "header",
  onClick,
  round: round2 = true
}) {
  const uuid = useUID();
  const [isExpanded, setExpanded] = React3.useState(expanded);
  const toggle = () => {
    if (onClick) {
      onClick();
    }
    setExpanded(!isExpanded);
  };
  const iconSize = variant === "large" ? 24 : void 0;
  const padding = variant === "large" ? [
    rcss.py(16),
    rcss.px(24),
    { [screenMediaForMaxWidth("mobileMax")]: [rcss.p(16)] }
  ] : [rcss.p(4)];
  const toggleAttributes = React3.useMemo(
    () => getToggleAttributes({
      uuid,
      isExpanded
    }),
    [uuid, isExpanded]
  );
  return /* @__PURE__ */ jsxs2(View, {
    css: [rcss.flex.column],
    className,
    children: [
      /* @__PURE__ */ jsx4(View, {
        role: "heading",
        "aria-level": 4,
        children: /* @__PURE__ */ jsxs2(AccordionToggle, {
          css: [
            rcss.display.flex,
            rcss.flex.row,
            rcss.justify.spaceBetween,
            rcss.align.stretch,
            padding,
            [round2 ? [rcss.borderRadius(4)] : [rcss.borderRadius(0)]]
          ],
          toggleOn: toggleOn === "header",
          uuid,
          onClick: toggle,
          isExpanded,
          children: [
            chevron === "start" && /* @__PURE__ */ jsx4(AccordionToggle, {
              css: [rcss.px(4), rcss.justify.center],
              toggleOn: toggleOn === "chevron",
              uuid,
              onClick: toggle,
              isExpanded,
              children: /* @__PURE__ */ jsx4(ChevronUpIcon, {
                size: iconSize,
                rotate: isExpanded ? 0 : 180,
                css: [rcss.transition.snappy]
              })
            }),
            typeof headerContent === "function" ? headerContent({
              isExpanded,
              toggle,
              toggleAttributes
            }) : headerContent,
            chevron === "end" && /* @__PURE__ */ jsx4(AccordionToggle, {
              css: [rcss.px(4), rcss.justify.center],
              toggleOn: toggleOn === "chevron",
              uuid,
              onClick: toggle,
              isExpanded,
              children: /* @__PURE__ */ jsx4(ChevronUpIcon, {
                size: iconSize,
                rotate: isExpanded ? 0 : 180,
                css: [rcss.transition.snappy]
              })
            })
          ]
        })
      }),
      isExpanded ? /* @__PURE__ */ jsx4(View, {
        "aria-labelledby": "AccordionControl" + uuid,
        id: "AccordionContent" + uuid,
        children
      }) : null
    ]
  });
}

// rui2/Button.tsx
import * as React5 from "react";

// rui2/Colorway.tsx
var Colorway_exports = {};
__export(Colorway_exports, {
  colormap: () => colormap,
  filledAndOutlined: () => filledAndOutlined,
  filledInteractive: () => filledInteractive,
  filledStatic: () => filledStatic,
  nofill: () => nofill,
  outlined: () => outlined
});
var colormap = {
  primary: {
    dimmest: tokens.accentPrimaryDimmest,
    dimmer: tokens.accentPrimaryDimmer,
    default: tokens.accentPrimaryDefault,
    stronger: tokens.accentPrimaryStronger,
    strongest: tokens.accentPrimaryStrongest
  },
  positive: {
    dimmest: tokens.accentPositiveDimmest,
    dimmer: tokens.accentPositiveDimmer,
    default: tokens.accentPositiveDefault,
    stronger: tokens.accentPositiveStronger,
    strongest: tokens.accentPositiveStrongest
  },
  negative: {
    dimmest: tokens.accentNegativeDimmest,
    dimmer: tokens.accentNegativeDimmer,
    default: tokens.accentNegativeDefault,
    stronger: tokens.accentNegativeStronger,
    strongest: tokens.accentNegativeStrongest
  },
  warning: {
    dimmest: tokens.orangeDimmest,
    dimmer: tokens.orangeDimmer,
    default: tokens.orangeDefault,
    stronger: tokens.orangeStronger,
    strongest: tokens.orangeStrongest
  },
  red: {
    dimmest: tokens.redDimmest,
    dimmer: tokens.redDimmer,
    default: tokens.redDefault,
    stronger: tokens.redStronger,
    strongest: tokens.redStrongest
  },
  orange: {
    dimmest: tokens.orangeDimmest,
    dimmer: tokens.orangeDimmer,
    default: tokens.orangeDefault,
    stronger: tokens.orangeStronger,
    strongest: tokens.orangeStrongest
  },
  yellow: {
    dimmest: tokens.yellowDimmest,
    dimmer: tokens.yellowDimmer,
    default: tokens.yellowDefault,
    stronger: tokens.yellowStronger,
    strongest: tokens.yellowStrongest
  },
  green: {
    dimmest: tokens.greenDimmest,
    dimmer: tokens.greenDimmer,
    default: tokens.greenDefault,
    stronger: tokens.greenStronger,
    strongest: tokens.greenStrongest
  },
  teal: {
    dimmest: tokens.tealDimmest,
    dimmer: tokens.tealDimmer,
    default: tokens.tealDefault,
    stronger: tokens.tealStronger,
    strongest: tokens.tealStrongest
  },
  blue: {
    dimmest: tokens.blueDimmest,
    dimmer: tokens.blueDimmer,
    default: tokens.blueDefault,
    stronger: tokens.blueStronger,
    strongest: tokens.blueStrongest
  },
  blurple: {
    dimmest: tokens.blurpleDimmest,
    dimmer: tokens.blurpleDimmer,
    default: tokens.blurpleDefault,
    stronger: tokens.blurpleStronger,
    strongest: tokens.blurpleStrongest
  },
  purple: {
    dimmest: tokens.purpleDimmest,
    dimmer: tokens.purpleDimmer,
    default: tokens.purpleDefault,
    stronger: tokens.purpleStronger,
    strongest: tokens.purpleStrongest
  },
  magenta: {
    dimmest: tokens.magentaDimmest,
    dimmer: tokens.magentaDimmer,
    default: tokens.magentaDefault,
    stronger: tokens.magentaStronger,
    strongest: tokens.magentaStrongest
  },
  pink: {
    dimmest: tokens.pinkDimmest,
    dimmer: tokens.pinkDimmer,
    default: tokens.pinkDefault,
    stronger: tokens.pinkStronger,
    strongest: tokens.pinkStrongest
  },
  grey: {
    dimmest: tokens.greyDimmest,
    dimmer: tokens.greyDimmer,
    default: tokens.greyDefault,
    stronger: tokens.greyStronger,
    strongest: tokens.greyStrongest
  }
};
function nofill(colorway) {
  const { dimmer, stronger, strongest } = colormap[colorway];
  return {
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: 1,
    "&": {
      color: stronger
    },
    ":disabled": {
      color: dimmer
    },
    ":not([disabled])": {
      ":hover": {
        color: strongest,
        backgroundColor: dimmer
      },
      ":focus": {
        color: strongest,
        boxShadow: "0 0 0 2px " + strongest,
        ":not(:focus-visible)": {
          boxShadow: "none"
        }
      },
      ":active": {
        transition: "none",
        color: strongest,
        backgroundColor: dimmer,
        borderColor: strongest
      }
    }
  };
}
function outlined(colorway) {
  const {
    dimmest,
    dimmer,
    default: dflt,
    stronger,
    strongest
  } = colormap[colorway];
  return {
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderColor: dimmer,
    borderWidth: 1,
    "&": {
      color: stronger
    },
    ":disabled": {
      color: dimmer
    },
    ":not([disabled])": {
      "@media (hover: hover)": {
        ":hover": {
          color: strongest,
          borderColor: dflt,
          backgroundColor: dimmer
        }
      },
      ":focus": {
        color: strongest,
        boxShadow: "0 0 0 2px " + strongest,
        ":not(:focus-visible)": {
          boxShadow: "none"
        }
      },
      ":active": {
        transition: "none",
        color: strongest,
        backgroundColor: dimmest,
        borderColor: strongest
      }
    }
  };
}
function filledStatic(colorway) {
  const { dimmer } = colormap[colorway];
  return {
    transitionProperty: "background-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "transparent",
    "&": {
      color: tokens.foregroundDefault,
      backgroundColor: dimmer,
      boxShadow: "none"
    }
  };
}
function filledInteractive(colorway) {
  const { dimmest, default: dflt, stronger, strongest } = colormap[colorway];
  return {
    ...filledStatic(colorway),
    ":disabled": {
      backgroundColor: dimmest,
      color: dflt
    },
    ":not([disabled])": {
      "@media (hover: hover)": {
        ":hover": {
          backgroundColor: dflt
        }
      },
      ":focus": {
        boxShadow: "0 0 0 2px " + stronger,
        ":not(:focus-visible)": {
          boxShadow: "none"
        }
      },
      ":active": {
        transition: "none",
        backgroundColor: dflt,
        borderColor: strongest
      }
    }
  };
}
function filledAndOutlined(colorway) {
  const {
    dimmest,
    dimmer,
    default: dflt,
    stronger,
    strongest
  } = colormap[colorway];
  return {
    transitionProperty: "border-color, box-shadow",
    transitionDuration: TRANSITIONS.duration,
    transitionTimingFunction: TRANSITIONS.timingFunction,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: dimmer,
    "&": {
      color: strongest,
      backgroundColor: dimmest,
      boxShadow: "none"
    },
    ":disabled": {
      backgroundColor: dimmest,
      color: dflt
    },
    ":not([disabled])": {
      ":hover": {
        borderColor: strongest
      },
      ":focus": {
        boxShadow: "0 0 0 2px " + stronger,
        ":not(:focus-visible)": {
          boxShadow: "none"
        }
      },
      ":active": {
        transition: "none",
        backgroundColor: dimmer,
        borderColor: dflt
      }
    }
  };
}

// rui2/Text.tsx
import * as React4 from "react";
import { css as css2 } from "@emotion/react";
import { jsx as jsx5 } from "@emotion/react/jsx-runtime";
var defaults = css2({
  display: "inline",
  overflowWrap: "break-word"
});
var variants = {
  text: css2({
    fontSize: tokens.fontSizeDefault,
    lineHeight: tokens.lineHeightDefault
  }),
  small: css2({
    fontSize: tokens.fontSizeSmall,
    lineHeight: tokens.lineHeightSmall
  }),
  headerBig: css2({
    fontSize: tokens.fontSizeHeaderBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderBig
  }),
  headerDefault: css2({
    fontSize: tokens.fontSizeHeaderDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderDefault
  }),
  subheadBig: css2({
    fontSize: tokens.fontSizeSubheadBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadBig
  }),
  subheadDefault: css2({
    fontSize: tokens.fontSizeSubheadDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadDefault
  })
};
var colors = {
  default: void 0,
  dimmer: rcss.color.foregroundDimmer,
  dimmest: rcss.color.foregroundDimmest
};
var lineClamp = (n) => css2({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: n,
  WebkitBoxOrient: "vertical"
});
function textCss(variant, color, multiline, maxLines) {
  return css2([
    defaults,
    variants[variant],
    color != null && colors[color],
    !multiline && !maxLines && rcss.truncate,
    maxLines && lineClamp(maxLines)
  ]);
}
var SpanView = SpecializedView.span;
var HeaderViews = {
  1: SpecializedView.h1,
  2: SpecializedView.h2,
  3: SpecializedView.h3
};
var Header = React4.forwardRef(
  ({
    color,
    level,
    variant = "text",
    children,
    ...rest
  }, ref) => {
    const Component = HeaderViews[level];
    return /* @__PURE__ */ jsx5(Component, {
      ref,
      css: textCss(variant, color, true, void 0),
      ...rest,
      children
    });
  }
);
var Text = React4.forwardRef(
  ({
    color,
    multiline,
    maxLines,
    variant = "text",
    children,
    ...rest
  }, ref) => /* @__PURE__ */ jsx5(SpanView, {
    ref,
    ...rest,
    css: textCss(variant, color, multiline, maxLines),
    children
  })
);

// rui2/Button.tsx
import { Fragment, jsx as jsx6, jsxs as jsxs3 } from "@emotion/react/jsx-runtime";
var ButtonView = SpecializedView.button;
function buttonCss({
  disabled,
  outlined: outlined2,
  stretch,
  colorway,
  alignment,
  size
}) {
  return [
    rcss.rowWithGap(8),
    rcss.align[alignment ?? "center"],
    rcss.justify[alignment ?? "center"],
    rcss.reset.button,
    disabled && { color: tokens.foregroundDimmest },
    outlined2 ? interactive.outlined : interactive.filled,
    rcss.p(8),
    rcss.borderRadius(8),
    stretch && { alignSelf: "stretch" },
    colorway && (outlined2 ? outlined(colorway) : filledInteractive(colorway)),
    { height: size + 16 }
  ];
}
function getTextVariant({
  small,
  big
}) {
  if (big) {
    return "subheadDefault";
  }
  if (small) {
    return "small";
  }
  return "text";
}
function getIconSize({
  small,
  big
}) {
  if (big) {
    return 20;
  }
  if (small) {
    return 12;
  }
  return 16;
}
function ButtonContent({
  iconLeft,
  iconRight,
  text,
  secondaryText,
  iconSize,
  variant,
  alignment,
  small
}) {
  const buttonText = text ? /* @__PURE__ */ jsx6(Text, {
    variant,
    children: text
  }) : null;
  return /* @__PURE__ */ jsxs3(Fragment, {
    children: [
      iconLeft ? /* @__PURE__ */ jsxs3(View, {
        css: [
          rcss.flex.growAndShrink(1),
          rcss.align[alignment ?? "center"],
          rcss.justify[alignment ?? "center"],
          rcss.rowWithGap(small ? 4 : 8)
        ],
        children: [
          React5.cloneElement(iconLeft, { size: iconSize }),
          buttonText
        ]
      }) : buttonText,
      secondaryText && /* @__PURE__ */ jsx6(Text, {
        variant,
        color: "default",
        children: secondaryText
      }),
      iconRight && React5.cloneElement(iconRight, { size: iconSize })
    ]
  });
}
var Button2 = React5.forwardRef(
  ({
    colorway,
    disabled,
    iconLeft,
    iconRight,
    outlined: outlined2,
    small,
    big,
    stretch,
    text,
    secondaryText,
    alignment,
    type = "button",
    ...props
  }, ref) => {
    const variant = getTextVariant({ small, big });
    const iconSize = getIconSize({ small, big });
    const eltCss = buttonCss({
      disabled,
      outlined: outlined2,
      stretch,
      colorway,
      alignment,
      size: iconSize
    });
    return /* @__PURE__ */ jsx6(ButtonView, {
      type,
      ref,
      css: eltCss,
      disabled,
      ...props,
      children: /* @__PURE__ */ jsx6(ButtonContent, {
        text,
        secondaryText,
        iconLeft,
        iconRight,
        iconSize,
        variant,
        alignment
      })
    });
  }
);
Button2.displayName = "Button";
var Button_default = Button2;

// rui2/ButtonGroup.tsx
import * as React6 from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { jsx as jsx7, jsxs as jsxs4 } from "@emotion/react/jsx-runtime";
var ButtonGroupContext = React6.createContext(null);
function ButtonGroup({
  name,
  value,
  row,
  stretch,
  disabled,
  onChange,
  children,
  primary,
  tag = "fieldset",
  dataCy,
  ...props
}) {
  return /* @__PURE__ */ jsx7(View, {
    tag,
    ...props,
    "data-cy": dataCy,
    css: [
      rcss.borderRadius(8),
      {
        backgroundColor: interactiveVars.interactiveBackground
      },
      row && {
        display: "flex",
        flexDirection: "row",
        width: stretch ? "100%" : "min-content"
      },
      row && stretch && { justifyItems: "stretch" }
    ],
    children: /* @__PURE__ */ jsx7(ButtonGroupContext.Provider, {
      value: { value, name, onChange, primary, disabled },
      children
    })
  });
}
var Input2 = SpecializedView.input;

// ui/icons/Check.tsx
import { jsx as jsx8 } from "@emotion/react/jsx-runtime";
function CheckIcon(props) {
  return /* @__PURE__ */ jsx8(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx8("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M20.5303 5.46967C20.8232 5.76256 20.8232 6.23744 20.5303 6.53033L9.53033 17.5303C9.23744 17.8232 8.76256 17.8232 8.46967 17.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697C3.76256 11.1768 4.23744 11.1768 4.53033 11.4697L9 15.9393L19.4697 5.46967C19.7626 5.17678 20.2374 5.17678 20.5303 5.46967Z"
    })
  });
}

// rui2/Checkbox.tsx
import { jsx as jsx9, jsxs as jsxs5 } from "@emotion/react/jsx-runtime";
var Input3 = SpecializedView.input;
function Checkbox({
  checked,
  onChange,
  required,
  disabled,
  name,
  id
}) {
  return /* @__PURE__ */ jsxs5(View, {
    css: [rcss.justify.center, rcss.align.center, rcss.position.relative],
    children: [
      /* @__PURE__ */ jsx9(Input3, {
        type: "checkbox",
        checked,
        required,
        onChange: (e) => {
          if (onChange) {
            onChange(e);
          }
        },
        css: [
          interactive.filledAndOutlined,
          {
            appearance: "none",
            width: 20,
            height: 20,
            borderRadius: tokens.borderRadius4
          }
        ],
        disabled,
        name,
        id
      }),
      checked ? /* @__PURE__ */ jsx9(CheckIcon, {
        css: [{ position: "absolute", pointerEvents: "none" }]
      }) : null
    ]
  });
}

// rui2/DetailedInput.tsx
import { css as css5 } from "@emotion/react";
import React8 from "react";

// rui2/Input.tsx
import React7 from "react";
import { css as css3 } from "@emotion/react";
import { jsx as jsx10 } from "@emotion/react/jsx-runtime";
var inputCss = css3([
  interactive.filledAndOutlined,
  rcss.px(8),
  rcss.py(4),
  rcss.flex.growAndShrink(1),
  rcss.color.foregroundDefault,
  {
    outline: "0 none",
    fontSize: tokens.fontSizeDefault,
    lineHeight: "22px",
    fontFamily: tokens.fontFamilyDefault,
    "&::placeholder": [rcss.color.foregroundDimmest],
    "&:not([disabled])": { cursor: "text" }
  }
]);
var InputView = SpecializedView.input;
var Input4 = React7.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx10(InputView, {
    ...props,
    ref,
    css: inputCss
  })
);
var Input_default = Input4;
var TextareaView = SpecializedView.textarea;
var MultiLineInput = React7.forwardRef((props, ref) => /* @__PURE__ */ jsx10(TextareaView, {
  ...props,
  ref,
  css: inputCss
}));

// ui/icons/Loading.tsx
import { css as css4, keyframes } from "@emotion/react";

// ui/icons/Loader.tsx
import { jsx as jsx11 } from "@emotion/react/jsx-runtime";
function LoaderIcon(props) {
  return /* @__PURE__ */ jsx11(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx11("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3C12.75 3.41421 12.4142 3.75 12 3.75Z"
    })
  });
}

// ui/icons/Loading.tsx
import { jsx as jsx12 } from "@emotion/react/jsx-runtime";
var rotation = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(359deg)" }
});
var rotate = css4({
  animation: `${rotation} 1s linear infinite`
});
function LoadingIcon(props) {
  return /* @__PURE__ */ jsx12(LoaderIcon, {
    ...props,
    css: rotate
  });
}

// ui/icons/Exclamation.tsx
import { jsx as jsx13 } from "@emotion/react/jsx-runtime";
function ExclamationIcon(props) {
  return /* @__PURE__ */ jsx13(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx13("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V15.5C12.75 15.9142 12.4142 16.25 12 16.25C11.5858 16.25 11.25 15.9142 11.25 15.5V3C11.25 2.58579 11.5858 2.25 12 2.25ZM10.25 21C10.25 20.0335 11.0335 19.25 12 19.25C12.9665 19.25 13.75 20.0335 13.75 21C13.75 21.9665 12.9665 22.75 12 22.75C11.0335 22.75 10.25 21.9665 10.25 21Z"
    })
  });
}

// ui/icons/Warning.tsx
import { jsx as jsx14 } from "@emotion/react/jsx-runtime";
function WarningIcon(props) {
  return /* @__PURE__ */ jsx14(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx14("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M10.5792 3.125C11.2528 1.95833 12.9367 1.95833 13.6103 3.125L22.7036 18.875C23.3772 20.0417 22.5352 21.5 21.188 21.5H3.00151C1.65436 21.5 0.812393 20.0417 1.48597 18.875L10.5792 3.125ZM12.3113 3.875C12.2151 3.70833 11.9745 3.70833 11.8783 3.875L2.78501 19.625C2.68878 19.7917 2.80906 20 3.00151 20H21.188C21.3805 20 21.5008 19.7917 21.4046 19.625L12.3113 3.875ZM12.043 8.35254C12.4572 8.35254 12.793 8.68833 12.793 9.10254V13.1025C12.793 13.5168 12.4572 13.8525 12.043 13.8525C11.6288 13.8525 11.293 13.5168 11.293 13.1025V9.10254C11.293 8.68833 11.6288 8.35254 12.043 8.35254ZM11.293 17.1025C11.293 16.6883 11.6288 16.3525 12.043 16.3525H12.053C12.4672 16.3525 12.803 16.6883 12.803 17.1025C12.803 17.5168 12.4672 17.8525 12.053 17.8525H12.043C11.6288 17.8525 11.293 17.5168 11.293 17.1025Z"
    })
  });
}

// rui2/DetailedInput.tsx
import { jsx as jsx15, jsxs as jsxs6 } from "@emotion/react/jsx-runtime";
function toValidationState(field) {
  if (!field.touched && field.description) {
    return {
      state: "default",
      message: field.description
    };
  }
  if (field.error) {
    return {
      message: field.error.message,
      state: "error"
    };
  }
  if (field.warning) {
    return {
      message: field.warning.message,
      state: "warning"
    };
  }
  if (field.isValid) {
    return {
      message: field.successText || "",
      state: "success"
    };
  }
  if (!field.touched) {
    return;
  }
  return {
    message: "",
    state: "loading"
  };
}
var inputStyleMap = {
  success: css5({
    ":not([disabled])": {
      borderColor: tokens.accentPositiveStrongest
    }
  }),
  error: css5({
    ":not([disabled])": {
      borderColor: tokens.accentNegativeStrongest
    }
  }),
  warning: css5({
    ":not([disabled])": {
      borderColor: tokens.yellowStrongest
    }
  }),
  default: void 0,
  loading: void 0
};
var validationStyleMap = {
  success: css5([
    {
      color: tokens.accentPositiveStrongest
    }
  ]),
  error: css5([
    {
      color: tokens.accentNegativeStrongest
    }
  ]),
  warning: css5([
    {
      color: tokens.yellowStrongest
    }
  ]),
  default: void 0,
  loading: void 0
};
var validationIconMap = {
  success: /* @__PURE__ */ jsx15(CheckIcon, {}),
  error: /* @__PURE__ */ jsx15(ExclamationIcon, {}),
  warning: /* @__PURE__ */ jsx15(WarningIcon, {}),
  default: void 0,
  loading: /* @__PURE__ */ jsx15(LoadingIcon, {})
};
var Validation = (props) => {
  const Icon2 = validationIconMap[props.state];
  return /* @__PURE__ */ jsxs6(View, {
    css: [validationStyleMap[props.state], rcss.rowWithGap(4)],
    children: [
      React8.isValidElement(Icon2) ? React8.cloneElement(Icon2, {
        size: 12
      }) : null,
      /* @__PURE__ */ jsx15(Text, {
        variant: "small",
        children: props.message
      })
    ]
  });
};
var grid = css5`
  display: grid;
  grid-gap: ${tokens.space8};
  grid-template-areas:
    'label . status'
    'input input input'
    'validation validation validation'
    'details details details';
  > .label {
    grid-area: label;
  }
  > .status {
    grid-area: status;
  }
  > .input {
    grid-area: input;
  }
  > .details {
    grid-area: details;
  }
  > .validation {
    grid-area: validation;
  }
`;
var DetailedInput = ({
  id: _id,
  label,
  status,
  description,
  "aria-describedby": _describedBy,
  error,
  isValid,
  touched,
  value,
  warning: warning2,
  successText,
  ...props
}) => {
  const seed = useUIDSeed();
  const id = _id || seed("input");
  const statusId = status && seed("status");
  const descriptionId = description ? seed("description") : void 0;
  const describedBy = [statusId, descriptionId, _describedBy].filter(Boolean).join(" ");
  const validationState = toValidationState({
    description,
    error,
    isValid,
    touched,
    value,
    warning: warning2,
    successText
  });
  return /* @__PURE__ */ jsxs6("div", {
    css: grid,
    children: [
      /* @__PURE__ */ jsx15("label", {
        htmlFor: id,
        className: "label",
        children: /* @__PURE__ */ jsx15(Text, {
          variant: "small",
          color: "dimmer",
          children: label
        })
      }),
      status ? /* @__PURE__ */ jsx15(Text, {
        variant: "small",
        color: "dimmer",
        css: [rcss.textAlign.right],
        className: "status",
        children: status
      }) : null,
      /* @__PURE__ */ jsx15(Input_default, {
        id,
        className: "input",
        value,
        css: [inputStyleMap[validationState?.state || "default"]],
        ...props,
        "aria-describedby": describedBy,
        "aria-invalid": validationState?.state === "error"
      }),
      /* @__PURE__ */ jsx15("div", {
        id: descriptionId,
        className: "validation",
        css: [validationStyleMap[validationState?.state || "default"]],
        "aria-live": validationState?.state !== "default" ? "polite" : void 0,
        children: validationState ? /* @__PURE__ */ jsx15(Validation, {
          ...validationState
        }) : null
      })
    ]
  });
};

// rui2/IconButton.tsx
import * as React11 from "react";
import { useButton } from "@react-aria/button";
import { mergeProps as mergeProps2 } from "@react-aria/utils";

// lib/mergeRefs.ts
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
}

// rui2/Tooltip.tsx
import { useState as useState7 } from "react";
import { css as css6 } from "@emotion/react";
import { useTooltip, useTooltipTrigger } from "@react-aria/tooltip";
import { mergeProps } from "@react-aria/utils";

// ../node_modules/.pnpm/@react-stately+tooltip@3.2.4_react@17.0.2/node_modules/@react-stately/tooltip/dist/module.js
import { useMemo as $1OhDq$useMemo, useRef as $1OhDq$useRef, useEffect as $1OhDq$useEffect } from "react";

// ../node_modules/.pnpm/@react-stately+utils@3.5.2_react@17.0.2/node_modules/@react-stately/utils/dist/module.js
import { useState as $6imuh$useState, useRef as $6imuh$useRef, useCallback as $6imuh$useCallback } from "react";
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {
  let [stateValue, setStateValue] = (0, $6imuh$useState)(value || defaultValue);
  let ref = (0, $6imuh$useRef)(value !== void 0);
  let wasControlled = ref.current;
  let isControlled = value !== void 0;
  let stateRef = (0, $6imuh$useRef)(stateValue);
  if (wasControlled !== isControlled)
    console.warn(`WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`);
  ref.current = isControlled;
  let setValue = (0, $6imuh$useCallback)((value2, ...args) => {
    let onChangeCaller = (value3, ...onChangeArgs) => {
      if (onChange) {
        if (!Object.is(stateRef.current, value3))
          onChange(value3, ...onChangeArgs);
      }
      if (!isControlled)
        stateRef.current = value3;
    };
    if (typeof value2 === "function") {
      console.warn("We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320");
      let updateFunction = (oldValue, ...functionArgs) => {
        let interceptedValue = value2(isControlled ? stateRef.current : oldValue, ...functionArgs);
        onChangeCaller(interceptedValue, ...args);
        if (!isControlled)
          return interceptedValue;
        return oldValue;
      };
      setStateValue(updateFunction);
    } else {
      if (!isControlled)
        setStateValue(value2);
      onChangeCaller(value2, ...args);
    }
  }, [
    isControlled,
    onChange
  ]);
  if (isControlled)
    stateRef.current = value;
  else
    value = stateValue;
  return [
    value,
    setValue
  ];
}

// ../node_modules/.pnpm/@react-stately+overlays@3.4.4_react@17.0.2/node_modules/@react-stately/overlays/dist/module.js
function $fc909762b330b746$export$61c6a8c84e605fb6(props) {
  let [isOpen, setOpen] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)(props.isOpen, props.defaultOpen || false, props.onOpenChange);
  return {
    isOpen,
    setOpen,
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    },
    toggle() {
      setOpen(!isOpen);
    }
  };
}

// ../node_modules/.pnpm/@react-stately+tooltip@3.2.4_react@17.0.2/node_modules/@react-stately/tooltip/dist/module.js
var $8796f90736e175cb$var$TOOLTIP_DELAY = 1500;
var $8796f90736e175cb$var$TOOLTIP_COOLDOWN = 500;
var $8796f90736e175cb$var$tooltips = {};
var $8796f90736e175cb$var$tooltipId = 0;
var $8796f90736e175cb$var$globalWarmedUp = false;
var $8796f90736e175cb$var$globalWarmUpTimeout = null;
var $8796f90736e175cb$var$globalCooldownTimeout = null;
function $8796f90736e175cb$export$4d40659c25ecb50b(props = {}) {
  let { delay = $8796f90736e175cb$var$TOOLTIP_DELAY } = props;
  let { isOpen, open, close } = (0, $fc909762b330b746$export$61c6a8c84e605fb6)(props);
  let id = (0, $1OhDq$useMemo)(() => `${++$8796f90736e175cb$var$tooltipId}`, []);
  let closeTimeout = (0, $1OhDq$useRef)();
  let ensureTooltipEntry = () => {
    $8796f90736e175cb$var$tooltips[id] = hideTooltip;
  };
  let closeOpenTooltips = () => {
    for (let hideTooltipId in $8796f90736e175cb$var$tooltips)
      if (hideTooltipId !== id) {
        $8796f90736e175cb$var$tooltips[hideTooltipId](true);
        delete $8796f90736e175cb$var$tooltips[hideTooltipId];
      }
  };
  let showTooltip = () => {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = null;
    closeOpenTooltips();
    ensureTooltipEntry();
    $8796f90736e175cb$var$globalWarmedUp = true;
    open();
    if ($8796f90736e175cb$var$globalWarmUpTimeout) {
      clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);
      $8796f90736e175cb$var$globalWarmUpTimeout = null;
    }
    if ($8796f90736e175cb$var$globalCooldownTimeout) {
      clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);
      $8796f90736e175cb$var$globalCooldownTimeout = null;
    }
  };
  let hideTooltip = (immediate) => {
    if (immediate) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
      close();
    } else if (!closeTimeout.current)
      closeTimeout.current = setTimeout(() => {
        closeTimeout.current = null;
        close();
      }, $8796f90736e175cb$var$TOOLTIP_COOLDOWN);
    if ($8796f90736e175cb$var$globalWarmUpTimeout) {
      clearTimeout($8796f90736e175cb$var$globalWarmUpTimeout);
      $8796f90736e175cb$var$globalWarmUpTimeout = null;
    }
    if ($8796f90736e175cb$var$globalWarmedUp) {
      if ($8796f90736e175cb$var$globalCooldownTimeout)
        clearTimeout($8796f90736e175cb$var$globalCooldownTimeout);
      $8796f90736e175cb$var$globalCooldownTimeout = setTimeout(() => {
        delete $8796f90736e175cb$var$tooltips[id];
        $8796f90736e175cb$var$globalCooldownTimeout = null;
        $8796f90736e175cb$var$globalWarmedUp = false;
      }, $8796f90736e175cb$var$TOOLTIP_COOLDOWN);
    }
  };
  let warmupTooltip = () => {
    closeOpenTooltips();
    ensureTooltipEntry();
    if (!isOpen && !$8796f90736e175cb$var$globalWarmUpTimeout && !$8796f90736e175cb$var$globalWarmedUp)
      $8796f90736e175cb$var$globalWarmUpTimeout = setTimeout(() => {
        $8796f90736e175cb$var$globalWarmUpTimeout = null;
        $8796f90736e175cb$var$globalWarmedUp = true;
        showTooltip();
      }, delay);
    else if (!isOpen)
      showTooltip();
  };
  (0, $1OhDq$useEffect)(() => {
    return () => {
      clearTimeout(closeTimeout.current);
      let tooltip = $8796f90736e175cb$var$tooltips[id];
      if (tooltip)
        delete $8796f90736e175cb$var$tooltips[id];
    };
  }, [
    id
  ]);
  return {
    isOpen,
    open: (immediate) => {
      if (!immediate && delay > 0 && !closeTimeout.current)
        warmupTooltip();
      else
        showTooltip();
    },
    close: hideTooltip
  };
}

// ../node_modules/.pnpm/react-popper@2.3.0_vov5yimr6vvxyufd6uigwwkst4/node_modules/react-popper/lib/esm/utils.js
import * as React9 from "react";
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React9.useLayoutEffect : React9.useEffect;

// ../node_modules/.pnpm/react-popper@2.3.0_vov5yimr6vvxyufd6uigwwkst4/node_modules/react-popper/lib/esm/usePopper.js
import * as React10 from "react";
import * as ReactDOM from "react-dom";

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css13 = getComputedStyle(currentNode);
    if (css13.transform !== "none" || css13.perspective !== "none" || css13.contain === "paint" || ["transform", "perspective"].indexOf(css13.willChange) !== -1 || isFirefox && css13.willChange === "filter" || isFirefox && css13.filter && css13.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = /* @__PURE__ */ new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// ../node_modules/.pnpm/@popperjs+core@2.11.6/node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// ../node_modules/.pnpm/react-popper@2.3.0_vov5yimr6vvxyufd6uigwwkst4/node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React10.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React10.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React10.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React10.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React10.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper2 = options.createPopper || createPopper;
    var popperInstance = createPopper2(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// ../node_modules/.pnpm/@reach+portal@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/portal/dist/reach-portal.esm.js
import { useState as useState5, useEffect as useEffect3, createElement, useRef as useRef2 } from "react";

// ../node_modules/.pnpm/@reach+utils@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/utils/use-isomorphic-layout-effect/dist/reach-utils-use-isomorphic-layout-effect.esm.js
import { useLayoutEffect as useLayoutEffect2, useEffect as useEffect2 } from "react";

// ../node_modules/.pnpm/@reach+utils@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/utils/can-use-dom/dist/reach-utils-can-use-dom.esm.js
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

// ../node_modules/.pnpm/@reach+utils@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/utils/use-isomorphic-layout-effect/dist/reach-utils-use-isomorphic-layout-effect.esm.js
var useIsomorphicLayoutEffect2 = /* @__PURE__ */ canUseDOM() ? useLayoutEffect2 : useEffect2;

// ../node_modules/.pnpm/@reach+utils@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/utils/use-force-update/dist/reach-utils-use-force-update.esm.js
import { useState as useState4, useCallback } from "react";
function useForceUpdate() {
  var _useState = useState4(/* @__PURE__ */ Object.create(null)), dispatch = _useState[1];
  return useCallback(function() {
    dispatch(/* @__PURE__ */ Object.create(null));
  }, []);
}

// ../node_modules/.pnpm/@reach+portal@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/portal/dist/reach-portal.esm.js
import { createPortal } from "react-dom";

// ../node_modules/.pnpm/tiny-warning@1.0.3/node_modules/tiny-warning/dist/tiny-warning.esm.js
var isProduction = false;
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {
    }
  }
}
var tiny_warning_esm_default = warning;

// ../node_modules/.pnpm/@reach+portal@0.17.0_sfoxds7t5ydpegc3knd667wn6m/node_modules/@reach/portal/dist/reach-portal.esm.js
function _objectWithoutPropertiesLoose(source2, excluded) {
  if (source2 == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source2[key];
  }
  return target;
}
var _excluded = ["unstable_skipInitialRender"];
var PortalImpl = function PortalImpl2(_ref) {
  var children = _ref.children, _ref$type = _ref.type, type = _ref$type === void 0 ? "reach-portal" : _ref$type, containerRef = _ref.containerRef;
  var mountNode = useRef2(null);
  var portalNode = useRef2(null);
  var forceUpdate = useForceUpdate();
  if (true) {
    useEffect3(function() {
      if (containerRef != null) {
        true ? tiny_warning_esm_default(typeof containerRef === "object" && "current" in containerRef, "@reach/portal: Invalid value passed to the `containerRef` of a `Portal`. The portal will be appended to the document body, but if you want to attach it to another DOM node you must pass a valid React ref object to `containerRef`.") : void 0;
        true ? tiny_warning_esm_default(containerRef ? containerRef.current != null : true, "@reach/portal: A ref was passed to the `containerRef` prop of a `Portal`, but no DOM node was attached to it. Be sure to pass the ref to a DOM component.\n\nIf you are forwarding the ref from another component, be sure to use the React.forwardRef API. See https://reactjs.org/docs/forwarding-refs.html.") : void 0;
      }
    }, [containerRef]);
  }
  useIsomorphicLayoutEffect2(function() {
    if (!mountNode.current)
      return;
    var ownerDocument = mountNode.current.ownerDocument;
    var body = (containerRef == null ? void 0 : containerRef.current) || ownerDocument.body;
    portalNode.current = ownerDocument == null ? void 0 : ownerDocument.createElement(type);
    body.appendChild(portalNode.current);
    forceUpdate();
    return function() {
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [type, forceUpdate, containerRef]);
  return portalNode.current ? /* @__PURE__ */ createPortal(children, portalNode.current) : /* @__PURE__ */ createElement("span", {
    ref: mountNode
  });
};
var Portal = function Portal2(_ref2) {
  var unstable_skipInitialRender = _ref2.unstable_skipInitialRender, props = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _React$useState = useState5(false), hydrated = _React$useState[0], setHydrated = _React$useState[1];
  useEffect3(function() {
    if (unstable_skipInitialRender) {
      setHydrated(true);
    }
  }, [unstable_skipInitialRender]);
  if (unstable_skipInitialRender && !hydrated) {
    return null;
  }
  return /* @__PURE__ */ createElement(PortalImpl, props);
};
if (true) {
  Portal.displayName = "Portal";
}
var reach_portal_esm_default = Portal;

// hooks/useRefState.ts
import { useCallback as useCallback2, useRef as useRef3, useState as useState6 } from "react";
function useRefState() {
  const [, setValue] = useState6(null);
  const ref = useRef3(null);
  const combinedRef = useCallback2((next) => {
    ref.current = next;
    setValue(next);
  }, []);
  return [ref, combinedRef];
}

// rui2/Tooltip.tsx
import { Fragment as Fragment2, jsx as jsx16, jsxs as jsxs7 } from "@emotion/react/jsx-runtime";
var tooltipDelayMap = {
  none: 0,
  default: 250,
  long: 1e3
};
var tooltipCss = css6({
  pointerEvents: "none",
  fontFamily: tokens.fontFamilyDefault
});
var tooltipContentCss = css6([
  {
    border: `1px solid ${tokens.outlineDimmer}`,
    borderRadius: tokens.borderRadius8,
    backgroundColor: tokens.backgroundHighest
  },
  rcss.p(8),
  rcss.shadow(1)
]);
var arrowCss = css6({
  display: "block",
  pointerEvents: "none",
  "&::after": {
    content: '""',
    display: "block",
    border: `1px solid ${tokens.outlineDimmer}`,
    borderTopLeftRadius: tokens.borderRadius4,
    background: tokens.backgroundHighest,
    width: 12,
    height: 12,
    clipPath: "polygon(0 0, 100% 0, 0 100%)"
  },
  '[data-popper-placement^="top"] > &': {
    bottom: -6,
    "&::after": {
      transform: "rotate(225deg)"
    }
  },
  '[data-popper-placement^="right"] > &': {
    left: -6,
    "&::after": {
      transform: "rotate(315deg)"
    }
  },
  '[data-popper-placement^="bottom"] > &': {
    top: -6,
    "&::after": {
      transform: "rotate(45deg)"
    }
  },
  '[data-popper-placement^="left"] > &': {
    right: -6,
    "&::after": {
      transform: "rotate(135deg)"
    }
  }
});
var SpanView2 = SpecializedView.span;
function TargetedTooltip({
  placement,
  state,
  strategy,
  target: referenceElt,
  tooltip,
  tooltipProps: passedTooltipProps,
  zIndex,
  borderColor,
  backgroundColor,
  maxWidth
}) {
  const [popperElt, setPopperElt] = useState7(null);
  const [arrowElt, setArrowElt] = useState7(null);
  const { styles: styles2, attributes } = usePopper(referenceElt, popperElt, {
    modifiers: [
      { name: "arrow", options: { element: arrowElt, padding: 8 } },
      { name: "offset", options: { offset: [0, 16] } }
    ],
    strategy,
    placement
  });
  const { tooltipProps } = useTooltip(passedTooltipProps, state);
  if (typeof window === "undefined") {
    return null;
  }
  return /* @__PURE__ */ jsx16(reach_portal_esm_default, {
    children: /* @__PURE__ */ jsxs7(SpanView2, {
      ...mergeProps(
        {
          ref: setPopperElt,
          style: styles2.popper,
          css: [tooltipCss, { zIndex, maxWidth: maxWidth ? maxWidth : 240 }]
        },
        attributes.popper || {},
        tooltipProps
      ),
      children: [
        /* @__PURE__ */ jsx16(SpanView2, {
          css: [tooltipContentCss, { borderColor, backgroundColor }],
          children: tooltip
        }),
        /* @__PURE__ */ jsx16("span", {
          ref: setArrowElt,
          style: styles2.arrow,
          css: [
            arrowCss,
            borderColor && {
              "&::after": {
                borderColor
              }
            },
            backgroundColor && { "&::after": { backgroundColor } }
          ]
        })
      ]
    })
  });
}
function Tooltip({
  children,
  defaultOpen,
  delay = "default",
  isDisabled,
  isOpen,
  onOpenChange,
  placement,
  strategy,
  tooltip,
  zIndex = ModalZIndex,
  borderColor = tokens.outlineDefault,
  maxWidth,
  backgroundColor
}) {
  const [ref, setRef] = useRefState();
  const tooltipTriggerOptions = {
    defaultOpen,
    delay: tooltipDelayMap[delay],
    isDisabled,
    isOpen,
    onOpenChange
  };
  const state = $8796f90736e175cb$export$4d40659c25ecb50b(tooltipTriggerOptions);
  const { triggerProps, tooltipProps } = useTooltipTrigger(
    tooltipTriggerOptions,
    state,
    ref
  );
  return /* @__PURE__ */ jsxs7(Fragment2, {
    children: [
      typeof children === "function" ? children(triggerProps, setRef) : /* @__PURE__ */ jsx16(SpanView2, {
        ...mergeProps({ ref: setRef }, triggerProps),
        children
      }),
      state.isOpen ? /* @__PURE__ */ jsx16(TargetedTooltip, {
        placement,
        state,
        strategy,
        target: ref.current,
        tooltip,
        tooltipProps,
        zIndex,
        borderColor,
        backgroundColor,
        maxWidth
      }) : null
    ]
  });
}

// rui2/IconButton.tsx
import { jsx as jsx17, jsxs as jsxs8 } from "@emotion/react/jsx-runtime";
var IconSizeMap = {
  18: 16,
  24: 16,
  28: 20,
  32: 24,
  36: 24,
  40: 24
};
var ButtonView2 = SpecializedView.button;
function IconButtonInner({
  alt,
  children,
  colorway,
  disabled,
  innerRef,
  onClick,
  size = 24,
  triggerProps,
  type,
  suffix,
  ...props
}) {
  const tooltipRef = React11.useRef(null);
  const { buttonProps } = useButton(
    {
      isDisabled: disabled,
      onPress: onClick,
      type,
      "aria-label": alt
    },
    tooltipRef
  );
  return /* @__PURE__ */ jsxs8(ButtonView2, {
    ...mergeProps2(
      {
        ref: mergeRefs(tooltipRef, innerRef),
        css: [
          rcss.reset.button,
          disabled && { color: tokens.foregroundDimmest },
          interactive.listItem,
          rcss.borderRadius(8),
          rcss.center,
          { width: size, height: size },
          colorway && nofill(colorway)
        ]
      },
      props,
      triggerProps,
      buttonProps
    ),
    children: [
      React11.cloneElement(children, { size: IconSizeMap[size] }),
      suffix
    ]
  });
}
var IconButton = React11.forwardRef(
  ({
    alt,
    tooltipDelay,
    tooltipHidden,
    tooltipPlacement,
    tooltipContents,
    tooltipZIndex,
    innerRef,
    ...props
  }, viewRef) => /* @__PURE__ */ jsx17(View, {
    innerRef: viewRef,
    children: /* @__PURE__ */ jsx17(Tooltip, {
      delay: tooltipDelay,
      isDisabled: tooltipHidden,
      tooltip: tooltipContents ?? alt,
      placement: tooltipPlacement,
      zIndex: tooltipZIndex,
      children: (triggerProps, ref) => {
        return /* @__PURE__ */ jsx17(IconButtonInner, {
          alt,
          innerRef: mergeRefs(ref, innerRef),
          triggerProps,
          ...props
        });
      }
    })
  })
);
IconButton.displayName = "IconButton";
var IconButton_default = IconButton;

// rui2/Surface.tsx
import * as React12 from "react";
import { jsx as jsx18 } from "@emotion/react/jsx-runtime";
var Elevation = React12.createContext(0);
function Surface({
  elevated,
  background,
  ...props
}) {
  let elevation = React12.useContext(Elevation);
  if (!background) {
    const backgrounds = Object.keys(styles);
    if (elevated && elevation < backgrounds.length - 1) {
      elevation++;
    }
    background = backgrounds[elevation];
  }
  return /* @__PURE__ */ jsx18(Elevation.Provider, {
    value: elevation,
    children: /* @__PURE__ */ jsx18(View, {
      css: styles[background],
      ...props
    })
  });
}
var styles = {
  root: {
    backgroundColor: tokens.backgroundRoot,
    [interactiveTokens.interactiveBackground]: tokens.backgroundDefault,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundHigher,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmest,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineDefault
  },
  default: {
    backgroundColor: tokens.backgroundDefault,
    [interactiveTokens.interactiveBackground]: tokens.backgroundHigher,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundHighest,
    [interactiveTokens.interactiveBorder]: tokens.outlineDimmer,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineStronger
  },
  higher: {
    backgroundColor: tokens.backgroundHigher,
    [interactiveTokens.interactiveBackground]: tokens.backgroundHighest,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundDefault,
    [interactiveTokens.interactiveBorder]: tokens.outlineDefault,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineStrongest
  },
  highest: {
    backgroundColor: tokens.backgroundHighest,
    [interactiveTokens.interactiveBackground]: tokens.backgroundHigher,
    [interactiveTokens.interactiveBackgroundActive]: tokens.backgroundDefault,
    [interactiveTokens.interactiveBorder]: tokens.outlineStronger,
    [interactiveTokens.interactiveBorderHover]: tokens.outlineStrongest
  }
};

// rui2/InlineCode.tsx
import { jsx as jsx19 } from "@emotion/react/jsx-runtime";
function InlineCode({
  className,
  children
}) {
  return /* @__PURE__ */ jsx19(Surface, {
    elevated: true,
    tag: "span",
    css: [
      {
        display: "inline",
        lineHeight: 1
      },
      rcss.fontSize(tokens.fontSizeSmall),
      rcss.borderRadius(4),
      rcss.px(4),
      rcss.font.code,
      className
    ],
    children
  });
}

// rui2/LoadingStyle.tsx
var LoadingStyle_exports = {};
__export(LoadingStyle_exports, {
  loadingStyle: () => loadingStyle
});
import { keyframes as keyframes2, css as css7 } from "@emotion/react";
var moveGradient = keyframes2(`
  0% {background-position-x: 0%}
  100% {background-position-x: 100%}
`);
var loadingStyle = {
  backgroundPulse: (lowPulse, highPulse) => {
    const lowExists = typeof lowPulse !== "undefined";
    const highExists = typeof highPulse !== "undefined";
    return css7({
      background: `linear-gradient(90deg, ${lowExists ? lowPulse : tokens.outlineDimmest}, ${highExists ? highPulse : interactiveVars.interactiveBackground}, ${lowExists ? lowPulse : tokens.outlineDimmest}, ${highExists ? highPulse : interactiveVars.interactiveBackground})`,
      backgroundSize: "300% 100%",
      backgroundPositionX: "0%",
      animation: `${moveGradient} 2s linear infinite`
    });
  },
  foregroundPulse: (lowPulse, highPulse) => {
    const lowExists = typeof lowPulse !== "undefined";
    const highExists = typeof highPulse !== "undefined";
    return css7({
      position: "relative",
      overflow: "hidden",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        content: '""',
        opacity: "50%",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        background: `linear-gradient(90deg, ${lowExists ? lowPulse : tokens.outlineDefault}, ${highExists ? highPulse : tokens.backgroundRoot}, ${lowExists ? lowPulse : tokens.outlineDefault}, ${highExists ? highPulse : tokens.backgroundRoot})`,
        backgroundSize: "300% 100%",
        backgroundPositionX: "0%",
        animation: `${moveGradient} 2s linear infinite`
      }
    });
  }
};

// rui2/MeasureBar.tsx
import { css as css8, keyframes as keyframes3 } from "@emotion/react";

// hooks/usePrefersReducedMotion.ts
import * as React13 from "react";
var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () => {
  if (typeof window === "undefined") {
    return true;
  }
  if (!window.matchMedia) {
    return true;
  }
  return !window.matchMedia(QUERY).matches;
};
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React13.useState(getInitialState);
  React13.useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    if (!mediaQueryList?.addEventListener) {
      return;
    }
    mediaQueryList.addEventListener("change", listener);
    return () => {
      if (listener) {
        mediaQueryList.removeEventListener("change", listener);
      }
    };
  }, []);
  return prefersReducedMotion;
}

// rui2/MeasureBar.tsx
import { jsx as jsx20, jsxs as jsxs9 } from "@emotion/react/jsx-runtime";
var shakeAnim = keyframes3(`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -1px) rotate(-1deg); }
  20% { transform: translate(-1px, 0px) rotate(1deg); }
  30% { transform: translate(1px, 1px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 1px) rotate(-1deg); }
  60% { transform: translate(-1px, 1px) rotate(0deg); }
  70% { transform: translate(1px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 1px) rotate(0deg); }
  100% { transform: translate(1px, -1px) rotate(-1deg); }`);
var measureBarCss = {
  root: css8([
    rcss.flex.growAndShrink(1),
    rcss.height(tokens.space12),
    rcss.borderRadius(tokens.borderRadiusRound),
    interactive.filledAndOutlined,
    rcss.overflow("clip")
  ]),
  animation: css8({
    animation: `${shakeAnim} 0.2s ease infinite`
  }),
  bar: css8([
    {
      height: "100%",
      borderRadius: tokens.borderRadiusRound
    }
  ]),
  image: css8({
    height: "500%",
    width: "150%",
    position: "absolute",
    left: "50%",
    top: "100%",
    transition: "1s opacity",
    transform: "translate(-50%, -100%)"
  })
};
function MeasureBar({
  total,
  current,
  disabled = false,
  color = tokens.accentPrimaryDefault,
  className,
  shake,
  smoke,
  tooltip
}) {
  const valueMeasured = tooltip ? tooltip : (current !== void 0 ? current : "0") + "/" + total;
  let definedCurrent = 0;
  if (current !== void 0) {
    definedCurrent = current;
  }
  const widthPercent = total !== 0 ? Math.max(0, Math.min(100, Math.floor(definedCurrent / total * 100))) : 0;
  const allowAnimation = !usePrefersReducedMotion();
  return /* @__PURE__ */ jsx20(Tooltip, {
    tooltip: valueMeasured,
    placement: "top",
    children: (triggerProps, ref) => /* @__PURE__ */ jsxs9(View, {
      ...triggerProps,
      innerRef: ref,
      css: [
        measureBarCss.root,
        allowAnimation && shake && measureBarCss.animation
      ],
      className,
      children: [
        current !== void 0 && /* @__PURE__ */ jsx20(View, {
          style: {
            width: widthPercent + "%",
            backgroundColor: disabled ? tokens.outlineDefault : color
          },
          css: measureBarCss.bar
        }),
        allowAnimation && smoke ? /* @__PURE__ */ jsx20("img", {
          style: { opacity: smoke ? 0.4 : 0 },
          src: "/public/images/smoke.gif",
          alt: "",
          css: measureBarCss.image
        }) : null
      ]
    })
  });
}

// rui2/Menu.tsx
import {
  useRef as useRef5,
  useEffect as useEffect5,
  cloneElement as cloneElement4
} from "react";
import { css as css9 } from "@emotion/react";
import { useButton as useButton2 } from "@react-aria/button";
import { FocusScope } from "@react-aria/focus";
import { useMenu, useMenuItem, useMenuTrigger } from "@react-aria/menu";
import { useOverlay, DismissButton } from "@react-aria/overlays";
import { mergeProps as mergeProps3 } from "@react-aria/utils";

// ../node_modules/.pnpm/@react-stately+tree@3.4.1_react@17.0.2/node_modules/@react-stately/tree/dist/module.js
import { useMemo as $1OoTj$useMemo, useEffect as $1OoTj$useEffect } from "react";

// ../node_modules/.pnpm/@react-stately+selection@3.11.2_react@17.0.2/node_modules/@react-stately/selection/dist/module.js
import { useRef as $Qsto2$useRef, useState as $Qsto2$useState, useMemo as $Qsto2$useMemo, useEffect as $Qsto2$useEffect } from "react";
var $e40ea825a81a3709$export$52baac22726c72bf = class extends Set {
  constructor(keys, anchorKey, currentKey) {
    super(keys);
    if (keys instanceof $e40ea825a81a3709$export$52baac22726c72bf) {
      this.anchorKey = anchorKey || keys.anchorKey;
      this.currentKey = currentKey || keys.currentKey;
    } else {
      this.anchorKey = anchorKey;
      this.currentKey = currentKey;
    }
  }
};
function $7af3f5b51489e0b5$var$equalSets(setA, setB) {
  if (setA.size !== setB.size)
    return false;
  for (let item of setA) {
    if (!setB.has(item))
      return false;
  }
  return true;
}
function $7af3f5b51489e0b5$export$253fe78d46329472(props) {
  let { selectionMode = "none", disallowEmptySelection, allowDuplicateSelectionEvents, selectionBehavior: selectionBehaviorProp = "toggle", disabledBehavior = "all" } = props;
  let isFocusedRef = (0, $Qsto2$useRef)(false);
  let [, setFocused] = (0, $Qsto2$useState)(false);
  let focusedKeyRef = (0, $Qsto2$useRef)(null);
  let childFocusStrategyRef = (0, $Qsto2$useRef)(null);
  let [, setFocusedKey] = (0, $Qsto2$useState)(null);
  let selectedKeysProp = (0, $Qsto2$useMemo)(() => $7af3f5b51489e0b5$var$convertSelection(props.selectedKeys), [
    props.selectedKeys
  ]);
  let defaultSelectedKeys = (0, $Qsto2$useMemo)(() => $7af3f5b51489e0b5$var$convertSelection(props.defaultSelectedKeys, new (0, $e40ea825a81a3709$export$52baac22726c72bf)()), [
    props.defaultSelectedKeys
  ]);
  let [selectedKeys, setSelectedKeys] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)(selectedKeysProp, defaultSelectedKeys, props.onSelectionChange);
  let disabledKeysProp = (0, $Qsto2$useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let [selectionBehavior, setSelectionBehavior] = (0, $Qsto2$useState)(selectionBehaviorProp);
  if (selectionBehaviorProp === "replace" && selectionBehavior === "toggle" && typeof selectedKeys === "object" && selectedKeys.size === 0)
    setSelectionBehavior("replace");
  let lastSelectionBehavior = (0, $Qsto2$useRef)(selectionBehaviorProp);
  (0, $Qsto2$useEffect)(() => {
    if (selectionBehaviorProp !== lastSelectionBehavior.current) {
      setSelectionBehavior(selectionBehaviorProp);
      lastSelectionBehavior.current = selectionBehaviorProp;
    }
  }, [
    selectionBehaviorProp
  ]);
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    get isFocused() {
      return isFocusedRef.current;
    },
    setFocused(f) {
      isFocusedRef.current = f;
      setFocused(f);
    },
    get focusedKey() {
      return focusedKeyRef.current;
    },
    get childFocusStrategy() {
      return childFocusStrategyRef.current;
    },
    setFocusedKey(k, childFocusStrategy = "first") {
      focusedKeyRef.current = k;
      childFocusStrategyRef.current = childFocusStrategy;
      setFocusedKey(k);
    },
    selectedKeys,
    setSelectedKeys(keys) {
      if (allowDuplicateSelectionEvents || !$7af3f5b51489e0b5$var$equalSets(keys, selectedKeys))
        setSelectedKeys(keys);
    },
    disabledKeys: disabledKeysProp,
    disabledBehavior
  };
}
function $7af3f5b51489e0b5$var$convertSelection(selection, defaultValue) {
  if (!selection)
    return defaultValue;
  return selection === "all" ? "all" : new (0, $e40ea825a81a3709$export$52baac22726c72bf)(selection);
}
var $d496c0a20b6e58ec$export$6c8a5aaad13c9852 = class {
  get selectionMode() {
    return this.state.selectionMode;
  }
  get disallowEmptySelection() {
    return this.state.disallowEmptySelection;
  }
  get selectionBehavior() {
    return this.state.selectionBehavior;
  }
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  get isFocused() {
    return this.state.isFocused;
  }
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  get focusedKey() {
    return this.state.focusedKey;
  }
  get childFocusStrategy() {
    return this.state.childFocusStrategy;
  }
  setFocusedKey(key, childFocusStrategy) {
    if (key == null || this.collection.getItem(key))
      this.state.setFocusedKey(key, childFocusStrategy);
  }
  get selectedKeys() {
    return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
  }
  get rawSelection() {
    return this.state.selectedKeys;
  }
  isSelected(key) {
    if (this.state.selectionMode === "none")
      return false;
    key = this.getKey(key);
    return this.state.selectedKeys === "all" ? this.canSelectItem(key) : this.state.selectedKeys.has(key);
  }
  get isEmpty() {
    return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
  }
  get isSelectAll() {
    if (this.isEmpty)
      return false;
    if (this.state.selectedKeys === "all")
      return true;
    if (this._isSelectAll != null)
      return this._isSelectAll;
    let allKeys = this.getSelectAllKeys();
    let selectedKeys = this.state.selectedKeys;
    this._isSelectAll = allKeys.every((k) => selectedKeys.has(k));
    return this._isSelectAll;
  }
  get firstSelectedKey() {
    let first = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (!first || (item === null || item === void 0 ? void 0 : item.index) < first.index)
        first = item;
    }
    return first === null || first === void 0 ? void 0 : first.key;
  }
  get lastSelectedKey() {
    let last = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (!last || (item === null || item === void 0 ? void 0 : item.index) > last.index)
        last = item;
    }
    return last === null || last === void 0 ? void 0 : last.key;
  }
  get disabledKeys() {
    return this.state.disabledKeys;
  }
  get disabledBehavior() {
    return this.state.disabledBehavior;
  }
  extendSelection(toKey) {
    if (this.selectionMode === "none")
      return;
    if (this.selectionMode === "single") {
      this.replaceSelection(toKey);
      return;
    }
    toKey = this.getKey(toKey);
    let selection;
    if (this.state.selectedKeys === "all")
      selection = new (0, $e40ea825a81a3709$export$52baac22726c72bf)([
        toKey
      ], toKey, toKey);
    else {
      let selectedKeys = this.state.selectedKeys;
      let anchorKey = selectedKeys.anchorKey || toKey;
      selection = new (0, $e40ea825a81a3709$export$52baac22726c72bf)(selectedKeys, anchorKey, toKey);
      for (let key of this.getKeyRange(anchorKey, selectedKeys.currentKey || toKey))
        selection.delete(key);
      for (let key1 of this.getKeyRange(toKey, anchorKey))
        if (this.canSelectItem(key1))
          selection.add(key1);
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    let fromItem = this.collection.getItem(from);
    let toItem = this.collection.getItem(to);
    if (fromItem && toItem) {
      if (fromItem.index <= toItem.index)
        return this.getKeyRangeInternal(from, to);
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    let keys = [];
    let key = from;
    while (key) {
      let item = this.collection.getItem(key);
      if (item && item.type === "item" || item.type === "cell" && this.allowsCellSelection)
        keys.push(key);
      if (key === to)
        return keys;
      key = this.collection.getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    let item = this.collection.getItem(key);
    if (!item)
      return key;
    if (item.type === "cell" && this.allowsCellSelection)
      return key;
    while (item.type !== "item" && item.parentKey != null)
      item = this.collection.getItem(item.parentKey);
    if (!item || item.type !== "item")
      return null;
    return item.key;
  }
  toggleSelection(key) {
    if (this.selectionMode === "none")
      return;
    if (this.selectionMode === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    key = this.getKey(key);
    if (key == null)
      return;
    let keys = new (0, $e40ea825a81a3709$export$52baac22726c72bf)(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
    if (keys.has(key))
      keys.delete(key);
    else if (this.canSelectItem(key)) {
      keys.add(key);
      keys.anchorKey = key;
      keys.currentKey = key;
    }
    if (this.disallowEmptySelection && keys.size === 0)
      return;
    this.state.setSelectedKeys(keys);
  }
  replaceSelection(key) {
    if (this.selectionMode === "none")
      return;
    key = this.getKey(key);
    if (key == null)
      return;
    let selection = this.canSelectItem(key) ? new (0, $e40ea825a81a3709$export$52baac22726c72bf)([
      key
    ], key, key) : new (0, $e40ea825a81a3709$export$52baac22726c72bf)();
    this.state.setSelectedKeys(selection);
  }
  setSelectedKeys(keys) {
    if (this.selectionMode === "none")
      return;
    let selection = new (0, $e40ea825a81a3709$export$52baac22726c72bf)();
    for (let key of keys) {
      key = this.getKey(key);
      if (key != null) {
        selection.add(key);
        if (this.selectionMode === "single")
          break;
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getSelectAllKeys() {
    let keys = [];
    let addKeys = (key) => {
      while (key) {
        if (this.canSelectItem(key)) {
          let item = this.collection.getItem(key);
          if (item.type === "item")
            keys.push(key);
          if (item.hasChildNodes && (this.allowsCellSelection || item.type !== "item"))
            addKeys([
              ...item.childNodes
            ][0].key);
        }
        key = this.collection.getKeyAfter(key);
      }
    };
    addKeys(this.collection.getFirstKey());
    return keys;
  }
  selectAll() {
    if (this.selectionMode === "multiple")
      this.state.setSelectedKeys("all");
  }
  clearSelection() {
    if (!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0))
      this.state.setSelectedKeys(new (0, $e40ea825a81a3709$export$52baac22726c72bf)());
  }
  toggleSelectAll() {
    if (this.isSelectAll)
      this.clearSelection();
    else
      this.selectAll();
  }
  select(key, e) {
    if (this.selectionMode === "none")
      return;
    if (this.selectionMode === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection)
        this.toggleSelection(key);
      else
        this.replaceSelection(key);
    } else if (this.selectionBehavior === "toggle" || e && (e.pointerType === "touch" || e.pointerType === "virtual"))
      this.toggleSelection(key);
    else
      this.replaceSelection(key);
  }
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys)
      return true;
    let selectedKeys = this.selectedKeys;
    if (selection.size !== selectedKeys.size)
      return false;
    for (let key of selection) {
      if (!selectedKeys.has(key))
        return false;
    }
    for (let key1 of selectedKeys) {
      if (!selection.has(key1))
        return false;
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode === "none" || this.state.disabledKeys.has(key))
      return false;
    let item = this.collection.getItem(key);
    if (!item || item.type === "cell" && !this.allowsCellSelection)
      return false;
    return true;
  }
  isDisabled(key) {
    return this.state.disabledKeys.has(key) && this.state.disabledBehavior === "all";
  }
  constructor(collection, state, options) {
    this.collection = collection;
    this.state = state;
    var _options_allowsCellSelection;
    this.allowsCellSelection = (_options_allowsCellSelection = options === null || options === void 0 ? void 0 : options.allowsCellSelection) !== null && _options_allowsCellSelection !== void 0 ? _options_allowsCellSelection : false;
    this._isSelectAll = null;
  }
};

// ../node_modules/.pnpm/@react-stately+collections@3.5.1_react@17.0.2/node_modules/@react-stately/collections/dist/module.js
import $tyW6A$react, { useMemo as $tyW6A$useMemo, useRef as $tyW6A$useRef } from "react";

// ../node_modules/.pnpm/@swc+helpers@0.4.14/node_modules/@swc/helpers/src/_define_property.mjs
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// ../node_modules/.pnpm/@react-stately+collections@3.5.1_react@17.0.2/node_modules/@react-stately/collections/dist/module.js
function $c1d7fb2ec91bae71$var$Item(props) {
  return null;
}
$c1d7fb2ec91bae71$var$Item.getCollectionNode = function* getCollectionNode(props, context) {
  let { childItems, title, children } = props;
  let rendered = props.title || props.children;
  let textValue = props.textValue || (typeof rendered === "string" ? rendered : "") || props["aria-label"] || "";
  if (!textValue && !(context === null || context === void 0 ? void 0 : context.suppressTextValueWarning))
    console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.");
  yield {
    type: "item",
    props,
    rendered,
    textValue,
    "aria-label": props["aria-label"],
    hasChildNodes: $c1d7fb2ec91bae71$var$hasChildItems(props),
    *childNodes() {
      if (childItems)
        for (let child of childItems)
          yield {
            type: "item",
            value: child
          };
      else if (title) {
        let items = [];
        (0, $tyW6A$react).Children.forEach(children, (child) => {
          items.push({
            type: "item",
            element: child
          });
        });
        yield* items;
      }
    }
  };
};
function $c1d7fb2ec91bae71$var$hasChildItems(props) {
  if (props.hasChildItems != null)
    return props.hasChildItems;
  if (props.childItems)
    return true;
  if (props.title && (0, $tyW6A$react).Children.count(props.children) > 0)
    return true;
  return false;
}
function $9fc4852771d079eb$var$Section(props) {
  return null;
}
$9fc4852771d079eb$var$Section.getCollectionNode = function* getCollectionNode2(props) {
  let { children, title, items } = props;
  yield {
    type: "section",
    props,
    hasChildNodes: true,
    rendered: title,
    "aria-label": props["aria-label"],
    *childNodes() {
      if (typeof children === "function") {
        if (!items)
          throw new Error("props.children was a function but props.items is missing");
        for (let item of items)
          yield {
            type: "item",
            value: item,
            renderer: children
          };
      } else {
        let items1 = [];
        (0, $tyW6A$react).Children.forEach(children, (child) => {
          items1.push({
            type: "item",
            element: child
          });
        });
        yield* items1;
      }
    }
  };
};
var $eb2240fc39a57fa5$export$bf788dd355e3a401 = class {
  build(props, context) {
    this.context = context;
    return $eb2240fc39a57fa5$var$iterable(() => this.iterateCollection(props));
  }
  *iterateCollection(props) {
    let { children, items } = props;
    if (typeof children === "function") {
      if (!items)
        throw new Error("props.children was a function but props.items is missing");
      for (let item of props.items)
        yield* this.getFullNode({
          value: item
        }, {
          renderer: children
        });
    } else {
      let items1 = [];
      (0, $tyW6A$react).Children.forEach(children, (child) => {
        items1.push(child);
      });
      let index = 0;
      for (let item1 of items1) {
        let nodes = this.getFullNode({
          element: item1,
          index
        }, {});
        for (let node of nodes) {
          index++;
          yield node;
        }
      }
    }
  }
  getKey(item, partialNode, state, parentKey) {
    if (item.key != null)
      return item.key;
    if (partialNode.type === "cell" && partialNode.key != null)
      return `${parentKey}${partialNode.key}`;
    let v = partialNode.value;
    if (v != null) {
      var _v_key;
      let key = (_v_key = v.key) !== null && _v_key !== void 0 ? _v_key : v.id;
      if (key == null)
        throw new Error("No key found for item");
      return key;
    }
    return parentKey ? `${parentKey}.${partialNode.index}` : `$.${partialNode.index}`;
  }
  getChildState(state, partialNode) {
    return {
      renderer: partialNode.renderer || state.renderer
    };
  }
  *getFullNode(partialNode, state, parentKey, parentNode) {
    let element = partialNode.element;
    if (!element && partialNode.value && state && state.renderer) {
      let cached = this.cache.get(partialNode.value);
      if (cached && (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))) {
        cached.index = partialNode.index;
        cached.parentKey = parentNode ? parentNode.key : null;
        yield cached;
        return;
      }
      element = state.renderer(partialNode.value);
    }
    if ((0, $tyW6A$react).isValidElement(element)) {
      let type = element.type;
      if (typeof type !== "function" && typeof type.getCollectionNode !== "function") {
        let name = typeof element.type === "function" ? element.type.name : element.type;
        throw new Error(`Unknown element <${name}> in collection.`);
      }
      let childNodes = type.getCollectionNode(element.props, this.context);
      let index = partialNode.index;
      let result = childNodes.next();
      while (!result.done && result.value) {
        let childNode = result.value;
        partialNode.index = index;
        let nodeKey = childNode.key;
        if (!nodeKey)
          nodeKey = childNode.element ? null : this.getKey(element, partialNode, state, parentKey);
        let nodes = this.getFullNode({
          ...childNode,
          key: nodeKey,
          index,
          wrapper: $eb2240fc39a57fa5$var$compose(partialNode.wrapper, childNode.wrapper)
        }, this.getChildState(state, childNode), parentKey ? `${parentKey}${element.key}` : element.key, parentNode);
        let children = [
          ...nodes
        ];
        for (let node of children) {
          node.value = childNode.value || partialNode.value;
          if (node.value)
            this.cache.set(node.value, node);
          if (partialNode.type && node.type !== partialNode.type)
            throw new Error(`Unsupported type <${$eb2240fc39a57fa5$var$capitalize(node.type)}> in <${$eb2240fc39a57fa5$var$capitalize(parentNode.type)}>. Only <${$eb2240fc39a57fa5$var$capitalize(partialNode.type)}> is supported.`);
          index++;
          yield node;
        }
        result = childNodes.next(children);
      }
      return;
    }
    if (partialNode.key == null)
      return;
    let builder = this;
    let node1 = {
      type: partialNode.type,
      props: partialNode.props,
      key: partialNode.key,
      parentKey: parentNode ? parentNode.key : null,
      value: partialNode.value,
      level: parentNode ? parentNode.level + 1 : 0,
      index: partialNode.index,
      rendered: partialNode.rendered,
      textValue: partialNode.textValue,
      "aria-label": partialNode["aria-label"],
      wrapper: partialNode.wrapper,
      shouldInvalidate: partialNode.shouldInvalidate,
      hasChildNodes: partialNode.hasChildNodes,
      childNodes: $eb2240fc39a57fa5$var$iterable(function* () {
        if (!partialNode.hasChildNodes)
          return;
        let index = 0;
        for (let child of partialNode.childNodes()) {
          if (child.key != null)
            child.key = `${node1.key}${child.key}`;
          child.index = index;
          let nodes = builder.getFullNode(child, builder.getChildState(state, child), node1.key, node1);
          for (let node of nodes) {
            index++;
            yield node;
          }
        }
      })
    };
    yield node1;
  }
  constructor() {
    (0, _defineProperty)(this, "cache", /* @__PURE__ */ new WeakMap());
  }
};
function $eb2240fc39a57fa5$var$iterable(iterator) {
  let cache = [];
  let iterable = null;
  return {
    *[Symbol.iterator]() {
      for (let item of cache)
        yield item;
      if (!iterable)
        iterable = iterator();
      for (let item1 of iterable) {
        cache.push(item1);
        yield item1;
      }
    }
  };
}
function $eb2240fc39a57fa5$var$compose(outer, inner) {
  if (outer && inner)
    return (element) => outer(inner(element));
  if (outer)
    return outer;
  if (inner)
    return inner;
}
function $eb2240fc39a57fa5$var$capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function $7613b1592d41b092$export$6cd28814d92fa9c9(props, factory, context, invalidators = []) {
  let builder = (0, $tyW6A$useMemo)(() => new (0, $eb2240fc39a57fa5$export$bf788dd355e3a401)(), []);
  let prev = (0, $tyW6A$useRef)(null);
  return (0, $tyW6A$useMemo)(() => {
    let nodes = builder.build(props, context);
    prev.current = factory(nodes, prev.current);
    return prev.current;
  }, [
    builder,
    props.children,
    props.items,
    context,
    ...invalidators
  ]);
}

// ../node_modules/.pnpm/@react-stately+tree@3.4.1_react@17.0.2/node_modules/@react-stately/tree/dist/module.js
var $05ca4cd7c4a5a999$var$_Symbol_iterator = Symbol.iterator;
var $05ca4cd7c4a5a999$export$863faf230ee2118a = class {
  *[$05ca4cd7c4a5a999$var$_Symbol_iterator]() {
    yield* this.iterable;
  }
  get size() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey : null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key);
  }
  at(idx) {
    const keys = [
      ...this.getKeys()
    ];
    return this.getItem(keys[idx]);
  }
  constructor(nodes, { expandedKeys } = {}) {
    (0, _defineProperty)(this, "keyMap", /* @__PURE__ */ new Map());
    this.iterable = nodes;
    expandedKeys = expandedKeys || /* @__PURE__ */ new Set();
    let visit = (node) => {
      this.keyMap.set(node.key, node);
      if (node.childNodes && (node.type === "section" || expandedKeys.has(node.key)))
        for (let child of node.childNodes)
          visit(child);
    };
    for (let node of nodes)
      visit(node);
    let last;
    let index = 0;
    for (let [key, node1] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node1.prevKey = last.key;
      } else {
        this.firstKey = key;
        node1.prevKey = void 0;
      }
      if (node1.type === "item")
        node1.index = index++;
      last = node1;
      last.nextKey = void 0;
    }
    this.lastKey = last === null || last === void 0 ? void 0 : last.key;
  }
};
function $875d6693e12af071$export$728d6ba534403756(props) {
  let [expandedKeys, setExpandedKeys] = (0, $458b0a5536c1a7cf$export$40bfa8c7b0832715)(props.expandedKeys ? new Set(props.expandedKeys) : void 0, props.defaultExpandedKeys ? new Set(props.defaultExpandedKeys) : /* @__PURE__ */ new Set(), props.onExpandedChange);
  let selectionState = (0, $7af3f5b51489e0b5$export$253fe78d46329472)(props);
  let disabledKeys = (0, $1OoTj$useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [
    props.disabledKeys
  ]);
  let tree = (0, $7613b1592d41b092$export$6cd28814d92fa9c9)(props, (nodes) => new (0, $05ca4cd7c4a5a999$export$863faf230ee2118a)(nodes, {
    expandedKeys
  }), null, [
    expandedKeys
  ]);
  (0, $1OoTj$useEffect)(() => {
    if (selectionState.focusedKey != null && !tree.getItem(selectionState.focusedKey))
      selectionState.setFocusedKey(null);
  }, [
    tree,
    selectionState.focusedKey
  ]);
  let onToggle = (key) => {
    setExpandedKeys($875d6693e12af071$var$toggleKey(expandedKeys, key));
  };
  return {
    collection: tree,
    expandedKeys,
    disabledKeys,
    toggleKey: onToggle,
    selectionManager: new (0, $d496c0a20b6e58ec$export$6c8a5aaad13c9852)(tree, selectionState)
  };
}
function $875d6693e12af071$var$toggleKey(set, key) {
  let res = new Set(set);
  if (res.has(key))
    res.delete(key);
  else
    res.add(key);
  return res;
}

// ui/icons/ChevronDown.tsx
import { jsx as jsx21 } from "@emotion/react/jsx-runtime";

// rui2/Menu.tsx
import { jsx as jsx22, jsxs as jsxs10 } from "@emotion/react/jsx-runtime";
var menuPopupCss = css9([
  rcss.py(4),
  {
    border: `1px solid ${tokens.outlineDimmest}`,
    borderRadius: tokens.borderRadius8,
    backgroundColor: interactiveVars.interactiveBackground
  }
]);
var menuItemCss = css9([
  rcss.p(8),
  {
    ":not([disabled])": {
      cursor: "pointer",
      "&[data-focused=true]": {
        backgroundColor: interactiveVars.interactiveBackgroundActive
      }
    }
  }
]);
var ButtonView3 = SpecializedView.button;
var DivView = SpecializedView.div;
var UlView = SpecializedView.ul;
var LiView = SpecializedView.li;
function MenuItem({
  item,
  state,
  ...props
}) {
  const isDisabled = state.disabledKeys.has(item.key);
  const isFocused = state.selectionManager.isFocused && state.selectionManager.focusedKey === item.key;
  const ref = useRef5(null);
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      "aria-label": item["aria-label"],
      isDisabled,
      ...props
    },
    state,
    ref
  );
  useEffect5(() => {
    ref.current?.addEventListener("touchend", (e) => {
      e.preventDefault();
    });
  }, []);
  return /* @__PURE__ */ jsx22(LiView, {
    ...mergeProps3(
      { ref, css: menuItemCss, "data-focused": isFocused },
      menuItemProps
    ),
    children: item.rendered
  });
}
function Menu({
  className,
  menuProps: menuPropsFromTrigger = {},
  label,
  onAction,
  onClose,
  ...props
}) {
  const state = $875d6693e12af071$export$728d6ba534403756({ ...props, selectionMode: "none" });
  const ref = useRef5(null);
  const { menuProps } = useMenu(
    { "aria-label": label || props["aria-label"], ...props },
    state,
    ref
  );
  return /* @__PURE__ */ jsx22(UlView, {
    ...mergeProps3({ ref, className }, menuProps, menuPropsFromTrigger),
    children: [...state.collection].map((item) => /* @__PURE__ */ jsx22(MenuItem, {
      item,
      onAction,
      onClose,
      state
    }, item.key))
  });
}
var popupMenuZindex = ModalZIndex;
var popupMenuCss = css9({ zIndex: popupMenuZindex });

// rui2/Pill.tsx
import { css as css10 } from "@emotion/react";
import { jsx as jsx23, jsxs as jsxs11 } from "@emotion/react/jsx-runtime";
var pillStyles = ({
  colorway,
  clickable,
  iconLeft,
  iconRight
}) => css10([
  rcss.reset.button,
  rcss.rowWithGap(4),
  rcss.pl(iconLeft ? 4 : 8),
  rcss.pr(iconRight ? 4 : 8),
  rcss.center,
  clickable && interactive.filled,
  colorway && clickable && filledInteractive(colorway),
  colorway && !clickable && filledStatic(colorway),
  rcss.flex.shrink(1),
  {
    borderRadius: tokens.borderRadiusRound,
    height: tokens.space24,
    fontSize: tokens.fontSizeSmall,
    background: "var(--interactive-background)"
  }
]);
function Pill({
  colorway,
  text,
  className,
  iconLeft,
  iconRight
}) {
  return /* @__PURE__ */ jsxs11(View, {
    className,
    css: pillStyles({
      colorway,
      clickable: false,
      iconLeft: !!iconLeft,
      iconRight: !!iconRight
    }),
    children: [
      iconLeft,
      /* @__PURE__ */ jsx23("span", {
        children: text
      }),
      iconRight
    ]
  });
}

// rui2/Radio.tsx
import * as React14 from "react";
import { jsx as jsx24, jsxs as jsxs12 } from "@emotion/react/jsx-runtime";
var RadioContext = React14.createContext(null);
function RadioGroup({
  name,
  value,
  disabled,
  onChange,
  children,
  tag,
  className
}) {
  return /* @__PURE__ */ jsx24(View, {
    tag,
    className,
    children: /* @__PURE__ */ jsx24(RadioContext.Provider, {
      value: { value, name, onChange, disabled },
      children
    })
  });
}
var Input5 = SpecializedView.input;
function Radio({
  onChange,
  id,
  checked,
  disabled,
  name,
  value,
  ...props
}) {
  const groupContext = React14.useContext(RadioContext);
  if (groupContext) {
    name = name ?? groupContext.name;
    checked = checked ?? groupContext.value === value;
    onChange = onChange ?? groupContext.onChange;
    disabled = disabled ?? groupContext.disabled;
  }
  return /* @__PURE__ */ jsxs12(View, {
    css: [rcss.justify.center, rcss.align.center, rcss.position.relative],
    children: [
      /* @__PURE__ */ jsx24(Input5, {
        id,
        name,
        value,
        type: "radio",
        checked,
        disabled,
        onChange: (e) => onChange?.(e),
        css: [
          interactive.filledAndOutlined,
          {
            appearance: "none",
            width: 20,
            height: 20,
            borderRadius: "50%"
          }
        ],
        ...props
      }),
      checked ? /* @__PURE__ */ jsx24(View, {
        css: [
          {
            width: 12,
            height: 12,
            borderRadius: "50%",
            position: "absolute",
            pointerEvents: "none"
          },
          disabled ? rcss.backgroundColor.outlineDefault : rcss.backgroundColor.accentPrimaryDefault
        ]
      }) : null
    ]
  });
}

// rui2/Rui.tsx
import { Global } from "@emotion/react";
import { jsx as jsx25, jsxs as jsxs13 } from "@emotion/react/jsx-runtime";
function Rui({
  theme,
  children
}) {
  const styles2 = theme === "light" ? getThemeSettingsCss(replitLight.values) : getThemeSettingsCss(replitDark.values);
  return /* @__PURE__ */ jsxs13(Surface, {
    className: "replit-ui-theme-root",
    css: [styles2],
    children: [
      /* @__PURE__ */ jsx25(Global, {
        styles: globalStyles
      }),
      children
    ]
  });
}

// ui/icons/Search.tsx
import { jsx as jsx26 } from "@emotion/react/jsx-runtime";
function SearchIcon(props) {
  return /* @__PURE__ */ jsx26(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx26("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M11 3.75C6.99594 3.75 3.75 6.99594 3.75 11C3.75 15.0041 6.99594 18.25 11 18.25C12.9606 18.25 14.7395 17.4717 16.0445 16.2073C16.0669 16.1767 16.092 16.1474 16.1197 16.1197C16.1474 16.092 16.1767 16.0669 16.2073 16.0445C17.4717 14.7395 18.25 12.9606 18.25 11C18.25 6.99594 15.0041 3.75 11 3.75ZM17.6949 16.6342C18.9773 15.112 19.75 13.1462 19.75 11C19.75 6.16751 15.8325 2.25 11 2.25C6.16751 2.25 2.25 6.16751 2.25 11C2.25 15.8325 6.16751 19.75 11 19.75C13.1462 19.75 15.112 18.9773 16.6342 17.6949L20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L17.6949 16.6342Z"
    })
  });
}

// ui/icons/Close.tsx
import { jsx as jsx27 } from "@emotion/react/jsx-runtime";
function CloseIcon(props) {
  return /* @__PURE__ */ jsx27(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx27("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z"
    })
  });
}

// rui2/SearchBar.tsx
import { css as css11 } from "@emotion/react";
import { jsx as jsx28, jsxs as jsxs14 } from "@emotion/react/jsx-runtime";
var iconPositionStyles = css11([
  rcss.position.absolute,
  rcss.center,
  { top: 0, right: 0, height: "100%" }
]);
function SearchBar(props) {
  return /* @__PURE__ */ jsxs14(View, {
    css: [rcss.position.relative, rcss.flex.shrink(1)],
    children: [
      /* @__PURE__ */ jsx28(Input_default, {
        id: props.id,
        className: props.className,
        css: [rcss.pr(32)],
        value: props.value,
        onChange: props.onChange,
        placeholder: props.placeholder || "Search",
        name: props.name,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onKeyDown: props.onKeyDown,
        disabled: props.disabled,
        ref: props.inputRef
      }),
      props.loading ? /* @__PURE__ */ jsx28(View, {
        css: [iconPositionStyles, rcss.p(8), { pointerEvents: "none" }],
        children: /* @__PURE__ */ jsx28(LoadingIcon, {})
      }) : null,
      !props.loading && !props.value ? /* @__PURE__ */ jsx28(View, {
        css: [iconPositionStyles, rcss.p(8), { pointerEvents: "none" }],
        children: /* @__PURE__ */ jsx28(SearchIcon, {})
      }) : null,
      !props.loading && props.value ? /* @__PURE__ */ jsx28(View, {
        css: [rcss.p(4), iconPositionStyles],
        children: /* @__PURE__ */ jsx28(IconButton_default, {
          alt: "Clear",
          tooltipHidden: true,
          disabled: props.disabled,
          css: {
            "&:hover": {
              backgroundColor: "var(--background-highest) !important"
            }
          },
          onClick: props.onClear,
          children: /* @__PURE__ */ jsx28(CloseIcon, {})
        })
      }) : null
    ]
  });
}

// ui/icons/ChevronLeft.tsx
import { jsx as jsx29 } from "@emotion/react/jsx-runtime";
function ChevronLeftIcon(props) {
  return /* @__PURE__ */ jsx29(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx29("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8.46967 11.4697C8.17678 11.7626 8.17678 12.2374 8.46967 12.5303L14.4697 18.5303C14.7626 18.8232 15.2374 18.8232 15.5303 18.5303C15.8232 18.2374 15.8232 17.7626 15.5303 17.4697L10.0607 12L15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967C15.2374 5.17678 14.7626 5.17678 14.4697 5.46967L8.46967 11.4697Z"
    })
  });
}

// ui/icons/ChevronRight.tsx
import { jsx as jsx30 } from "@emotion/react/jsx-runtime";
function ChevronRightIcon(props) {
  return /* @__PURE__ */ jsx30(Icon, {
    ...props,
    children: /* @__PURE__ */ jsx30("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M15.5303 11.4697C15.8232 11.7626 15.8232 12.2374 15.5303 12.5303L9.53033 18.5303C9.23744 18.8232 8.76256 18.8232 8.46967 18.5303C8.17678 18.2374 8.17678 17.7626 8.46967 17.4697L13.9393 12L8.46967 6.53033C8.17678 6.23744 8.17678 5.76256 8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L15.5303 11.4697Z"
    })
  });
}

// rui2/Tour.tsx
import { jsx as jsx31, jsxs as jsxs15 } from "@emotion/react/jsx-runtime";
function Tour({
  title,
  content: ContentProp,
  colorway = "primary",
  totalSteps = 1,
  currentStepIndex = 0,
  onDismiss,
  onCurrentStepChange,
  cypressCloseData
}) {
  return /* @__PURE__ */ jsxs15(View, {
    css: [
      rcss.p(8),
      {
        paddingBottom: 12,
        paddingRight: title ? void 0 : 32,
        backgroundColor: colormap[colorway].dimmest,
        border: "1px solid " + colormap[colorway].dimmer,
        position: "relative"
      },
      rcss.borderRadius(8),
      rcss.shadow(2),
      rcss.colWithGap(8)
    ],
    children: [
      /* @__PURE__ */ jsx31(IconButton_default, {
        alt: "Close",
        colorway,
        css: {
          position: "absolute",
          top: tokens.space8,
          right: tokens.space8
        },
        onClick: onDismiss,
        dataCy: cypressCloseData,
        children: /* @__PURE__ */ jsx31(CloseIcon, {})
      }),
      title ? /* @__PURE__ */ jsx31(Text, {
        variant: "subheadBig",
        children: title
      }) : null,
      typeof ContentProp === "function" ? /* @__PURE__ */ jsx31(ContentProp, {}) : /* @__PURE__ */ jsx31(Text, {
        multiline: true,
        children: ContentProp
      }),
      totalSteps > 1 && onCurrentStepChange ? /* @__PURE__ */ jsxs15(View, {
        css: [rcss.flex.row, rcss.align.center, rcss.justify.spaceBetween],
        children: [
          /* @__PURE__ */ jsx31(Button_default, {
            css: { visibility: currentStepIndex <= 0 ? "hidden" : void 0 },
            colorway,
            text: "Back",
            iconLeft: /* @__PURE__ */ jsx31(ChevronLeftIcon, {}),
            onClick: () => onCurrentStepChange(currentStepIndex - 1)
          }),
          /* @__PURE__ */ jsx31(Dots, {
            colorway,
            total: totalSteps,
            current: currentStepIndex
          }),
          /* @__PURE__ */ jsx31(Button_default, {
            "data-autofocus": true,
            colorway,
            text: currentStepIndex >= totalSteps - 1 ? "Done" : "Next",
            iconLeft: /* @__PURE__ */ jsx31(ChevronRightIcon, {}),
            onClick: () => currentStepIndex >= totalSteps - 1 ? onDismiss() : onCurrentStepChange(currentStepIndex + 1)
          })
        ]
      }) : null
    ]
  });
}
function Dots({
  total,
  current,
  colorway
}) {
  return /* @__PURE__ */ jsx31(View, {
    css: rcss.rowWithGap(8),
    children: new Array(total).fill(0).map((_, i) => /* @__PURE__ */ jsx31(View, {
      css: [
        rcss.borderRadius("full"),
        {
          width: tokens.space8,
          height: tokens.space8,
          backgroundColor: i === current ? colormap[colorway].stronger : colormap[colorway].dimmer
        }
      ]
    }, i))
  });
}

// rui2/cssRecord.ts
import { css as css12 } from "@emotion/react";
function cssRecord(input) {
  const serializedStyleObject = {};
  for (const key in input) {
    serializedStyleObject[key] = css12(input[key]);
  }
  return serializedStyleObject;
}

// rui2/DividerH.tsx
import { jsx as jsx32 } from "@emotion/react/jsx-runtime";
function DividerH({ className }) {
  return /* @__PURE__ */ jsx32("div", {
    className,
    css: { backgroundColor: tokens.outlineDimmest, height: 1, width: "100%" }
  });
}

// rui2/DividerV.tsx
import { jsx as jsx33 } from "@emotion/react/jsx-runtime";
function DividerV({ className }) {
  return /* @__PURE__ */ jsx33("div", {
    className,
    css: { backgroundColor: tokens.outlineDimmest, width: 1 }
  });
}

// rui2/Label.tsx
import { jsx as jsx34 } from "@emotion/react/jsx-runtime";
var getColor = (color) => {
  if (color === void 0) {
    return tokens.foregroundDefault;
  }
  return `var(--accent-${color}-strongest)`;
};
var getBackgroundColor = (color) => {
  if (color === void 0) {
    return tokens.backgroundDefault;
  }
  return `var(--accent-${color}-dimmer)`;
};
var DefaultLabel = ({ tagline, name, color }) => /* @__PURE__ */ jsx34(Tooltip, {
  tooltip: /* @__PURE__ */ jsx34(Text, {
    variant: "small",
    multiline: true,
    children: tagline
  }),
  children: /* @__PURE__ */ jsx34("span", {
    css: [
      rcss.fontSize(tokens.fontSizeSmall),
      rcss.borderRadius(16),
      rcss.display.inlineBlock,
      rcss.cursor.default,
      rcss.backgroundColor,
      {
        lineHeight: 1,
        padding: `${tokens.space4} ${tokens.space8}`,
        whiteSpace: "nowrap",
        color: getColor(color),
        backgroundColor: getBackgroundColor(color)
      }
    ],
    children: name
  })
});
var AdminLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Admin",
  name: "Admin",
  color: "yellow"
});
var ContentCreatorLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Content Creator",
  name: "Content Creator",
  color: "orange"
});
var DetectiveLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Detective",
  name: "Detective",
  color: "green"
});
var FeaturedUserLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Verified",
  name: "Verified",
  color: "blue"
});
var HackerLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Hackers are subscribed to Replit's paid Hacker Plan.",
  name: "Hacker",
  color: "green"
});
var LanguageJammerLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Language Jammer",
  name: "Language Jammer",
  color: "purple"
});
var ModeratorLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Community Moderator",
  name: "Community Moderator",
  color: "teal"
});
var ReplitRepLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Replit Rep",
  name: "Replit Rep",
  color: "pink"
});
var ReplitRepEduLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Replit Rep EDU",
  name: "Replit Rep EDU",
  color: "green"
});
var PatronLabel = ({ tagline }) => /* @__PURE__ */ jsx34(DefaultLabel, {
  tagline: tagline ?? "Patron",
  name: "Patron",
  color: "purple"
});
var Label2 = {
  Default: DefaultLabel,
  Admin: AdminLabel,
  ContentCreator: ContentCreatorLabel,
  Detective: DetectiveLabel,
  Featured: FeaturedUserLabel,
  Hacker: HackerLabel,
  LanguageJammer: LanguageJammerLabel,
  Moderator: ModeratorLabel,
  ReplitRep: ReplitRepLabel,
  ReplitRepEdu: ReplitRepEduLabel,
  Patron: PatronLabel
};

// rui2/LoadingAnimation.tsx
import { keyframes as keyframes4 } from "@emotion/react";
import { jsx as jsx35, jsxs as jsxs16 } from "@emotion/react/jsx-runtime";
var rectStyles = (slow) => ({
  animationDuration: slow ? "2000ms" : "800ms",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out"
});
var rect1 = keyframes4(`
  0% { transform: translate(0px, 0px) }
  25% { transform: translate(0px, 80px) }
  50% { transform: translate(100px, 80px) }
  75% { transform: translate(100px, 160px) }
  100% { transform: translate(0px, 160px) }
`);
var rect2 = keyframes4(`
  0% { transform: translate(0px, 0px) }
  25% { transform: translate(0px, -80px) }
  50% { transform: translate(-100px, -80px) }
  100% { transform: translate(-100px, -80px) }
`);
var rect3 = keyframes4(`
  0% { transform: translate(0px, 0px) }
  50% { transform: translate(0px, 0px) }
  75% { transform: translate(0px, -80px) }
  100% { transform: translate(100px, -80px) }
`);
var LoadingAnimation = ({
  height = 24,
  color = "#F26207",
  slow = false
}) => {
  const inset = 16;
  const translate = inset / 2;
  const rectParams = {
    width: 100 - inset,
    height: 80 - inset,
    fill: color,
    rx: 12
  };
  return /* @__PURE__ */ jsxs16("svg", {
    width: height / 1.2,
    height,
    viewBox: "0 0 200 240",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx35("rect", {
        css: [rectStyles(slow), { animationName: rect1 }],
        ...rectParams,
        x: 0 + translate,
        y: 0 + translate
      }),
      /* @__PURE__ */ jsx35("rect", {
        css: [rectStyles(slow), { animationName: rect2 }],
        ...rectParams,
        x: 100 + translate,
        y: 80 + translate
      }),
      /* @__PURE__ */ jsx35("rect", {
        css: [rectStyles(slow), { animationName: rect3 }],
        ...rectParams,
        x: 0 + translate,
        y: 160 + translate
      })
    ]
  });
};
var LoadingAnimation_default = LoadingAnimation;

// rui2/Logo.tsx
var Logo_exports = {};
__export(Logo_exports, {
  LogoHorizontal: () => LogoHorizontal,
  LogoSymbol: () => LogoSymbol,
  LogoSymbolRaw: () => LogoSymbolRaw,
  LogoVertical: () => LogoVertical
});

// ../shared/marketingStyles.ts
var brandOrange = "#F26207";

// rui2/Logo.tsx
import { jsx as jsx36, jsxs as jsxs17 } from "@emotion/react/jsx-runtime";
var LogoSymbolRaw = ({
  height = 24,
  color = brandOrange
}) => {
  return /* @__PURE__ */ jsxs17("svg", {
    width: height * 20 / 24,
    height,
    viewBox: "0 0 20 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx36("path", {
        d: "M0 1.5C0 0.671573 0.671573 0 1.5 0H8.5C9.32843 0 10 0.671573 10 1.5V8H1.5C0.671573 8 0 7.32843 0 6.5V1.5Z",
        fill: color
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M10 8H18.5C19.3284 8 20 8.67157 20 9.5V14.5C20 15.3284 19.3284 16 18.5 16H10V8Z",
        fill: color
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M0 17.5C0 16.6716 0.671573 16 1.5 16H10V22.5C10 23.3284 9.32843 24 8.5 24H1.5C0.671573 24 0 23.3284 0 22.5V17.5Z",
        fill: color
      })
    ]
  });
};
var LogoSymbol = ({
  size = 32,
  color = brandOrange
}) => {
  return /* @__PURE__ */ jsxs17("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx36("path", {
        d: "M7 5.5C7 4.67157 7.67157 4 8.5 4H15.5C16.3284 4 17 4.67157 17 5.5V12H8.5C7.67157 12 7 11.3284 7 10.5V5.5Z",
        fill: color
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M17 12H25.5C26.3284 12 27 12.6716 27 13.5V18.5C27 19.3284 26.3284 20 25.5 20H17V12Z",
        fill: color
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M7 21.5C7 20.6716 7.67157 20 8.5 20H17V26.5C17 27.3284 16.3284 28 15.5 28H8.5C7.67157 28 7 27.3284 7 26.5V21.5Z",
        fill: color
      })
    ]
  });
};
var LogoHorizontal = ({ height = 40 }) => {
  return /* @__PURE__ */ jsxs17("svg", {
    width: height * 122 / 44,
    height,
    viewBox: "0 0 122 44",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx36("path", {
        d: "M111.515 18.2193V16.7908C111.515 16.5455 111.313 16.3579 111.053 16.3579H106.046V13.5873C106.046 13.342 105.844 13.1544 105.584 13.1544H103.68C103.42 13.1544 103.218 13.3564 103.218 13.5873V16.3579H100.26C100 16.3579 99.798 16.5599 99.798 16.7908V18.2193C99.798 18.4646 100 18.6522 100.26 18.6522H103.218V22.8947C103.218 26.1414 104.747 27.6421 108.038 27.6421H110.721C110.981 27.6421 111.183 27.4401 111.183 27.2092V25.7807C111.183 25.5354 110.981 25.3478 110.721 25.3478H108.47C106.681 25.3478 106.046 24.6407 106.046 22.8802V18.6667H111.053C111.313 18.6522 111.515 18.4502 111.515 18.2193Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M96.4647 12H93.8672C93.6075 12 93.4055 12.202 93.4055 12.4329V14.2655C93.4055 14.5108 93.6075 14.6984 93.8672 14.6984H96.4647C96.7244 14.6984 96.9264 14.4964 96.9264 14.2655V12.4329C96.912 12.1876 96.71 12 96.4647 12Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M96.811 25.3478V16.7908C96.811 16.5455 96.6089 16.3579 96.3492 16.3579H90.5339C90.2742 16.3579 90.0721 16.5599 90.0721 16.7908V18.2193C90.0721 18.4646 90.2742 18.6522 90.5339 18.6522H93.9827V25.3478H90.5339C90.2742 25.3478 90.0721 25.5498 90.0721 25.7807V27.2092C90.0721 27.4545 90.2742 27.6421 90.5339 27.6421H100.346C100.606 27.6421 100.808 27.4401 100.808 27.2092V25.7807C100.808 25.5354 100.606 25.3478 100.346 25.3478H96.811Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M87.8932 25.3478H84.9495V12.4329C84.9495 12.1876 84.7475 12 84.4877 12H78.7157C78.456 12 78.254 12.202 78.254 12.4329V13.8615C78.254 14.1068 78.456 14.2944 78.7157 14.2944H82.1212V25.3478H78.2973C78.0375 25.3478 77.8355 25.5498 77.8355 25.7807V27.2092C77.8355 27.4545 78.0375 27.6421 78.2973 27.6421H87.8932C88.153 27.6421 88.355 27.4401 88.355 27.2092V25.7807C88.355 25.5354 88.153 25.3478 87.8932 25.3478Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M72.2222 16.1414C71.241 16.1414 70.5339 16.3579 69.9856 16.8773L69.3074 17.5267H68.6869L68.456 16.6898C68.3983 16.5022 68.2251 16.3579 68.0087 16.3579H66.71C66.4502 16.3579 66.2482 16.5599 66.2482 16.7908V31.5671C66.2482 31.8124 66.4502 32 66.71 32H68.6147C68.8745 32 69.0765 31.798 69.0765 31.5671V28.3636L68.8312 26.6465L69.4661 26.5022L70.1443 27.1515C70.6782 27.6421 71.3276 27.8874 72.2944 27.8874C75.0938 27.8874 76.7821 25.9538 76.7821 22.0144C76.7677 18.075 75.0938 16.1414 72.2222 16.1414ZM71.2843 25.5209C69.8557 25.5209 69.0621 24.785 69.0621 23.3853V20.6147C69.0621 19.215 69.8413 18.4791 71.2843 18.4791C73.0303 18.4791 73.824 19.5758 73.824 21.9856C73.8095 24.4242 73.0303 25.5209 71.2843 25.5209Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M58.1818 16.1414C54.5455 16.1414 52.5974 18.075 52.5974 22C52.5974 25.9394 54.531 27.873 58.1097 27.873C60.8802 27.873 62.6696 26.7186 63.1458 24.7417C63.2179 24.4675 62.987 24.2078 62.6984 24.2078H60.9668C60.7792 24.2078 60.6061 24.3232 60.5339 24.4964C60.2309 25.3478 59.3651 25.7518 58.1963 25.7518C56.3781 25.7518 55.5123 24.7561 55.3968 22.4329H63.2901C63.723 18.0895 61.9192 16.1414 58.1818 16.1414ZM55.4834 20.6724C55.7576 18.9697 56.609 18.176 58.1674 18.176C59.8269 18.176 60.6061 19.0563 60.6494 20.6724H55.4834Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M46.9697 16.8629L46.3203 17.5123H45.671L45.469 16.6898C45.4257 16.4877 45.2381 16.3579 45.0216 16.3579H40.8658C40.6061 16.3579 40.404 16.5599 40.404 16.7908V18.2193C40.404 18.4646 40.6061 18.6522 40.8658 18.6522H43.3189V25.3478H40.4618C40.202 25.3478 40 25.5498 40 25.7807V27.2092C40 27.4545 40.202 27.6421 40.4618 27.6421H49.4517C49.7114 27.6421 49.9134 27.4401 49.9134 27.2092V25.7807C49.9134 25.5354 49.7114 25.3478 49.4517 25.3478H46.1472V20.6147C46.1472 19.2872 46.9264 18.5945 48.456 18.5945H50.938C51.1977 18.5945 51.3997 18.3925 51.3997 18.1616V16.5887C51.3997 16.3434 51.1977 16.1558 50.938 16.1558H49.4661C48.3838 16.1414 47.5325 16.3434 46.9697 16.8629Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M10 11.5C10 10.6716 10.6716 10 11.5 10H18.5C19.3284 10 20 10.6716 20 11.5V18H11.5C10.6716 18 10 17.3284 10 16.5V11.5Z",
        fill: brandOrange
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M20 18H28.5C29.3284 18 30 18.6716 30 19.5V24.5C30 25.3284 29.3284 26 28.5 26H20V18Z",
        fill: brandOrange
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M10 27.5C10 26.6716 10.6716 26 11.5 26H20V32.5C20 33.3284 19.3284 34 18.5 34H11.5C10.6716 34 10 33.3284 10 32.5V27.5Z",
        fill: brandOrange
      })
    ]
  });
};
var LogoVertical = ({ height = 64 }) => {
  return /* @__PURE__ */ jsxs17("svg", {
    width: height * 68 / 64,
    height,
    viewBox: "0 0 68 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ jsx36("path", {
        d: "M57.7618 44.4827V43.5335C57.7618 43.3704 57.6276 43.2458 57.455 43.2458H54.1277V41.4048C54.1277 41.2417 53.9935 41.1171 53.8209 41.1171H52.5551C52.3825 41.1171 52.2483 41.2513 52.2483 41.4048V43.2458H50.2826C50.11 43.2458 49.9758 43.38 49.9758 43.5335V44.4827C49.9758 44.6457 50.11 44.7704 50.2826 44.7704H52.2483V47.5895C52.2483 49.747 53.2647 50.7442 55.4509 50.7442H57.2345C57.407 50.7442 57.5413 50.6099 57.5413 50.4565V49.5072C57.5413 49.3442 57.407 49.2196 57.2345 49.2196H55.7386C54.5496 49.2196 54.1277 48.7497 54.1277 47.5799V44.78H57.455C57.6276 44.7704 57.7618 44.6362 57.7618 44.4827Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M47.7608 40.35H46.0348C45.8622 40.35 45.7279 40.4842 45.7279 40.6377V41.8554C45.7279 42.0184 45.8622 42.1431 46.0348 42.1431H47.7608C47.9333 42.1431 48.0676 42.0089 48.0676 41.8554V40.6377C48.058 40.4747 47.9238 40.35 47.7608 40.35Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M47.9909 49.2196V43.5335C47.9909 43.3704 47.8566 43.2458 47.684 43.2458H43.8198C43.6472 43.2458 43.5129 43.38 43.5129 43.5335V44.4827C43.5129 44.6457 43.6472 44.7704 43.8198 44.7704H46.1115V49.2196H43.8198C43.6472 49.2196 43.5129 49.3538 43.5129 49.5072V50.4565C43.5129 50.6195 43.6472 50.7442 43.8198 50.7442H50.3401C50.5127 50.7442 50.647 50.6099 50.647 50.4565V49.5072C50.647 49.3442 50.5127 49.2196 50.3401 49.2196H47.9909Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M42.065 49.2196H40.1089V40.6377C40.1089 40.4747 39.9747 40.35 39.8021 40.35H35.9666C35.794 40.35 35.6598 40.4842 35.6598 40.6377V41.5869C35.6598 41.75 35.794 41.8746 35.9666 41.8746H38.2295V49.2196H35.6885C35.5159 49.2196 35.3817 49.3538 35.3817 49.5073V50.4565C35.3817 50.6195 35.5159 50.7442 35.6885 50.7442H42.065C42.2376 50.7442 42.3719 50.61 42.3719 50.4565V49.5073C42.3719 49.3442 42.2376 49.2196 42.065 49.2196Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M31.6517 43.102C30.9996 43.102 30.5298 43.2458 30.1654 43.591L29.7147 44.0225H29.3024L29.149 43.4663C29.1106 43.3417 28.9956 43.2458 28.8517 43.2458H27.9888C27.8162 43.2458 27.6819 43.38 27.6819 43.5335V53.3523C27.6819 53.5154 27.8162 53.64 27.9888 53.64H29.2545C29.4271 53.64 29.5613 53.5058 29.5613 53.3523V51.2236L29.3983 50.0826L29.8202 49.9867L30.2709 50.4182C30.6257 50.7442 31.0572 50.9072 31.6996 50.9072C33.5598 50.9072 34.6817 49.6223 34.6817 47.0046C34.6721 44.3869 33.5598 43.102 31.6517 43.102ZM31.0284 49.3347C30.0791 49.3347 29.5517 48.8456 29.5517 47.9155V46.0745C29.5517 45.1444 30.0695 44.6554 31.0284 44.6554C32.1886 44.6554 32.716 45.3841 32.716 46.9854C32.7064 48.6059 32.1886 49.3347 31.0284 49.3347Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M22.3218 43.102C19.9054 43.102 18.611 44.3869 18.611 46.995C18.611 49.6127 19.8959 50.8976 22.2739 50.8976C24.1149 50.8976 25.3039 50.1305 25.6203 48.8169C25.6683 48.6347 25.5149 48.4621 25.3231 48.4621H24.1724C24.0478 48.4621 23.9327 48.5388 23.8848 48.6539C23.6834 49.2196 23.1081 49.4881 22.3314 49.4881C21.1232 49.4881 20.5479 48.8265 20.4712 47.2827H25.7162C26.0039 44.3965 24.8053 43.102 22.3218 43.102ZM20.5287 46.1128C20.7109 44.9814 21.2766 44.454 22.3122 44.454C23.4149 44.454 23.9327 45.0389 23.9615 46.1128H20.5287Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M14.8714 43.5814L14.4399 44.0129H14.0084L13.8741 43.4663C13.8454 43.3321 13.7207 43.2458 13.5769 43.2458H10.8153C10.6427 43.2458 10.5085 43.38 10.5085 43.5335V44.4827C10.5085 44.6458 10.6427 44.7704 10.8153 44.7704H12.4454V49.2196H10.5468C10.3742 49.2196 10.24 49.3538 10.24 49.5072V50.4565C10.24 50.6195 10.3742 50.7442 10.5468 50.7442H16.5206C16.6932 50.7442 16.8275 50.61 16.8275 50.4565V49.5072C16.8275 49.3442 16.6932 49.2196 16.5206 49.2196H14.3248V46.0745C14.3248 45.1923 14.8426 44.7321 15.859 44.7321H17.5083C17.6809 44.7321 17.8151 44.5978 17.8151 44.4444V43.3992C17.8151 43.2362 17.6809 43.1116 17.5083 43.1116H16.5302C15.8111 43.102 15.2453 43.2362 14.8714 43.5814Z",
        fill: tokens.foregroundDefault
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M24 11.85C24 11.0216 24.6716 10.35 25.5 10.35H32.5C33.3284 10.35 34 11.0216 34 11.85V18.35H25.5C24.6716 18.35 24 17.6784 24 16.85V11.85Z",
        fill: brandOrange
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M34 18.35H42.5C43.3284 18.35 44 19.0216 44 19.85V24.85C44 25.6784 43.3284 26.35 42.5 26.35H34V18.35Z",
        fill: brandOrange
      }),
      /* @__PURE__ */ jsx36("path", {
        d: "M24 27.85C24 27.0216 24.6716 26.35 25.5 26.35H34V32.85C34 33.6784 33.3284 34.35 32.5 34.35H25.5C24.6716 34.35 24 33.6784 24 32.85V27.85Z",
        fill: brandOrange
      })
    ]
  });
};

// rui2/packageIndex.ts
console.log(Button_default);
console.log(Text);
console.log(rcss);
console.log(View);
export {
  AccordionItem as AccordianItem,
  Button_default as Button,
  ButtonGroup,
  Checkbox,
  DetailedInput,
  DividerH,
  DividerV,
  Header,
  IconButton_default as IconButton,
  InlineCode,
  Input_default as Input,
  Interactive_exports as Interactive,
  Label2 as Label,
  LoadingAnimation_default as LoadingAnimation,
  LoadingStyle_exports as LoadingStyle,
  Logo_exports as Logo,
  MeasureBar,
  Menu,
  Pill,
  Radio,
  RadioGroup,
  Rui,
  SearchBar,
  SpecializedView,
  Surface,
  Text,
  Tooltip,
  Tour,
  View,
  Colorway_exports as colorway,
  cssRecord,
  rcss,
  tokens
};
