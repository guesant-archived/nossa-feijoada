import * as React from "react";
import GroupContainer from "../components/GroupContainer";
import GroupContainerBorder from "../components/GroupContainerBorder";

export default class EditorCore extends React.Component {
  constructor(props) {
    super(props);
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
