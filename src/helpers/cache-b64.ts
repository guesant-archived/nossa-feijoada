import { blobFromURL } from "./blob-from-url";
import { blobToURL } from "./blob-to-url";

export const cacheB64 = (b64: string) =>
  blobFromURL(b64).then((blob: Blob) => blobToURL(blob));
