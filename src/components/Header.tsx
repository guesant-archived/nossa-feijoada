import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, NavLinkProps } from "react-router-dom";

const getRandom = () => Math.random().toString().replace(".", "");

const ids = {
  mainnav: getRandom() + "mainnav",
};

export const Header = () => {
  const links: NavLinkProps[] = [
    {
      to: "/editor",
      children: "Editor",
    },
  ];
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/">
        <Navbar.Brand>BaianoSim</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls={ids.mainnav} />
      <Navbar.Collapse id={ids.mainnav}>
        <Nav>
          {links.map(({ ...props }, idx) => (
            <NavLink
              key={idx}
              className="hover:tw-text-white tw-text-white tw-opacity-50 tw-mr-1"
              activeClassName="tw-opacity-100"
              {...props}
            />
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
