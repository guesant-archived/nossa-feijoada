import * as React from "react";
import GroupContainer from "../components/GroupContainer";
import GroupContainerBorder from "../components/GroupContainerBorder";
import EDITOR_DEFAULT_TEMPLATE from "../vars/editor-default-template";

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
        </GroupContainerBorder>
      </GroupContainer>
    );
  }
  }
