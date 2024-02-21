import React from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";

export default function Main() {
  return (
    <React.Fragment>
      <NavBar />
      <CollapseSiderMenu />
    </React.Fragment>
  );
}
