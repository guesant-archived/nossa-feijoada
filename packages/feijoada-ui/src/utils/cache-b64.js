import blobFromB64 from "./blob-from-b64";
import blobToURL from "./blob-to-url";

const cacheB64 = (b64) => blobFromB64(b64).then((blob) => blobToURL(blob));

export default cacheB64;
