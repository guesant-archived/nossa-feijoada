import * as React from "react";
import FormGeneric from "./FormGeneric";

const prepareId = (str) => str.toLocaleLowerCase().replace(/[^a-z0-9-]/g, "");
const randomIDNumber = (len = 4) =>
  String(parseInt(Math.random() * 10 ** len)).padStart(len, "0");

const generateId = ([fLabel], i) =>
  prepareId(
    ["comp", "fga", i || "0", fLabel || "", randomIDNumber()]
      .map(String)
      .filter(Boolean)
      .join("--"),
  );

const FormGenericAbstract = ([fLabel, fControl, fGruop], i) => (
  <FormGeneric
    key={generateId([fLabel], i)}
    {...{
      formLabel: { text: fLabel },
      formControl: {
        props: {
          placeholder: fControl[0],
          type: fControl[1] || "text",
          ...(fControl[2] || {}),
        },
      },
      formGruop: {
        props: {
          controlId: fGruop[0],
          ...(fGruop[1] || {}),
        },
      },
    }}
  />
);
export default FormGenericAbstract;
