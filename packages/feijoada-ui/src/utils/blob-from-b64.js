const blobFromB64 = (url) => fetch(url).then((res) => res.blob());
export default blobFromB64;
