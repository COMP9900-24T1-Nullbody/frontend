import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="title">
      <p>建设中的页面：</p>
      <Link to="/login">login页面</Link>
      <br />
      <Link to="/register">register页面</Link>
      <br />
      <Link to="/main">main页面</Link>
    </div>
  );
}
