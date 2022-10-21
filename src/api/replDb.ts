import { extensionPort } from "src/util/comlink";

async function set({ key, value }) {
  return extensionPort.setReplDbValue(key, value);
}

async function get({ key }) {
  return extensionPort.getReplDbValue(key);
}

async function list({ prefix }) {
  return extensionPort.listReplDbKeys(prefix);
}

const replDb = {
  set,
  get,
  list,
};

export default replDb;
