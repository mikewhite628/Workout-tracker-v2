import Nav from "./Nav";
import Footer from "./Footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Chat from "./Chat";
import Script from "next/script";

export const DBContext = React.createContext();

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  //check is user is loggin in and in the database, if not add them
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    if (user) {
      let sid = user.sid;
      let name = user.name;
      let email = user.email;
      let picture = user.picture;
      //set user in session storage

      let fetchUser = async () => {
        const result = await axios.get(`/api/getuser/${sid}`);

        if (result.data.length === 0) {
          const addResult = await axios.post(`/api/adduser`, {
            name: name,
            email: email,
            picture: picture,
            sid: user.sid,
          });
          console.log(addResult);
        }
        setDbUser(result.data);
      };
      fetchUser();
      //set user in session storage
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log(dbUser);
    }
  }, [isLoading]);

  return (
    <DBContext.Provider value={dbUser}>
      <Script
        src="https://kit.fontawesome.com/9bb19f9d25.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      ></Script>
      <div className="layout relative">
        <Nav />
        <div className="content">{children}</div>
        {user ? <Chat /> : null}

        <Footer />
      </div>
    </DBContext.Provider>
  );
}
