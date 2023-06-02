import data from "./data";
import fs from "./fs";
import me from "./me";
import messages from "./messages";
import session from "./session";
import replDb from "./replDb";
import themes from "./themes";
import editor from "./editor";
import exec from "./exec";
import { Module, TestNamespace } from "../types";

const UnitTests: Record<Module, TestNamespace> = {
  fs,
  me,
  messages,
  session,
  replDb,
  themes,
  editor,
  exec,
  data,
};

export default UnitTests;
