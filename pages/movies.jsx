import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import Layout from '../src/shared/layout/layout'

const Home = ({ dataMovies }) => {
  const [userInput, setUserInput] = useState("");

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const dataSearched = dataMovies.filter((item) => item.title.toLowerCase().includes(userInput));

  return (
    <Layout>
      <Head>
        <title>Entertainment - Movies</title>
        <meta name="description" content="Entertainment - Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search onSubmitUserData={submitUserDataHandler} prompt="Search for movies"/>

      {userInput.length === 0 && (
        <>
          <h2 className="header">Movies</h2>
          <div className="videos">
            {dataMovies.map((item) => (
              <VideoItem
                key={item.id}
                dataid={item.id}
                src={item.imageSmall}
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

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("media");

  const documents = await collection
    .find({ "category": { $eq: "Movie" } })
    .toArray();

  client.close();

  return {
    props: {
      dataMovies: documents.map((document) => ({
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
    revalidate: 1,
  };
}

export default Home;
