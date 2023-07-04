export const decoder = new TextDecoder();

export const decodeBrowser = (input: Uint8Array | string) => {
  const decodeBase64 = (encoded: string): Uint8Array => {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };

  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};

export const decodeNode = (input: Uint8Array | string) => {
  function normalize(input: string | Uint8Array) {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
      encoded = decoder.decode(encoded);
    }
    return encoded;
  }

  return Buffer.from(normalize(input), "base64");
};

export function decode(input: Uint8Array | string) {
  if (typeof process === "undefined") {
    // browser
    return decodeBrowser(input);
  } else {
    return decodeNode(input);
  }
}
