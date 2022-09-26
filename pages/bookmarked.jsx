import Layout from "../src/shared/layout/layout";
import Head from "next/head";
import Search from "../src/shared/components/search/search";
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";

const Bookmarked = ({ media, bookmarks }) => {
  const [userInput, setUserInput] = useState("");
  const { data: session } = useSession();

  const submitUserDataHandler = (userData) => {
    if (userData === "") return setUserInput("");

    setUserInput(userData.toLowerCase());
  };

  const TVShows = media.filter((item) => item.category === "TV Series");

  const Movies = media.filter((item) => item.category === "Movie");

  const TVShowsSearched = TVShows.filter((item) =>
    item.title.toLowerCase().includes(userInput)
  );
  const MoviesSearched = Movies.filter((item) =>
    item.title.toLowerCase().includes(userInput)
  );

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
        <>
          {TVShows.length === 0 && Movies.length === 0 && (
            <div>
              <p className="bookmarkWarning">There are no bookmarked shows!</p>
            </div>
          )}

          {Movies.length > 0 && userInput.length === 0 && (
            <>
              <h2 className="header">Bookmarked Movies</h2>
              <div className="videos">
                {Movies.map((item) => (
                  <VideoItem
                    bookmarks={bookmarks}
                    key={item._id}
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

          {MoviesSearched.length > 0 && userInput.length !== 0 && (
            <>
              <h2 className="header">Bookmarked Movies</h2>
              <div className="videos">
                {MoviesSearched.map((item) => (
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

          {TVShows.length > 0 && userInput.length === 0 && (
            <>
              <h2 className="header header-fix">Bookmarked TV Series</h2>
              <div className="videos">
                {TVShows.map((item) => (
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

          {TVShowsSearched.length > 0 && userInput.length !== 0 && (
            <>
              <h2 className="header header-fix">Bookmarked TV Series</h2>
              <div className="videos">
                {TVShowsSearched.map((item) => (
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
        </>
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

    const documents = await media
      .find({ _id: { $in: bookmarks } })
      .toArray();

    client.close();

    return {
      props: {
        media: documents,
        bookmarks: bookmarks,
      },
    };
  } else
    return {
      redirect: {
        destination: "/no-bookmarks",
        statusCode: 307,
      },
    };
}

export default Bookmarked;
