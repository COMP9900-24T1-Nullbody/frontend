import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="title">
      <p>建设中的页面：</p>
      <Link to="/reset">reset页面</Link>
      <br />
      <Link to="/login">login页面</Link>
      <br />
      <Link to="/register">register页面</Link>
      <br />
      <Link to="/main/single">single company页面</Link>
      <br />
      <Link to="/main/multi">multiple company页面</Link>
      <br />
      <Link to="/user/profile">profile页面</Link>
      <br />
      <Link to="/user/history">analysis history页面</Link>
    </div>
  );
}
