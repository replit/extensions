import * as fs from "./fs";
import * as replDb from "./replDb";
import * as me from "./me";
import * as theme from "./theme";
import * as messages from "./messages";
import * as data from "./data";

export { fs, replDb, me, theme, messages, data };

// deprecate this after migrating existing extensions
export * from "./fs";
