import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";

import "./Logout.css";

export default function Logout() {
  useEffect(() => {
    axios
      .post("/api/v1/users/signout", {})
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          localStorage.removeItem("nc-token");
          window.location = "/";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <div className="logoutContainer">
      <Navbar onlyDisplayBrand={true} />
      <Footer />
    </div>
  );
}
