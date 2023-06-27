// components/Layout.js
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Layout Container</h1>
      <header>{/* Place your header content here */}</header>
      <main style={{border: `solid 1px black`}}>{children}</main>
      <footer>{/* Place your footer content here */}</footer>
    </div>
  );
};

export default Layout;
