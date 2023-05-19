import "@testing-library/jest-dom";

// jsdom needs this polyfill
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// can't be import because imports are hoisted
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  runScripts: "dangerously",
  resources: "usable",
});

global.window = dom.window;
global.document = dom.window.document;
