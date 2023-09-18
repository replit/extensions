import { HandshakeStatus } from "@replit/extensions";
import { useReplit } from "./useReplit";

/**
 * Returns whether your application is an extension once the handshake between Replit an your extension is established.  When the handshake is loading, returns `undefined`.
 */
export default function useIsExtension(): boolean {
  const { status } = useReplit();

  return status === HandshakeStatus.Ready;
}
