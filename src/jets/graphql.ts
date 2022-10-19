import { request } from "src/util/talk";

export async function queryGraphql({query, variables}) {
  return request({
    type: "queryGraphql",
    query,
    variables,
  });
}

export async function mutateGraphql({mutation, variables}) {
  return request({
    type: "mutateGraphql",
    mutation,
    variables,
  });
}