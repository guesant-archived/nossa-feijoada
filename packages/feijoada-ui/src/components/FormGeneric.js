import * as React from "react";
import Form from "react-bootstrap/Form";

const FormGeneric = ({ formGruop, formLabel, formControl }) => (
  <Form.Group {...formGruop.props}>
    <Form.Label>{formLabel.text}</Form.Label>
    <Form.Control size="sm" {...formControl.props} />
  </Form.Group>
);

export default FormGeneric;
