import { canvasByDom } from "@fantastic-images/core/dist/fabric/get-canvas";
import { renderTemplate } from "@fantastic-images/core/dist/fabric/render/render-template";
import { getStaticBack } from "@fantastic-images/lib/dist/model/get-static";
import { GENERATE_FABRIC_EXPORTED } from "@fantastic-images/lib/dist/model/mutations/generate-fabric-exported";
import { Template } from "@fantastic-images/types/src/Template";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
import * as React from "react";
import { Component } from "react";
import Form from "react-bootstrap/Form";
import { EditorCoreDoc } from "../../components/EditorCoreDoc";
import { EditorCoreInfo } from "../../components/EditorCoreInfo";
import { EditorCoreSketch } from "../../components/EditorCoreSketch";
import { EditorCoreStackFooter } from "../../components/EditorCoreStackFooter";
import { EditorCoreStackList } from "../../components/EditorCoreStackList";
import { EditorCoreStaticFooter } from "../../components/EditorCoreStaticFooter";
import { EditorCoreStaticList } from "../../components/EditorCoreStaticList";
import { GroupContainer } from "../../components/GroupContainer";
import { GroupContainerBorder } from "../../components/GroupContainerBorder";
import {
  GroupSeparatorHorizontal,
  GroupSeparatorVertical,
} from "../../components/GroupSeparator";
import { Header } from "../../components/Header";
import { PlayGroundImportTemplate } from "../../components/PlayGroundImportTemplate";
import { DEFAULT_TEMPLATE } from "../../helpers/default-template";
import equal from "deep-equal";

const needsFullRender = ([previousTemplate, currentTemplate]: [
  Template,
  Template,
]) =>
  !equal(previousTemplate.model.sketch, currentTemplate.model.sketch, {
    strict: true,
  }) ||
  !equal(
    previousTemplate.model.staticImages,
    currentTemplate.model.staticImages,
    {
      strict: true,
    },
  ) ||
  !equal(
    previousTemplate.model.fabricExported.objects.length,
    currentTemplate.model.fabricExported.objects.length,
    {
      strict: true,
    },
  );

export class Editor extends Component {
  ref = React.createRef<HTMLDivElement>();
  canvas?: Canvas;
  state = {
    template: DEFAULT_TEMPLATE,
  };
  setup = async () => {
    if (this.ref.current) {
      if (this.canvas) this.canvas.discardActiveObject();
      const canvas = canvasByDom({ fabric })({ document: window.document })({
        wrapper: this.ref.current,
        id: "canvasid",
      })(this.state.template);
      canvas.on(
        "object:modified",
        (e) => !["NO_EMIT"].includes(e?.e?.type) && this.exportObjects(),
      );
      this.ref.current.style.borderColor = "#f0f";
      this.ref.current.style.borderWidth = "2px";
      this.ref.current.style.boxSizing = "content-box";
      this.canvas = canvas;
    }
  };
  renderFabric = async () => {
    if (this.canvas) {
      await renderTemplate({ fabric })({ canvas: this.canvas })(
        this.state.template,
      );
    }
  };
  exportObjects = async () => {
    if (this.canvas) {
      const {
        template: {
          model: {
            fabricExported: {
              objects: { length },
            },
            staticImages,
          },
        },
      } = this.state;
      const staticBack = getStaticBack(staticImages);
      await this.updateTemplate(
        GENERATE_FABRIC_EXPORTED({
          objects: (this.canvas as Canvas)
            .getObjects()
            .slice(staticBack.length, staticBack.length + length)
            .map((object) => object.toObject()),
        })(this.state.template),
      );
    }
  };
  updateTemplate = async (
    template: Template,
    {
      render = true,
      forceRender = false,
    }: { render?: boolean; forceRender?: boolean } = {},
  ) => {
    const previousTemplate = Object.freeze(this.state.template);
    await new Promise((resolve) => this.setState({ template }, resolve));
    if (
      forceRender ||
      (render && needsFullRender([previousTemplate, Object.freeze(template)]))
    ) {
      await this.reset();
    } else if (render) {
      await this.renderFabric();
    }
  };
  reset = async () => {
    await this.setup();
    await this.renderFabric();
  };
  async componentDidMount() {
    await this.reset();
  }
  render() {
    return (
      <div className="w-flex tw-flex-col tw-h-full tw-min-h-screen tw-bg-gray-900 tw-text-white">
        <Header />
        <div className="tw-py-8">
          <div className="tw-py-8">
            <GroupContainer>
              <GroupContainerBorder>
                <div className="tw-flex-1">
                  <div className="tw-px-2">
                    <div className="tw-py-2">
                      <EditorCoreDoc editor={this} />
                    </div>
                    <GroupSeparatorHorizontal />
                    <div className="tw-py-2">
                      <div>
                        <EditorCoreSketch editor={this} />
                      </div>
                      <div className="tw-mb-1">
                        <Form.Group className="tw-mb-0">
                          <Form.Label
                            className="tw-sr-only"
                            children={"Imagens Estáticas"}
                          />
                          <EditorCoreStaticList editor={this} />
                        </Form.Group>
                        <EditorCoreStaticFooter editor={this} />
                      </div>
                    </div>
                    <GroupSeparatorHorizontal />
                    <div className="tw-py-2">
                      <Form.Group className="tw-mb-0">
                        <Form.Label>Stack</Form.Label>
                        <EditorCoreStackList editor={this} />
                        <EditorCoreStackFooter editor={this} />
                      </Form.Group>
                    </div>
                    <div className="tw-pb-2">
                      <PlayGroundImportTemplate
                        {...({} as any)}
                        updateTemplate={(template) => {
                          this.updateTemplate(template);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <GroupSeparatorVertical />
                <div className="tw-relative">
                  <div className="tw-sticky tw-bg-gray-900" style={{ top: 0 }}>
                    <div children={<div ref={this.ref} />} />
                    <EditorCoreInfo editor={this} />
                  </div>
                </div>
              </GroupContainerBorder>
            </GroupContainer>
          </div>
        </div>
      </div>
    );
  }
}
