import { request } from "src/util/talk";

let queryWarned = false;
export async function queryGraphql({ query, variables }) {
  if (!queryWarned) {
    console.warn("@replit/extensions: queryGraphql() will be deprecated very soon");
    queryWarned = true;
  }

  return request({
    type: "queryGraphql",
    query,
    variables,
  });
}

let mutateWarned = false;
export async function mutateGraphql({ mutation, variables }) {
  if (!mutateWarned) {
    console.warn("@replit/extensions: mutateGraphql() will be deprecated very soon");
    mutateWarned = true;
  }

  return request({
    type: "mutateGraphql",
    mutation,
    variables,
  });
}
