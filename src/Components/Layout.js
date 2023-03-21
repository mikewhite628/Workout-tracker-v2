import Nav from "./Nav";
import Footer from "./Footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Chat from "./Chat";
import Head from "next/head";

export const DBContext = React.createContext();

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  //check is user is loggin in and in the database, if not add them
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    if (user) {
      let sub = user.sub;
      let name = user.name;
      let email = user.email;
      let picture = user.picture;

      let fetchUser = async () => {
        const result = await axios.post(`/api/getuser`, {
          sub,
        });
        if (result.data.length === 0) {
          const addResult = await axios.post(`/api/adduser`, {
            name: name,
            email: email,
            picture: picture,
            sub: user.sub,
          });
          console.log(addResult);
        }
        setDbUser(result.data);
      };
      fetchUser();
      console.log(dbUser);
    }
  }, [isLoading, user]);

  return (
    <DBContext.Provider value={dbUser}>
      <Head>
        <script src="https://kit.fontawesome.com/9bb19f9d25.js" async></script>
      </Head>
      <div className="layout relative">
        <Nav />
        <div className="content">{children}</div>
        {user ? <Chat /> : null}

        <Footer />
      </div>
    </DBContext.Provider>
  );
}
