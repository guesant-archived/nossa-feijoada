import * as React from "react";
import Form from "react-bootstrap/Form";
import { FormGroupProps } from "react-bootstrap/FormGroup";
import { FormLabelProps } from "react-bootstrap/FormLabel";
import { FormControlProps } from "react-bootstrap/FormControl";

export interface FormGenericProps {
  formGroup: FormGroupProps;
  formLabel: FormLabelProps;
  formControl: FormControlProps;
}

export const FormGeneric = ({
  formGroup,
  formLabel,
  formControl,
}: FormGenericProps) => (
  <Form.Group
    {...formGroup}
    children={
      <>
        <Form.Label {...formLabel} />
        <Form.Control size="sm" {...formControl} />
      </>
    }
  />
);
