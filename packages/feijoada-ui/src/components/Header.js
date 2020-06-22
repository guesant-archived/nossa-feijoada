import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

const getId = (i) => ["comp", "headr", ...i].join("--");

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link to="/">
      <Navbar.Brand>BaianoSim</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls={getId(["-mainnav"])} />
    <Navbar.Collapse id={getId(["-mainnav"])}>
      <Nav>
        {[
          {
            props: {
              to: "/editor",
            },
            children: "Editor",
          },
        ].map(({ props, children }, idx) => (
          <NavLink
            key={idx}
            className="hover:tw-text-white tw-text-white tw-opacity-50 tw-mr-1"
            activeClassName="tw-opacity-100"
            {...props}
          >
            {children}
          </NavLink>
        ))}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
