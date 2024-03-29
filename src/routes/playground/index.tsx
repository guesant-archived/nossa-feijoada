import { Template } from "@fantastic-images/types/src/Template";
import FileSaver from "file-saver";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Header } from "../../components/Header";
import { PlayGroundAbout } from "../../components/PlayGroundAbout";
import { PlayGroundImportTemplate } from "../../components/PlayGroundImportTemplate";
import { PlayGroundListSlots } from "../../components/PlayGroundListSlots";
import { blobAsB64 } from "../../helpers/blob-as-b64";
import { blobFromURL } from "../../helpers/blob-from-url";
import { DEFAULT_TEMPLATE } from "../../helpers/default-template";
import { getPreview } from "../../helpers/get-preview";

export const PlayGroud = () => {
  const [template, setTemplate] = useState<Template>(DEFAULT_TEMPLATE);
  const [previewImage, setPreviewImage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [autoPreview, setAutoPreview] = useState(true);

  const updateTemplate = (template: Template) => {
    setTemplate(template);
    setHasChanges(true);
  };

  const generatePreview = async () => {
    URL.revokeObjectURL(previewImage);
    await getPreview(template, { format: "jpeg" }).then((preview) =>
      setPreviewImage(preview),
    );
    setHasChanges(false);
  };
  useEffect(() => {
    (() => {
      autoPreview && generatePreview();
    })();
  }, [autoPreview, template]);

  const extendArgs = { template, updateTemplate };
  return (
    <div className="tw-flex tw-flex-col tw-h-full tw-min-h-screen ">
      <Header />
      <div className="tw-bg-gray-900 tw-text-white tw-py-12">
        <div>
          <div>
            <div className="tw-container tw-max-w-3xl tw-mx-auto tw-px-4 tw-flex tw-items-center">
              <div className="tw-w-full tw-border-solid tw-border-4 tw-border-gray-800 tw-flex tw-flex-col sm:tw-flex-row">
                <div className="tw-flex-1">
                  <div className="tw-px-1 tw-py-1">
                    <div>
                      <PlayGroundImportTemplate {...extendArgs} />
                    </div>
                  </div>
                  <section>
                    <div className="tw-px-1 tw-py-1">
                      <PlayGroundListSlots {...extendArgs} />
                    </div>
                  </section>
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block" />
                <div className="tw-flex-1">
                  <img src={previewImage} alt="Preview" />
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block" />
                <div className="tw-flex-1">
                  <div className="tw-px-1 tw-py-1">
                    <div>
                      <label className="tw-flex tw-flex-wrap tw-items-center tw-mb-0">
                        <input
                          type="checkbox"
                          className="tw-mr-1"
                          checked={autoPreview}
                          onChange={() => setAutoPreview(!autoPreview)}
                        />
                        <span>Preview Automático</span>
                      </label>
                    </div>
                    <div className="tw-my-2" />
                    <div>
                      <div
                        children={
                          <Button
                            title="Aperte alt para baixar o preview"
                            href={previewImage}
                            onClick={(e) => {
                              e.persist();
                              if (!e.altKey) {
                                e.preventDefault();
                                window.open(previewImage, "blank");
                              }
                            }}
                            download="preview.jpg"
                            variant="secondary"
                            className="tw-w-full"
                            as="a"
                            children={<span>Baixar Preview</span>}
                          />
                        }
                      />
                      <div className="tw-mb-1" />
                      <div
                        children={
                          <Button
                            title="Aperte alt para baixar o template"
                            onClick={async (e) => {
                              e.persist();
                              const exportedTemplate = new Blob(
                                [
                                  JSON.stringify({
                                    ...template,
                                    model: {
                                      ...template.model,
                                      staticImages: await Promise.all(
                                        template.model.staticImages.map(
                                          async ({ url, ...rest }) => ({
                                            url: await blobAsB64(
                                              await blobFromURL(url),
                                            ),
                                            ...rest,
                                          }),
                                        ),
                                      ),
                                    },
                                  }),
                                ],
                                {
                                  type: "application/json;charset=utf-8",
                                },
                              );
                              if (e.altKey) {
                                FileSaver.saveAs(
                                  exportedTemplate,
                                  "template.json",
                                );
                              } else {
                                window.open(
                                  URL.createObjectURL(exportedTemplate),
                                  "blank",
                                );
                              }
                            }}
                            variant="secondary"
                            className="tw-w-full"
                            children={<span>Baixar Template</span>}
                          />
                        }
                      />
                      <div className="tw-mb-1" />
                      <Button
                        className="tw-w-full"
                        disabled={!hasChanges && !autoPreview}
                        onClick={() => generatePreview()}
                      >
                        Gerar Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="tw-bg-gray-100 tw-text-gray-900 tw-font-semibold tw-py-10">
            <div className="tw-container tw-mx-auto tw-max-w-4xl tw-w-full tw-px-4 lg:tw-px-0">
              <section>
                <PlayGroundAbout />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
