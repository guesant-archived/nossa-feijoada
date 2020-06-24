import { fabric as fabricTypes } from "fabric";

const imageFromURL = ({ fabric }: { fabric: any }) => (
  url: string,
  options: { [key: string]: any } = {},
): Promise<fabricTypes.Image> =>
  new Promise((resolve) => {
    fabric.Image.fromURL(url, resolve, options);
  });

export default imageFromURL;
