import { HandshakeStatus } from "src/types";
import { useReplit } from "./useReplit";

export default function useIsExtension(): undefined | boolean {
  const { status } = useReplit();

  switch (status) {
    case HandshakeStatus.Ready:
      return true;
    case HandshakeStatus.Error:
      return false;
    default:
      return undefined;
  }
}
