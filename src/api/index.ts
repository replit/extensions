import * as fs from "./fs";
import * as replDb from "./replDb";
import * as me from "./me";
import * as theme from "./theme";
import * as messages from "./messages";

export { fs, replDb, me, theme, messages };

// deprecate this after migrating existing extensions
export * from "./fs";
