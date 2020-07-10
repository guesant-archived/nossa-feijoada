import * as React from "react";
import * as bsimCore from "@bsim/core";
import { fabric } from "fabric";
import Form from "react-bootstrap/Form";
import {
  GroupSeparatorVertical,
  GroupSeparatorHorizontal,
} from "../components/GroupSeparator";
import GroupContainer from "../components/GroupContainer";
import GroupContainerBorder from "../components/GroupContainerBorder";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";
import EditorCoreDoc from "./EditorCoreDoc";
import EditorCoreInfo from "./EditorCoreInfo";
import EditorCoreSketch from "./EditorCoreSketch";
import EditorCoreStackList from "./EditorCoreStackList";
import EditorCoreStackFooter from "./EditorCoreStackFooter";
import EditorCoreStaticList from "./EditorCoreStaticList";
import EditorCoreStaticFooter from "./EditorCoreStaticFooter";
import HomeImportTemplate from "../components/HomeImportTemplate";

const {
  fabric: {
    getCanvas: { canvasByDOM },
    render: { renderTemplate },
  },
  lib: {
    model: {
      mutations: {
        ADD_OBJECT,
        ADD_STATIC_IMAGE,
        REMOVE_OBJECT,
        REMOVE_STATIC_IMAGE,
        UPDATE_OBJECT,
        UPDATE_STATIC_IMAGE,
        GENERATE_FABRIC_EXPORTED,
      },
    },
  },
} = bsimCore;

const _canvasByDOM = canvasByDOM({
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
      doc: EDITOR_DEFAULT_TEMPLATE,
    };
    this.refdiv = React.createRef();
  }
  async disposeCanvas() {
    if (GET_CANVAS()) {
      const canvas = GET_CANVAS();
      canvas.dispose();
      DELETE_CANVAS();
    }
  }
  getCanvas() {
    return _canvasByDOM({
      wrapper: this.refdiv.current,
      id: "pgs--editr--canvas-plgrnd",
    });
  }
  async setupCanvas() {
    await this.disposeCanvas();
    const DISPLAY_CANVAS_BORDER = true;
    const _getCanvas = this.getCanvas();
    const canvas = _getCanvas({
      doc: this.state.doc,
    });
    canvas.set(this.state.doc.model.sketch);
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
    await _renderTemplate({ canvas: GET_CANVAS() })({
      doc: this.state.doc,
    })();
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
  async removeStaticImage(idx) {
    await new Promise((resolve) => {
      this.setState(REMOVE_STATIC_IMAGE({ idx }), resolve);
    });
  }
  async updateStatic(idx, updated) {
    await new Promise((resolve) => {
      this.setState(UPDATE_STATIC_IMAGE(idx, updated), resolve);
    });
  }
  async addStaticImage(staticImages) {
    await new Promise((resolve) => {
      this.setState(ADD_STATIC_IMAGE({ staticImages }), resolve);
    });
  }
  async addObject(fabricObject) {
    await new Promise((resolve) => {
      this.setState(ADD_OBJECT({ object: fabricObject.toObject() }), resolve);
    });
  }
  async removeObject(idx) {
    await new Promise((resolve) => {
      this.setState(REMOVE_OBJECT({ idx }), resolve);
    });
  }
  async updateObject(idx, updated) {
    await new Promise((resolve) => {
      this.setState(UPDATE_OBJECT(idx, updated), resolve);
    });
  }
  render() {
    return (
      <GroupContainer>
        <GroupContainerBorder>
          <div className="tw-flex-1">
            <div className="tw-px-2">
              <div className="tw-py-2">
                <EditorCoreDoc
                  doc={this.state.doc}
                  onSetState={async (state) =>
                    new Promise((resolve) => this.setState(state, resolve))
                  }
                />
              </div>
              <GroupSeparatorHorizontal />
              <div className="tw-py-2">
                <div>
                  <EditorCoreSketch
                    doc={this.state.doc}
                    onSetState={async (state) => {
                      await new Promise((resolve) =>
                        this.setState(state, resolve),
                      );
                      await this.forceRenderFabric();
                    }}
                  />
                </div>
                <div className="tw-mb-1">
                  <Form.Group className="tw-mb-0">
                    <Form.Label className="tw-sr-only">
                      Imagens Estáticas
                    </Form.Label>
                    <EditorCoreStaticList
                      staticImages={this.state.doc.model.staticImages}
                      onStaticImageRemove={async (idx) => {
                        try {
                          const { doc } = this.state;
                          const staticImage = doc.model.staticImages[idx];
                          URL.revokeObjectURL(staticImage.url);
                        } catch (_) {}
                        await this.removeStaticImage(idx);
                        await this.forceRenderFabric();
                      }}
                      onStaticImageUpdate={async (idx, updated) => {
                        await this.updateStatic(idx, updated);
                        await this.forceRenderFabric();
                      }}
                    />
                  </Form.Group>
                  <EditorCoreStaticFooter
                    onStaticImageAdd={async (images) => {
                      await this.addStaticImage(images);
                      await this.forceRenderFabric();
                    }}
                  />
                </div>
              </div>
              <GroupSeparatorHorizontal />
              <div className="tw-py-2">
                <Form.Group className="tw-mb-0">
                  <Form.Label>Stack</Form.Label>
                  <EditorCoreStackList
                    objects={this.state.doc.model.fabricExported.objects}
                    onUpdateObject={async (idx, object) => {
                      await this.updateObject(idx, object);
                      await this.forceRenderFabric();
                    }}
                    onRemoveObject={async (idx) => {
                      await this.removeObject(idx);
                      await this.forceRenderFabric();
                    }}
                  />
                  <EditorCoreStackFooter
                    onAddObject={async (obj) => {
                      await this.addObject(obj);
                      await this.forceRenderFabric();
                    }}
                  />
                </Form.Group>
              </div>
              <div className="tw-pb-2">
                <HomeImportTemplate
                  buttonProps={{
                    className: "tw-w-full",
                  }}
                  onUpdateDoc={async (doc) => {
                    await new Promise((resolve) => {
                      this.setState({ doc }, resolve);
                    });
                    await this.forceRenderFabric();
                  }}
                />
              </div>
            </div>
          </div>
          <GroupSeparatorVertical />
          <div className="tw-relative">
            <div className="tw-sticky tw-bg-gray-900" style={{ top: 0 }}>
              <div>
                <div ref={this.refdiv}></div>
              </div>
              <EditorCoreInfo doc={this.state.doc} />
            </div>
          </div>
        </GroupContainerBorder>
      </GroupContainer>
    );
  }
}
