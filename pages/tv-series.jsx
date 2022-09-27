import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import Layout from "../src/shared/layout/layout";
import { getSession } from "next-auth/react";

const Home = ({ media, bookmarks }) => {
  const [userInput, setUserInput] = useState("");

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const dataSearched = media.filter((item) =>
    item.title.toLowerCase().includes(userInput)
  );

  const TVShows = media.filter((item) =>
  item.category === 'TV Series'
);

  const dataSource = userInput.length === 0 ? TVShows : dataSearched;

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

      <h2 className="header">
        {userInput.length === 0
          ? "TV Series"
          : `Found ${dataSearched.length} ${
              dataSearched.length === 1 ? "result" : "results"
            } for '${userInput}'`}
      </h2>
      <div className="videos">
        {dataSource.map((item) => (
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
            categoryIcon={item.category === "Movie" ? movieIcon : seriesIcon}
            classNameImage="media-container"
            classNameTopRow="toprow"
            classNameBottomRow="bottomrow"
          />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
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
