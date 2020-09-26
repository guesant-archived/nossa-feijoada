import { UPDATE_OBJECT } from "@fantastic-images/lib/dist/model/mutations/update-object";
import * as React from "react";
import { loadImgByURL } from "../helpers/load-img-from-url";
import { PlayGroundSlotProps } from "./PlayGroundSlotProps";

const buildBlobURL = (blob: Blob) => URL.createObjectURL(blob);

export const SlotImage = ({
  idx,
  object,
  template,
  updateTemplate,
}: PlayGroundSlotProps) => (
  <div>
    <button
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.addEventListener("change", async ({ target }) => {
          const [file] = (target as HTMLInputElement).files || [];
          if (file) {
            const src = buildBlobURL(file);
            await loadImgByURL({ document: window.document })(src)
              .then(async (img) => {
                URL.revokeObjectURL(object.src);
                const { width, height, scaleX, scaleY } = object;
                const { naturalWidth, naturalHeight } = img;
                updateTemplate(
                  UPDATE_OBJECT(idx, {
                    ...object,
                    src,
                    width: naturalWidth,
                    height: naturalHeight,
                    scaleX: (width * scaleX) / naturalWidth,
                    scaleY: (height * scaleY) / naturalHeight,
                  })(template),
                );
              })
              .catch(() => {});
          }
        });
        input.click();
      }}
      className="tw-cursor-pointer"
      children={<span>Selecionar Imagem</span>}
    />
  </div>
);
