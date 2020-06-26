import * as React from "react";
import * as bsimCore from "@bsim/core";
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

const {
  lib: {
    model: {
      mutations: {
        ADD_OBJECT,
        UPDATE_OBJECT,
      },
    },
  },
} = bsimCore;

export default class EditorCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: EDITOR_DEFAULT_TEMPLATE,
    };
  }
  async addObject(fabricObject) {
    await new Promise((resolve) => {
      this.setState(ADD_OBJECT({ object: fabricObject.toObject() }), resolve);
    });
  }
  async updateObject(idx, updatedObject) {
    await new Promise((resolve) => {
      this.setState(UPDATE_OBJECT({ idx, updatedObject }), resolve);
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
                    new Promise((resolve) => this.setState(state, resolve))}
                />
              </div>
              <GroupSeparatorHorizontal />
              <div className="tw-py-2">
                <div>
                  <EditorCoreSketch
                    doc={this.state.doc}
                    onSetState={async (state) => {
                      await new Promise((resolve) =>
                        this.setState(state, resolve)
                      );
                    }}
                  />
                </div>
              </div>
          </div>
          </div>
          <GroupSeparatorVertical />
          <div>
            <div ref={this.refdiv}></div>
            <EditorCoreInfo doc={this.state.doc} />
            </div>
        </GroupContainerBorder>
      </GroupContainer>
    );
  }
  }
