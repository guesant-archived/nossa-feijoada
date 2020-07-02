const blobAsText = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsText(blob);
  });

export default blobAsText;
