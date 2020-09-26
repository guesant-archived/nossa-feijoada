import { Template } from "@fantastic-images/types";

export interface PlayGroundExtendProps {
  template: Template;
  updateTemplate: (template: Template) => void;
}
