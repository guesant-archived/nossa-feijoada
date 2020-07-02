import * as React from "react";
import Header from "../components/Header";
import EditorCore from "./EditorCore";

const Editor = () => (
  <div className="w-flex tw-flex-col tw-h-full tw-min-h-screen tw-bg-gray-900 tw-text-white">
    <Header />
    <div className="tw-py-8">
      <div className="tw-py-8">
        <EditorCore />
      </div>
    </div>
  </div>
);

export default Editor;
