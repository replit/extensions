import * as fs from "./fs";
import * as replDb from "./replDb";
import * as me from "./me";
import * as themes from "./theme";
import * as messages from "./messages";
import * as data from "./data";
import * as session from "./session";

export { fs, replDb, me, themes, messages, data, session };

// deprecate this after migrating existing extensions
export * from "./fs";
