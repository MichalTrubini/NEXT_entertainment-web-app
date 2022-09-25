import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import Layout from '../src/shared/layout/layout'
import { getSession } from "next-auth/react";

const Home = ({ TVShows, bookmarks }) => {
  const [userInput, setUserInput] = useState("");

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const dataSearched = TVShows.filter((item) => item.title.toLowerCase().includes(userInput));

  return (
    <Layout>
      <Head>
        <title>Entertainment - TV Series</title>
        <meta name="description" content="Entertainment - TV series" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search
        onSubmitUserData={submitUserDataHandler}
        prompt="Search for TV series"
      />
      {userInput.length === 0 && (
        <>
          <h2 className="header">TV Series</h2>
          <div className="videos">
            {TVShows.map((item) => (
              <VideoItem
                key={item.id}
                bookmarks={bookmarks}
                dataid={item.id}
                src={item.imageSmall}
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

      {userInput.length !== 0 && (
        <>
          <h2 className="header">{`Found ${dataSearched.length} ${
            dataSearched.length === 1 ? "result" : "results"
          } for '${userInput}'`}</h2>
          <div className="videos">
            {dataSearched.map((item) => (
              <VideoItem
                key={item.id}
                src={item.imageSmall}
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

  if (session) {
    const emailLoggedUser = session.user.email;

    const client = await MongoClient.connect(
      "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
    );

    const db = client.db();

    const media = db.collection("media");
    const users = db.collection("users");

    const documentsBookmarks = await users
      .find({ email: emailLoggedUser }, { bookmarks: 1, _id: 0 })
      .toArray();

    const bookmarksRaw = documentsBookmarks.map((document) => [
      document.bookmarks,
    ]);
    const bookmarks = bookmarksRaw[0][0].map((str) => {
      return Number(str);
    });

    const documentsTVShows = await media
      .find({ category: { $eq: "TV Series" } })
      .toArray();

    client.close();

    return {
      props: {
        TVShows: documentsTVShows.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.regular.small,
          imageMedium: document.thumbnail.regular.medium,
          imageLarge: document.thumbnail.regular.large,
        })),
        bookmarks: bookmarks
      },
    };
  }
  else {
  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("media");

  const documentsTVShows = await collection
    .find({ "category": { $eq: "TV Series" } })
    .toArray();

  client.close();

  return {
    props: {
      TVShows: documentsTVShows.map((document) => ({
        id: document._id,
        year: document.year,
        rating: document.rating,
        title: document.title,
        category: document.category,
        imageSmall: document.thumbnail.regular.small,
        imageMedium: document.thumbnail.regular.medium,
        imageLarge: document.thumbnail.regular.large,
      }))
    }
  };
}}

export default Home;
