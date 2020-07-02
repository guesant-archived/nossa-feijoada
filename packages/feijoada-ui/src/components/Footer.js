import * as React from "react";
import { author } from "../../package.json";

const _author = author.slice(0, author.indexOf("<")).trim();
const footerNote = (_author && [_author, "-", "2020"].join(" ")) || [].join("");

const Footer = () => (
  <footer className="tw-p-5 tw-bg-gray-400 tw-text-gray-900 tw-font-bold">
    <div className="tw-container tw-mx-auto tw-max-w-4xl tw-w-full">
      <div className="tw-flex tw-flex-wrap tw-items-center">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-flex-1">
          <div>
            <div>
              <p>{footerNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
