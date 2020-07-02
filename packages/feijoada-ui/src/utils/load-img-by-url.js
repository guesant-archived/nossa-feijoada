const loadImgByURL = ({ document }) => (src) =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export default loadImgByURL;
