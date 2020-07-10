import * as React from "react";
import loadImgByURL from "../utils/load-img-by-url";

const buildBlobURL = (blob) => URL.createObjectURL(blob);
const _loadImgByURL = loadImgByURL({ document: window.document });

const HomeSourceImage = ({ object, onObjectUpdate }) => (
  <div>
    <label className="tw-cursor-pointer">
      <span>Selecionar Imagem</span>
      <input
        onChange={async ({
          target: {
            files: [file],
          },
        }) => {
          if (!file) return;
          const src = buildBlobURL(file);
          await _loadImgByURL(src)
            .then(async (img) => {
              URL.revokeObjectURL(object.src);
              const { width, height, scaleX, scaleY } = object;
              const { naturalWidth, naturalHeight } = img;
              await onObjectUpdate({
                ...object,
                src,
                width: naturalWidth,
                height: naturalHeight,
                scaleX: (width * scaleX) / naturalWidth,
                scaleY: (height * scaleY) / naturalHeight,
              });
            })
            .catch(() => {});
        }}
        className="tw-sr-only"
        type="file"
      />
    </label>
  </div>
);

export default HomeSourceImage;
