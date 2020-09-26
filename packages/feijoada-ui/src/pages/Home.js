import mdIt from "markdown-it";
import * as React from "react";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeImportTemplate from "../components/HomeImportTemplate";
import HomeListSlots from "../components/HomeSlots";
import HomeAbout from "../contents/HomeAbout.md";
import getPreview from "../utils/get-preview";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";

const md = mdIt();

const Home = () => {
  const [about, setAbout] = React.useState("");
  const [template, setTemplate] = React.useState(EDITOR_DEFAULT_TEMPLATE);
  const [hasPreviewChanges, setHasPreviewChanges] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const [autoPreview, setAutoPreview] = React.useState(true);

  const onUpdateDoc = (doc) => {
    setTemplate(doc);
    setHasPreviewChanges(true);
  };

  const generatePreview = async () => {
    URL.revokeObjectURL(preview);
    await getPreview(template, { format: "jpeg" }).then((preview) =>
      setPreview(preview),
    );
    setHasPreviewChanges(false);
  };

  React.useEffect(() => {
    autoPreview && generatePreview();
  }, [autoPreview, template]); // eslint-disable-line

  React.useEffect(() => {
    const getAbout = async () => {
      fetch(HomeAbout)
        .then((res) => res.text())
        .then((about) =>
          setAbout(
            md
              .render(about)
              .replace(/<a/g, '<a target="_blank" rel="noopener noreferrer"'),
          ),
        );
    };
    getAbout();
  });

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
                      <HomeImportTemplate onUpdateDoc={onUpdateDoc} />
                    </div>
                  </div>
                  <section>
                    <div className="tw-px-1 tw-py-1">
                      <HomeListSlots doc={template} onUpdateDoc={onUpdateDoc} />
                    </div>
                  </section>
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block"></div>
                <div className="tw-flex-1">
                  <img src={preview} alt="Preview" />
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block"></div>
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
                    <div className="tw-my-2"></div>
                    <div>
                      <div>
                        <Button
                          href={preview}
                          download="preview.jpg"
                          variant="secondary"
                          className="tw-w-full"
                        >
                          Baixar Preview
                        </Button>
                      </div>
                      <div className="tw-mb-1"></div>
                      <Button
                        className="tw-w-full"
                        disabled={!hasPreviewChanges && !autoPreview}
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
                <div dangerouslySetInnerHTML={{ __html: about }} />
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
