import * as React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Generic from "../components/EditorStack/Generic";
import GenericLabel from "../components/EditorStack/GenericLabel";
import {
  isSupported,
  specificComponent,
  specificLabel,
} from "../components/EditorStack/Specific";

const ITEM_BASE_ID = "editor-stack--item";
const EVENT_BASE_ID = "edtr--core--stack--list---evkey";
const ekey = (idx) => `${EVENT_BASE_ID}-${idx}`;
const getItemBaseID = (itemInfo, id) =>
  [ITEM_BASE_ID, ...itemInfo, id].join("--");

const EditorCoreStackList = ({ objects, onUpdateObject, onRemoveObject }) => (
  <ul>
    {objects.map((object, idx, arr) => (
      <li key={idx}>
        <Accordion>
          <Card bg="primary" text="white">
            <Accordion.Toggle as={Card.Header} eventKey={ekey(idx)}>
              <div className="tw-flex tw-items-center tw-flex-wrap">
                <div className="tw-flex-1">
                  <p>
                    <span>{object.type}</span>
                    <span>
                      #
                      {String(idx + 1).padStart(
                        String(arr.length).length + 1,
                        "0",
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  <Button
                    variant="light"
                    onClick={async () => {
                      await onRemoveObject(idx);
                    }}
                  >
                    Remover {object.type}
                  </Button>
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={ekey(idx)}>
              <Card.Body>
                {[
                  [
                    { header: GenericLabel },
                    {
                      body: () => (
                        <Generic
                          object={object}
                          onUpdateObject={async (updatedObject) => {
                            await onUpdateObject(idx, updatedObject);
                          }}
                          {...{
                            baseID: getItemBaseID(["generic"], idx),
                          }}
                        />
                      ),
                    },
                  ],
                  ...(isSupported({ type: object.type })
                    ? [
                        [
                          {
                            header: specificLabel({ type: object.type }) || "",
                          },
                          {
                            body: () =>
                              React.createElement(
                                specificComponent({ type: object.type }),
                                {
                                  ...{
                                    object,
                                    onUpdateObject: async (updatedObject) => {
                                      await onUpdateObject(idx, updatedObject);
                                    },
                                  },
                                },
                              ),
                          },
                        ],
                      ]
                    : []),
                ].map(([{ header }, { body }], idx) => (
                  <Card key={idx} text="dark">
                    <Card.Header>{header}</Card.Header>
                    <Card.Body children={body()} />
                  </Card>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </li>
    ))}
  </ul>
);

export default EditorCoreStackList;
