import * as React from "react";

import Header from "../components/Header";
import getPreview from "../utils/get-preview";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";
import HomeImportTemplate from "../components/HomeImportTemplate";

const Home = () => {
  const [doc, setDoc] = React.useState(EDITOR_DEFAULT_TEMPLATE);
  const [preview, setPreview] = React.useState("");

  const onUpdateDoc = (doc) => {
    setDoc(doc);
  };

  const generatePreview = async () => {
    URL.revokeObjectURL(preview);
    await getPreview({ doc }, { format: "jpeg" }).then((preview) =>
      setPreview(preview),
    );
  };

  React.useEffect(() => {
    generatePreview();
  }, [doc]); // eslint-disable-line

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
                      <HomeOpenTemplate onUpdateDoc={onUpdateDoc} />
                    </div>
                  </div>
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block"></div>
                <div className="tw-flex-1">
                  <img src={preview} alt="Preview" />
                </div>
                <div className="tw-bg-gray-800 tw-opacity-75 tw-h-1 sm:tw-h-auto sm:tw-w-1 tw-hidden sm:tw-block"></div>
                <div className="tw-flex-1">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
