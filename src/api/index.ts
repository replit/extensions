import * as fs from "./fs";
import * as replDb from "./replDb";
import * as me from "./me";
import * as theme from "./theme";

export { fs, replDb, me, theme };

// deprecate this after migrating existing extensions
export * from "./fs";
