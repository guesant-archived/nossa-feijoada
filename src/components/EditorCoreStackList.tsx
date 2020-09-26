import { REMOVE_OBJECT } from "@fantastic-images/lib/dist/model/mutations";
import * as React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Editor } from "../routes/editor";
import { EditorStackPosition } from "./EditorStackPosition";

const getKey = (idx: string | number) => `liststack-${idx}`;

export const EditorCoreStackList = ({ editor }: { editor: Editor }) => {
  const {
    state: { template },
    updateTemplate,
  } = editor;
  return (
    <ul>
      {template.model.fabricExported.objects.map((object, idx, { length }) => (
        <React.Fragment
          key={idx}
          children={
            <li key={idx}>
              <Accordion>
                <Card bg="primary" text="white">
                  <Accordion.Toggle as={Card.Header} eventKey={getKey(idx)}>
                    <div className="tw-flex tw-items-center tw-flex-wrap">
                      <div className="tw-flex-1">
                        <span>
                          <span>{object.type}</span>
                          <span>
                            #
                            {String(idx + 1).padStart(
                              String(length).length + 1,
                              "0",
                            )}
                          </span>
                        </span>
                      </div>
                      <div>
                        <Button
                          variant="light"
                          onClick={async () => {
                            await updateTemplate(
                              REMOVE_OBJECT({ idx: [idx] })(template),
                            );
                          }}
                        >
                          Remover {object.type}
                        </Button>
                      </div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={getKey(idx)}>
                    <Card.Body>
                      {[
                        [
                          () => <span>Posicionamento</span>,
                          () => (
                            <EditorStackPosition
                              idx={idx}
                              object={object}
                              editor={editor}
                            />
                          ),
                        ],
                      ].map(([header, body], idx) => (
                        <Card key={idx} text="dark">
                          <Card.Header children={header()} />
                          <Card.Body children={body()} />
                        </Card>
                      ))}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </li>
          }
        />
      ))}
    </ul>
  );
};
