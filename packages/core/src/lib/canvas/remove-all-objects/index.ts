import { fabric as fabricTypes } from "fabric";

const removeAllObjects = ({ canvas }: { canvas: fabricTypes.Canvas }) => {
  canvas.getObjects().forEach((obj) => canvas.remove(obj));
};

export default removeAllObjects;
