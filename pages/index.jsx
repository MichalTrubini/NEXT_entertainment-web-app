import Head from "next/head";
import { MongoClient } from "mongodb";
import VideoItem from "../src/shared/components/videoItem";
import movieIcon from "../public/assets/icon-category-movie.svg";
import seriesIcon from "../public/assets/icon-category-tv.svg";
import Search from '../src/shared/components/search/search'

const Home = ({ dataRecommended, dataTrending }) => {
  return (
    <>
      <Head>
        <title>Entertainment app</title>
        <meta name="description" content="Entertainment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <h2 className="header">Trending</h2>
      <div className="videos-trending">
        {dataTrending.map((item) => (
          <VideoItem
            key={item.id}
            src={item.imageSmall}
            year={item.year}
            rating={item.rating}
            title={item.title}
            category={item.category}
            categoryIcon={item.category === "Movie" ? movieIcon : seriesIcon}
            classNameRow="trendingRow"
            classNameImage='media-container-trending'
            classNameTopRow='toprow-trending'
            classNameBottomRow='bottomrow-trending'
          />
        ))}
      </div>

      <h2 className="header">Recommended for you</h2>
      <div className="videos">
        {dataRecommended.map((item) => (
          <VideoItem
            key={item.id}
            src={item.imageSmall}
            year={item.year}
            rating={item.rating}
            title={item.title}
            category={item.category}
            categoryIcon={item.category === "Movie" ? movieIcon : seriesIcon}
            classNameImage='media-container'
            classNameTopRow='toprow'
            classNameBottomRow='bottomrow'
          />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://frontendMentor:frontendMentor@cluster0.gociwcj.mongodb.net/entertainment?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("media");

  const documentsRecommended = await collection
    .find({ "thumbnail.trending": { $eq: null } })
    .toArray();
  const documentsTrending = await collection
    .find({ "thumbnail.trending": { $ne: null } })
    .toArray();

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
    },
    revalidate: 1,
  };
}

export default Home;
