import { request } from "../talk";

export async function evalCode({code}) {
  return request({
    type: "eval",
    code,
  });
}