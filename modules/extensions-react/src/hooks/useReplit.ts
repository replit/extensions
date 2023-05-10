import { useContext } from "react";
import { ReplitContext } from "../state";

/**
 * Returns the handshake status, connection error (if any), filePath, and Replit API wrapper.  Can only be used if wrapped in the <HandshakeProvider> component.
 */
export function useReplit() {
  const context = useContext(ReplitContext);

  if (context) {
    return context;
  } else {
    throw new Error(
      "useReplit must be used within the <HandshakeProvider> context provider component."
    );
  }
}
