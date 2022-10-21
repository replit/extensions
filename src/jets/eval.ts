import { request } from "src/util/talk";

export async function evalCode({ code }) {
  return request({
    type: "eval",
    code,
  });
}
