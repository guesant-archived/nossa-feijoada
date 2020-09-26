import { canvasByDom } from "@fantastic-images/core/dist/fabric/get-canvas/canvas-by-dom";
import { renderTemplate } from "@fantastic-images/core/dist/fabric/render/render-template";
import {
  ADD_OBJECT,
  ADD_STATIC_IMAGE,
  GENERATE_FABRIC_EXPORTED,
  REMOVE_OBJECT,
  REMOVE_STATIC_IMAGE,
  UPDATE_OBJECT,
  UPDATE_STATIC_IMAGE,
} from "@fantastic-images/lib/dist/model/mutations";
import { fabric } from "fabric";
import * as React from "react";
import Form from "react-bootstrap/Form";
import GroupContainer from "../components/GroupContainer";
import GroupContainerBorder from "../components/GroupContainerBorder";
import {
  GroupSeparatorHorizontal,
  GroupSeparatorVertical,
} from "../components/GroupSeparator";
import HomeImportTemplate from "../components/HomeImportTemplate";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";
import EditorCoreDoc from "./EditorCoreDoc";
import EditorCoreInfo from "./EditorCoreInfo";
import EditorCoreSketch from "./EditorCoreSketch";
import EditorCoreStackFooter from "./EditorCoreStackFooter";
import EditorCoreStackList from "./EditorCoreStackList";
import EditorCoreStaticFooter from "./EditorCoreStaticFooter";
import EditorCoreStaticList from "./EditorCoreStaticList";

const _canvasByDOM = canvasByDom({
  fabric,
  document: window.document,
});
const _renderTemplate = renderTemplate({ fabric });

const GET_CANVAS = () => window.EDITOR_CANVAS;
const SET_CANVAS = (canvas) => {
  window.EDITOR_CANVAS = canvas;
  return canvas;
};
const DELETE_CANVAS = () => {
  delete window.EDITOR_CANVAS;
};

export default class EditorCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: EDITOR_DEFAULT_TEMPLATE,
    };
    this.refdiv = React.createRef();
    this.updateTemplate = this.updateTemplate.bind(this);
    this.forceRenderFabric = this.forceRenderFabric.bind(this);
  }
  async disposeCanvas() {
    if (GET_CANVAS()) {
      const canvas = GET_CANVAS();
      canvas.dispose();
      DELETE_CANVAS();
    }
  }
  getCanvas() {
    return canvasByDom({ fabric })({ document: window.document })({
      wrapper: this.refdiv.current,
      id: "pgs--editr--canvas-plgrnd",
    });
  }
  async setupCanvas() {
    await this.disposeCanvas();
    const DISPLAY_CANVAS_BORDER = true;
    const canvas = this.getCanvas()(this.state.template);
    canvas.set(this.state.template.model.sketch);
    canvas.on("object:modified", () => {
      this.exportObjects();
    });
    canvas.on("object:removed", () => {
      this.exportObjects();
    });
    if (DISPLAY_CANVAS_BORDER) {
      canvas.wrapperEl.style.borderColor = "#f0f";
      canvas.wrapperEl.style.borderWidth = "2px";
      canvas.wrapperEl.style.boxSizing = "content-box";
    }
    return SET_CANVAS(canvas);
  }
  async renderFabric() {
    await renderTemplate({ fabric })({ canvas: GET_CANVAS() })(
      this.state.template,
    );
  }
  async forceRenderFabric() {
    await this.setupCanvas();
    await this.renderFabric();
  }
  async componentDidMount() {
    await this.forceRenderFabric();
  }
  async exportObjects() {
    await new Promise((resolve) => {
      const canvas = GET_CANVAS();
      this.setState(
        (state) =>
          GENERATE_FABRIC_EXPORTED({
            objects: canvas
              .getObjects()
              .slice(state.doc.model.staticImages.length)
              .map((object) => object.toObject()),
          })(state),
        resolve,
      );
    });
  }
  async updateTemplate(template) {
    await new Promise((resolve) => this.setState({ template }, resolve));
  }
  render() {
    return (
      <GroupContainer>
        <GroupContainerBorder>
          <div className="tw-flex-1">
            <div className="tw-px-2">
              <div className="tw-py-2">
                <EditorCoreDoc {...this} />
              </div>
              <GroupSeparatorHorizontal />
              <div className="tw-py-2">
                <div>
                  <EditorCoreSketch {...this} />
                </div>
                <div className="tw-mb-1">
                  <Form.Group className="tw-mb-0">
                    <Form.Label className="tw-sr-only">
                      Imagens Estáticas
                    </Form.Label>
                    <EditorCoreStaticList
                      staticImages={this.state.template.model.staticImages}
                      onStaticImageRemove={async (idx) => {
                        try {
                          const { template: doc } = this.state;
                          const staticImage = doc.model.staticImages[idx];
                          URL.revokeObjectURL(staticImage.url);
                        } catch (_) {}
                        await new Promise((resolve) => {
                          this.setState(REMOVE_STATIC_IMAGE({ idx }), resolve);
                        });
                        await this.forceRenderFabric();
                      }}
                      onStaticImageUpdate={async (idx, updated) => {
                        await new Promise((resolve) => {
                          this.setState(
                            UPDATE_STATIC_IMAGE(idx, updated),
                            resolve,
                          );
                        });
                        await this.forceRenderFabric();
                      }}
                    />
                  </Form.Group>
                  <EditorCoreStaticFooter {...this} />
                </div>
              </div>
              <GroupSeparatorHorizontal />
              <div className="tw-py-2">
                <Form.Group className="tw-mb-0">
                  <Form.Label>Stack</Form.Label>
                  <EditorCoreStackList
                    objects={this.state.template.model.fabricExported.objects}
                    onUpdateObject={async (idx, object) => {
                      await new Promise((resolve) => {
                        this.setState(UPDATE_OBJECT(idx, object), resolve);
                      });
                      await this.forceRenderFabric();
                    }}
                    onRemoveObject={async (idx) => {
                      await new Promise((resolve) => {
                        this.setState(REMOVE_OBJECT({ idx }), resolve);
                      });
                      await this.forceRenderFabric();
                    }}
                  />
                  <EditorCoreStackFooter
                    onAddObject={async (obj) => {
                      await new Promise((resolve) => {
                        this.setState(
                          ADD_OBJECT({ object: obj.toObject() }),
                          resolve,
                        );
                      });
                      await this.forceRenderFabric();
                    }}
                  />
                </Form.Group>
              </div>
              <div className="tw-pb-2">
                <HomeImportTemplate {...this} />
              </div>
            </div>
          </div>
          <GroupSeparatorVertical />
          <div className="tw-relative">
            <div className="tw-sticky tw-bg-gray-900" style={{ top: 0 }}>
              <div>
                <div ref={this.refdiv}></div>
              </div>
              <EditorCoreInfo doc={this.state.template} />
            </div>
          </div>
        </GroupContainerBorder>
      </GroupContainer>
    );
  }
}
