import Layout from "../src/shared/layout/layout";
import Head from "next/head";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import { useSession } from "next-auth/client";

const Bookmarked = () => {
  const [userInput, setUserInput] = useState("");
  const [session, loading] = useSession();

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  return (
    <Layout>
      <Head>
        <title>Entertainment - Bookmarked</title>
        <meta name="description" content="Entertainment - Bookmarked" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search
        onSubmitUserData={submitUserDataHandler}
        prompt="Search for bookmarked shows"
      />

      {session && (
        <div>
          <p className="bookmarkWarning">
            There are no bookmarked shows!
          </p>
        </div>
      )}

      {!session && (
        <div>
          <p className="bookmarkWarning">
            You must be logged in to see bookmarked shows!
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Bookmarked;
