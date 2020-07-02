import * as React from "react";
import Form from "react-bootstrap/Form";

const FONT_FAMILIES = [
  ["100", "Fino"],
  ["200", "Extra Leve"],
  ["300", "Leve"],
  ["400", "Normal"],
  ["500", "Médio"],
  ["600", "Semi Bold"],
  ["700", "Bold"],
  ["800", "Extra Bold"],
  ["900", "Black"],
];
const BASE_ID = ["pags", "editor", "-core", "-stack", "-item", "-txtbx"];

const parseFontWeight = (value) => (value === "normal" ? "400" : value);
const getFontWeight = ({ object }) => object.fontWeight;
const getId = (keys) => [...BASE_ID, ...keys].join("--");
const randomId = (keys, len = 4) =>
  getId([
    ...keys,
    String(parseInt(Math.random() * 10 ** len)).padStart(len, "0"),
  ]);

const SpecificTextBox = ({ object, onUpdateObject }) => {
  const ID_FORM_INPUT_FILL = randomId(["form", "fill"]);
  const ID_FORM_INPUT_TBC = randomId(["form", "textBackgroundColor"]);
  const ID_FORM_INPUT_FONT_WEIGHT = randomId(["form", "fontWeight"]);
  const ID_FORM_INPUT_FONT_FAMILY = randomId(["form", "fontFamily"]);
  return (
    <div className="tw-flex tw-flex-col tw-flex-wrap tw-bg-gray-200 tw-px-3 tw-py-2">
      <div>
        <div className="tw-flex tw-flex-wrap tw-mb-1">
          <input
            id={ID_FORM_INPUT_FILL}
            type="color"
            value={object.fill || "#000000"}
            onChange={({ target: { value } }) => {
              onUpdateObject({ ...object, fill: value });
            }}
          />
          <Form.Label htmlFor={ID_FORM_INPUT_FILL} className="tw-mb-0">
            Cor do Texto
          </Form.Label>
        </div>
        <div className="tw-flex tw-flex-wrap tw-mb-1">
          <input
            id={ID_FORM_INPUT_TBC}
            type="color"
            {...{
              ...(object.textBackgroundColor
                ? {
                    value: object.textBackgroundColor,
                  }
                : {}),
            }}
            onChange={({ target: { value } }) => {
              onUpdateObject({ ...object, textBackgroundColor: value });
            }}
          />
          <Form.Label htmlFor={ID_FORM_INPUT_TBC} className="tw-mb-0">
            Cor de Fundo do Texto
          </Form.Label>
        </div>
      </div>
      <div className="tw-mb-2"></div>
      <div>
        <Form.Group className="tw-mb-1" controlId={ID_FORM_INPUT_FONT_FAMILY}>
          <Form.Label className="tw-sr-only">Fonte</Form.Label>
          <Form.Control
            value={object.fontFamily}
            onChange={({ target: { value } }) => {
              onUpdateObject({ ...object, fontFamily: value });
            }}
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group className="tw-mb-2" controlId={ID_FORM_INPUT_FONT_WEIGHT}>
          <Form.Label className="tw-sr-only">Peso da Fonte</Form.Label>
          <Form.Control
            as="select"
            value={parseFontWeight(getFontWeight({ object }))}
            onChange={({ target: { value } }) => {
              onUpdateObject({ ...object, fontWeight: value });
            }}
            custom
          >
            {FONT_FAMILIES.map(([value, display]) => (
              <option key={value} value={value}>
                {display || value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </div>
    </div>
  );
};

export default SpecificTextBox;
