// components/Layout.js
import React from "react";
import Search from "./Search";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Layout Container</h1>
      <Search />
      <main style={{ border: `solid 1px black` }}>{children}</main>
      <footer>{/* Place your footer content here */}</footer>
    </div>
  );
};

export default Layout;
