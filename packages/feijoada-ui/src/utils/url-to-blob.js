const urlToBlob = (url) => fetch(url).then((res) => res.blob());
export default urlToBlob;
