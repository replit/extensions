import { TestNamespace, TestObject } from "../types";
import { data } from "@replit/extensions";
import { assert, expect } from "chai";

const tests: TestObject = {
  "currentUser gets the current user": async (log) => {
    const res = await data.currentUser();

    assert.isObject(res.user);
    assert.isNumber(res.user.id);

    log("Current User: " + res.user.username);
  },
  "userById fetches a Replit user by their ID": async () => {
    const res = await data.userById({
      id: 1,
    });

    assert.isObject(res.user);
    expect(res.user.username).to.equal("amasad");
  },
  "userByUsername fetches a Replit user by their username": async () => {
    const res = await data.userByUsername({
      username: "amasad",
    });

    assert.isObject(res.userByUsername);
    expect(res.userByUsername.username).to.equal("amasad");
  },
  "currentRepl gets fetches the current Repl": async (log) => {
    const res = await data.currentRepl({
      includeOwner: true,
    });

    assert.isObject(res.repl);
    assert.isString(res.repl.id);

    log("Repl: " + res.repl.title + " by @" + res.repl.owner?.username);
  },
  "replById fetches a Repl by its ID": async () => {
    // Moderation Welcome Repl
    const id = "caf1f00a-5184-4670-bc97-683f9cc337e0";

    const res = await data.replById({ id });

    assert.isObject(res.repl);
    assert.isString(res.repl.id);
    assert.isString(res.repl.title);
  },
  "replByUrl fetches a Repl by its URL": async () => {
    const url = "/@moderation/Welcome";
    const res = await data.replByUrl({ url });

    assert.isObject(res.repl);
    assert.isString(res.repl.id);
    assert.isString(res.repl.title);
  },
};

const DataTests: TestNamespace = {
  module: "data",
  tests,
};

export default DataTests;
