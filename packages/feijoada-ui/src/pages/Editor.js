import * as React from "react";
import Header from "../components/Header";
import EditorHeader from "./EditorHeader";

const Editor = () => (
  <div
    className="tw-flex tw-flex-col tw-h-full tw-min-h-screen tw-bg-gray-900 tw-text-white"
  >
    <Header />

    <div className="tw-py-8">
      <EditorHeader />
    </div>
  </div>
);

export default Editor;
