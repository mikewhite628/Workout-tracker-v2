import Nav from "./Nav";
import Footer from "./Footer";

import { useEffect } from "react";

export default function Layout({ children, pageProps }) {
  return (
    <div className="layout">
      <Nav />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
