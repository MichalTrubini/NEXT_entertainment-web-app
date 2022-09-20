import Layout from "../src/shared/layout/layout";
import Head from "next/head";
import Search from "../src/shared/components/search/search";
import { useState } from "react";

const Bookmarked = () => {
  const [userInput, setUserInput] = useState("");

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

      <div>
        <p className="bookmarkWarning">
          You must be logged in to see bookmarked shows!
        </p>
      </div>
    </Layout>
  );
};

export default Bookmarked;
