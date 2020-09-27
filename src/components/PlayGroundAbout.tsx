import * as React from "react";
import { SafeLink } from "./SafeLink";

export const PlayGroundAbout = () => (
  <div>
    <p>
      Feito por Gabriel Rodrigues, com{" "}
      <SafeLink href="https://reactjs.org/" children="React" /> e{" "}
      <SafeLink href="https://fabricjs.com/" children="FabricJS" />.
    </p>
    <ul>
      {[
        "https://github.com/guesant/nossa-feijoada",
        "https://github.com/guesant",
      ].map((link, idx) => (
        <React.Fragment
          key={idx}
          children={
            <li>
              <SafeLink href={link} children={<>- {link}</>} />
            </li>
          }
        />
      ))}
    </ul>
  </div>
);
