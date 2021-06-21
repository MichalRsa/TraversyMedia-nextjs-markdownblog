import Link from "next/Link";
import Post, { PostProps } from "../components/Post";
import Layout from "../components/Layout";
import { getPosts } from "@/lib/posts";

interface HomeProps {
  posts: PostProps[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>

      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: {
    posts: HomeProps["posts"];
  };
}> {
  return {
    props: { posts: getPosts().slice(0, 6) },
  };
}
