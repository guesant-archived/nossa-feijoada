import * as React from "react";
import GroupContainer from "../components/GroupContainer";
import GroupContainerBorder from "../components/GroupContainerBorder";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";

import EditorCoreDoc from "./EditorCoreDoc";
import EditorCoreSketch from "./EditorCoreSketch";

export default class EditorCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: EDITOR_DEFAULT_TEMPLATE,
    };
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
        </GroupContainerBorder>
      </GroupContainer>
    );
  }
  }
