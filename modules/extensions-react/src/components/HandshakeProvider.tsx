let warned = false;

/**
 * @deprecated
 * You no longer need to wrap your app with HandshakeProvider
 */
export function HandshakeProvider({ children }: { children: React.ReactNode }) {
  if (!warned) {
    console.warn(
      "HandshakeProvider is deprecated and will be removed soon. You can simply remove it from your code."
    );
    warned = true;
  }

  return children;
}
