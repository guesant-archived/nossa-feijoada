import * as React from "react";
import * as bsimCore from "@bsim/core";
import HomeSource from "./HomeSource";
import padleftArrIndex from "../utils/padleft-arr-index";

const {
  lib: {
    model: {
      mutations: { UPDATE_OBJECT },
    },
  },
} = bsimCore;

const HomeListSlots = ({ doc, onUpdateDoc }) => (
  <ul>
    {doc.model.fabricExported.objects.map((object, idx, { length }) => (
      <React.Fragment key={idx}>
        <li>
          <div className="tw-flex tw-flex-wrap">
            <p>Slot #{padleftArrIndex(idx + 1, { length }, 0)}</p>
            <span className="tw-mx-1">|</span>
            <HomeSource
              object={object}
              type={object.type}
              onObjectUpdate={async (updated) => {
                onUpdateDoc(UPDATE_OBJECT(idx, updated)({ doc }).doc);
              }}
            />
          </div>
        </li>
      </React.Fragment>
    ))}
  </ul>
);

export default HomeListSlots;
