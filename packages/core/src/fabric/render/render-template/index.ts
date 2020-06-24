import { fabric as fabricTypes } from "fabric";
import { IBSIMTemplateDoc } from "../../../../types/IBSIMTemplateDoc";
import { buildObject, buildStatic } from "../../../lib";
import { removeAllObjects } from "../../../lib/canvas";
import { getStaticBack, getStaticFront } from "../../../lib/model/get-static";

const renderTemplate = ({ fabric }: { fabric: any }) => ({
  canvas,
}: {
  canvas: fabricTypes.Canvas;
}) => ({ doc }: { doc: IBSIMTemplateDoc }) => async () => {
  const { model } = doc;
  const { staticImages, fabricExported } = model;
  const _buildStatic = buildStatic({ fabric });
  const __buildStatic = _buildStatic({ doc });
  const _buildObject = buildObject({ fabric });

  removeAllObjects({ canvas });

  await Promise.all(
    getStaticBack(staticImages).map(async ({ url }) => {
      canvas.add(await __buildStatic({ url }));
    }),
  );

  await Promise.all(
    fabricExported.objects.map((object) => _buildObject({ object })),
  ).then((objects) => objects.forEach((obj) => canvas.add(obj)));

  await Promise.all(
    getStaticFront(staticImages).map(async ({ url }) => {
      canvas.add(await __buildStatic({ url }));
    }),
  );

  canvas.requestRenderAll();
};

export default renderTemplate;
