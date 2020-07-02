import * as React from "react";
import padleftArrIndex from "../utils/padleft-arr-index";

const HomeListSlots = ({ doc }) => (
  <ul>
    {doc.model.fabricExported.objects.map((object, idx, { length }) => (
      <React.Fragment key={idx}>
        <li>
          <div className="tw-flex tw-flex-wrap">
            <p>Slot #{padleftArrIndex(idx + 1, { length }, 0)}</p>
          </div>
        </li>
      </React.Fragment>
    ))}
  </ul>
);

export default HomeListSlots;
