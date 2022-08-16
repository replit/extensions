import { request } from "../talk";
export async function readReplInfo() {
  return request({ type: "readReplInfo" });
}
