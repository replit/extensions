import * as fs from "./fs";
import * as layout from "./layout";
import * as replDb from "./replDb";
import * as me from "./me";
import * as theme from "./theme";

export { layout, fs, replDb, me, theme };

// deprecate this after migrating existing extensions
export * from "./fs";
