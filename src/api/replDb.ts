import { request } from "src/util/talk";

async function set({ key, value }) {
  return request({
    type: "setReplDbValue",
    key,
    value,
  });
}

async function get({ key }) {
  return request({
    type: "getReplDbValue",
    key,
  });
}

async function list({ prefix }) {
  return request({
    type: "listReplDbKeys",
    prefix,
  });
}

const replDb = {
  set,
  get,
  list,
};

export default replDb;
