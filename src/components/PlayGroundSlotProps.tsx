import { TemplateObject } from "@fantastic-images/types";
import { PlayGroundExtendProps } from "../routes/playground/extend-playground";

export interface PlayGroundSlotProps extends PlayGroundExtendProps {
  object: TemplateObject;
  idx: number;
}
