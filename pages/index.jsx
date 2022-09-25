import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import Layout from "../src/shared/layout/layout";
import { getSession } from "next-auth/react";

const Home = ({ dataRecommended, dataTrending, dataAll, bookmarks }) => {
  const [userInput, setUserInput] = useState("");


  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const dataSearched = dataAll.filter((item) =>
    item.title.toLowerCase().includes(userInput)
  );

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
            {dataTrending.map((item) => (
              <VideoItem
                key={item.id}
                bookmarks={bookmarks}
                dataid={item.id}
                src={item.imageLarge}
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
            {dataRecommended.map((item) => (
              <VideoItem
                key={item.id}
                bookmarks={bookmarks}
                dataid={item.id}
                src={item.imageLarge}
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
                bookmarks={bookmarks}
                dataid={item.id}
                src={item.imageLarge}
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
  const session = await getSession(context);

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
    })

    const documentsRecommended = await media
      .find({ "thumbnail.trending": { $eq: null } })
      .toArray();
    const documentsTrending = await media
      .find({ "thumbnail.trending": { $ne: null } })
      .toArray();

    const documents = await media.find().toArray();

    client.close();

    return {
      props: {
        dataRecommended: documentsRecommended.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.regular.small,
          imageMedium: document.thumbnail.regular.medium,
          imageLarge: document.thumbnail.regular.large,
        })),
        dataTrending: documentsTrending.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.trending.small,
          imageLarge: document.thumbnail.trending.large,
        })),
        dataAll: documents.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.regular.small,
          imageMedium: document.thumbnail.regular.medium,
          imageLarge: document.thumbnail.regular.large,
        })),
        bookmarks: bookmarks,
      },
    };
  } else {
    const client = await MongoClient.connect(
      "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
    );

    const db = client.db();

    const media = db.collection("media");

    const documentsRecommended = await media
      .find({ "thumbnail.trending": { $eq: null } })
      .toArray();
    const documentsTrending = await media
      .find({ "thumbnail.trending": { $ne: null } })
      .toArray();

    const documents = await media.find().toArray();

    client.close();

    return {
      props: {
        dataRecommended: documentsRecommended.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.regular.small,
          imageMedium: document.thumbnail.regular.medium,
          imageLarge: document.thumbnail.regular.large,
        })),
        dataTrending: documentsTrending.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.trending.small,
          imageLarge: document.thumbnail.trending.large,
        })),
        dataAll: documents.map((document) => ({
          id: document._id,
          year: document.year,
          rating: document.rating,
          title: document.title,
          category: document.category,
          imageSmall: document.thumbnail.regular.small,
          imageMedium: document.thumbnail.regular.medium,
          imageLarge: document.thumbnail.regular.large,
        })),
      },
    };
  }
}

export default Home;
