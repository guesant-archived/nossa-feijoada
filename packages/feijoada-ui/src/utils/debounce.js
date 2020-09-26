const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(callback(...args));
      }, delay);
    });
  };
};
export default debounce;
