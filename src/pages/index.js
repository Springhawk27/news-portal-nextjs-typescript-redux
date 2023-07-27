import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/api";
import dynamic from "next/dynamic";

const HomePage = ({ allNews }) => {
  // console.log(allNews);

  const { data, isLoading, isError, error } = useGetNewsesQuery(); //-> redux store data
  console.log(data);

  const DynamicBanner = dynamic(() => import("@/components/UI/Banner"), {
    loading: () => <h1>Loading...</h1>,
    ssr: false,
  });
  return (
    <>
      <Head>
        <title>News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Banner /> */}
      <DynamicBanner></DynamicBanner>

      {/* this is from backend server -- json server(package.json)*/}
      {/* <AllNews allNews={allNews}></AllNews> */}

      {/* this is from redux api -- by using redux -- client side rendering */}
      {/* <AllNews allNews={data}></AllNews> */}

      {/* this is next.jsserver -- pages/api/news.js */}
      <AllNews allNews={allNews}></AllNews>
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const data = await res.json();
//   // console.log(data);

//   return {
//     props: {
//       allNews: data,
//     },
//     revalidate: 30, // will rebuild this specific page in every 30 seconds
//   };
// };

// json server --- next.js backend -- server side rendering

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const data = await res.json();
//   // console.log(data);
//   return {
//     props: {
//       allNews: data,
//     },
//   };
// };

// next.js server -- front end -- client --- next.js internal server
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/news");
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      allNews: data.data,
    },
  };
};
