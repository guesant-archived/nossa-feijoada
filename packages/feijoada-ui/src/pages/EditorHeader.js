import * as React from "react";
import PageIntro from "../components/PageIntro";
import { PageIntroHeader1 } from "../components/PageIntroHeader";

const EditorHeader = () => (
  <section className="tw-py-8">
    <PageIntro>
      <PageIntroHeader1>@bsim/template-editor</PageIntroHeader1>
    </PageIntro>
  </section>
);

export default EditorHeader;
