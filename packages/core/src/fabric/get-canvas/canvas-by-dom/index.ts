import { fabric as fabricTypes } from "fabric";
import { IBSIMTemplateDoc } from "../../../../types/IBSIMTemplateDoc";
import { randomID } from "../../../lib";

const getID = ({ id }: { id: string }) =>
  id || randomID(["fcanv"], { len: 4, sep: "--" });

const canvasByDOM = ({
  fabric,
  document,
}: {
  fabric: any;
  document: Document;
}) => ({ wrapper, id }: { wrapper: HTMLElement; id: string }) => ({
  doc,
}: {
  doc: IBSIMTemplateDoc;
}): fabricTypes.Canvas => {
  Array.from(wrapper.children || []).forEach((child) => child.remove());
  const canvasId = getID({ id });
  const domcanvas = document.createElement("canvas");
  domcanvas.id = canvasId;
  domcanvas.width = Math.max(doc.model.sketch.width || 0, 0);
  domcanvas.height = Math.max(doc.model.sketch.height || 0, 0);
  wrapper.append(domcanvas);
  return new fabric.Canvas(canvasId);
};

export default canvasByDOM;
