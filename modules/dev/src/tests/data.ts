import { Expectation, Test, TestNamespace } from "../types";
import { CurrentUser, data } from "@replit/extensions";

const tests: Record<string, Test> = {
  "data.currentUser should fetch the information of the current Replit user":
    async (expect: Expectation) => {
      const currentUser = await data.currentUser();

      expect(currentUser.user);
      expect(currentUser.user.id);

      log(`Fetched current user @${currentUser.user.username}`);
    },
};

const DataTests: TestNamespace = {
  module: "data",
  tests,
};

export default DataTests;
