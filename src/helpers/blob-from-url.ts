export const blobFromURL = (url: string) =>
  fetch(url).then((res) => res.blob());
