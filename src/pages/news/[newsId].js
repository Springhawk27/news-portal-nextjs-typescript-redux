import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";
import { useGetNewsQuery } from "@/redux/api/api";
import { useRouter } from "next/router";

const NewsDetailPage = ({ news }) => {
  // news2 data by using redux
  const router = useRouter();
  const { newsId } = router.query;
  const { data: news2, isLoading, error } = useGetNewsQuery(newsId);
  //   console.log(news2);

  return (
    <Row style={{ marginTop: "80px", alignItems: "center" }}>
      <Col md={6} lg={12}>
        <Image
          alt="example"
          src={news2?.image_url}
          width={500}
          height={300}
          responsive
        />
      </Col>
      <Col md={6} lg={12} style={{ paddingLeft: "20px" }}>
        <h1 style={{ fontSize: "30px" }}>{news2?.title}</h1>
        <span
          style={{
            color: "gray",
            display: "block",
            fontSize: "20px",
          }}
        >
          <UserOutlined /> {news2?.author}
        </span>
        <div
          className="line"
          style={{
            height: "5px",
            margin: "20px 0",
            background: "#000",
            width: "100%",
          }}
        ></div>

        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "gray",
            margin: "10px 0px",
            fontSize: "20px",
          }}
        >
          <span>
            <CalendarOutlined /> {news2?.release_date}
          </span>
          <span>
            <CommentOutlined /> {news2?.comment_count} Comments
          </span>
          <span>
            <ProfileOutlined /> {news?.category}
          </span>
        </p>

        <p style={{ fontSize: "25px", fontWeight: "lighter" }}>
          {news2?.description}
        </p>
      </Col>
    </Row>
  );
};
export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// for dynamic page we will use getStaticPaths instead of getStaticProps
// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:5000/news");
//   const newses = await res.json();

//   const paths = newses.map((news) => ({
//     params: { newsId: news.id },
//   }));

//   return { paths, fallback: false };

// };

// https://nextjs.org/docs/pages/api-reference/functions/get-static-paths

// If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

// When next build is run, Next.js will check if getStaticPaths returned fallback: false, it will then build only the paths returned by getStaticPaths. This option is useful if you have a small number of paths to create, or new page data is not added often. If you find that you need to add more paths, and you have fallback: false, you will need to run next build again so that the new paths can be generated.

// If fallback is true, then the behavior of getStaticProps changes in the following ways:

// The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
// The paths that have not been generated at build time will not result in a 404 page.

// If fallback is 'blocking', new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.

// getStaticProps will behave as follows:

// The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
// The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML.
// When complete, the browser receives the HTML for the generated path. From the user’s perspective, it will transition from "the browser is requesting the page" to "the full page is loaded". There is no flash of loading/fallback state.

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();
  // console.log(data);

  return {
    props: {
      news: data,
    },
  };
};
