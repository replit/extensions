import { request } from "../talk";
export async function readUserInfo() {
  return request({ type: "readUserInfo" });
}
