import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import Layout from "../src/shared/layout/layout";
import { getSession } from "next-auth/react";

const Home = ({media, bookmarks }) => {
  const [userInput, setUserInput] = useState("");

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const dataSearched = media.filter((item) =>
    item.title.toLowerCase().includes(userInput)
  );

  const trending = media.filter((item) => item.isTrending === true);

  const recommended = media.filter((item) => item.isTrending === false);

  return (
    <Layout>
      <Head>
        <title>Entertainment app</title>
        <meta name="description" content="Entertainment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search
        onSubmitUserData={submitUserDataHandler}
        prompt="Search for movies or TV series"
      />

      {userInput.length === 0 && (
        <>
          <h2 className="header">Trending</h2>
          <div className="videos-trending">
            {trending.map((item) => (
              <VideoItem
                key={item._id}
                bookmarks={bookmarks}
                dataid={item._id}
                src={item.thumbnail.trending.large}
                alt={item.title}
                year={item.year}
                rating={item.rating}
                title={item.title}
                category={item.category}
                categoryIcon={
                  item.category === "Movie" ? movieIcon : seriesIcon
                }
                classNameRow="trendingRow"
                classNameImage="media-container-trending"
                classNameTopRow="toprow-trending"
                classNameBottomRow="bottomrow-trending"
              />
            ))}
          </div>
          <h2 className="header">Recommended for you</h2>
          <div className="videos">
            {recommended.map((item) => (
              <VideoItem
                key={item._id}
                bookmarks={bookmarks}
                dataid={item._id}
                src={item.thumbnail.regular.large}
                year={item.year}
                rating={item.rating}
                title={item.title}
                category={item.category}
                categoryIcon={
                  item.category === "Movie" ? movieIcon : seriesIcon
                }
                classNameImage="media-container"
                classNameTopRow="toprow"
                classNameBottomRow="bottomrow"
              />
            ))}
          </div>
        </>
      )}

      {userInput.length !== 0 && (
        <>
          <h2 className="header">{`Found ${dataSearched.length} ${
            dataSearched.length === 1 ? "result" : "results"
          } for '${userInput}'`}</h2>
          <div className="videos">
            {dataSearched.map((item) => (
              <VideoItem
                key={item._id}
                bookmarks={bookmarks}
                dataid={item._id}
                src={item.thumbnail.regular.large}
                alt={item.title}
                year={item.year}
                rating={item.rating}
                title={item.title}
                category={item.category}
                categoryIcon={
                  item.category === "Movie" ? movieIcon : seriesIcon
                }
                classNameImage="media-container"
                classNameTopRow="toprow"
                classNameBottomRow="bottomrow"
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority`
  );
  const db = client.db();

  const media = db.collection("media");
  const users = db.collection("users");

  const documents = await media.find().toArray();

  if (session) {

    const emailLoggedUser = session.user.email;

    const documentsBookmarks = await users
      .find({ email: emailLoggedUser }, { bookmarks: 1, _id: 0 })
      .toArray();

    const bookmarksRaw = documentsBookmarks.map((document) => [
      document.bookmarks,
    ]);
    const bookmarks = bookmarksRaw[0][0].map((str) => {
      return Number(str);
    });

    client.close();

    return {
      props: {
        media: documents,
        bookmarks: bookmarks,
      },
    };
  }
else {

  client.close();
  
  return {
  props: {
    media: documents,
  },
}
}

}

export default Home;
