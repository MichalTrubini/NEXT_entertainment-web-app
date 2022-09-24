import Header from "../components/header/header";
import Router from "next/router";
import { useState, useEffect } from "react";

const Layout = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  return (
    <div className={loading ? 'overlay page' : 'page'}>
      {loading && (
        <div className="dotWindmillContainer">
          <div className="dotWindmill"></div>
        </div>
      )}
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
