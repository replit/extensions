import * as fs from "./fs";
import * as layout from "./layout";
import * as replDb from "./replDb";
import * as me from "./me";
import * as theme from "./theme";
import * as data from "./data";

export { layout, fs, replDb, me, theme, data };

// deprecate this after migrating existing extensions
export * from "./fs";
