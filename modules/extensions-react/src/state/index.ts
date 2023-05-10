import { createContext } from "react";
import { UseReplitFailure, UseReplitLoading, UseReplitReady } from "../types";

export const ReplitContext = createContext<
  UseReplitFailure | UseReplitLoading | UseReplitReady | null
>(null);
