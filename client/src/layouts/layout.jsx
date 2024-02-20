import HeaderView from "../components/HeaderViews/headerview";
import FooterView from "../components/FooterViews/footerview";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [isLogged, setIsLogged] = useState(
    localStorage.access_token ? true : false
  );
  return (
    <>
      <HeaderView context={{ isLogged, setIsLogged }} />

      <Outlet context={{ isLogged, setIsLogged }} />

      <FooterView />
    </>
  );
}
