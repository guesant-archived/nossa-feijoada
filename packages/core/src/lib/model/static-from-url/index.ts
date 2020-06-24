import { IBSIMTemplateStatic } from "../../../../types/IBSIMTemplateDoc";

const staticFromURL = ({
  url,
}: {
  url: IBSIMTemplateStatic["url"];
}): IBSIMTemplateStatic => ({
  url,
  position: "back",
});

export default staticFromURL;
