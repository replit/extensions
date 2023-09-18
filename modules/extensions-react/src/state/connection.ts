import { atom } from "jotai";
import { HandshakeStatus } from "@replit/extensions";
import { init } from "@replit/extensions";

export const statusAtom = atom<HandshakeStatus>(HandshakeStatus.Loading);

export const connectionErrorAtom = atom<Error | null>(null);

export const connectionDisposeAtom = atom<(() => void) | null>(null);

export const connectAtom = atom(null, async (get, set) => {
  try {
    if (get(statusAtom) === HandshakeStatus.Ready) {
      console.warn("Already connected");
      return;
    }

    const res = await init({ timeout: 2000 });

    if (res.status !== HandshakeStatus.Ready) {
      throw new Error("Handshake failed");
    }

    set(statusAtom, HandshakeStatus.Ready);
    set(connectionDisposeAtom, res.dispose);
  } catch (e) {
    set(statusAtom, HandshakeStatus.Error);
    set(connectionErrorAtom, e as Error);
  }
});
