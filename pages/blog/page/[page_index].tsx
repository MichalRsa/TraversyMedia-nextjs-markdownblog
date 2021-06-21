import fs from "fs";
import path from "path";
import { POST_PER_PAGE } from "../../../config";
import Pagination, { PaginationProps } from "../../../components/Pagination";
import Post, { PostProps } from "../../../components/Post";
import Layout from "../../../components/Layout";
import CategoryList, { ICategoryList } from "../../../components/CategoryList";
import { getPosts } from "@/lib/posts";

interface BlogListProps extends PaginationProps, ICategoryList {
  posts: {
    slug: PostProps["slug"];
    frontmatter: PostProps["frontmatter"];
  }[];
}

export default function BlogPage({
  posts,
  numPages,
  currentPage,
  categories,
}: BlogListProps) {
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

interface IParams {
  page_index: string;
}

interface getStaticPathsOutput {
  paths: {
    params: IParams;
  }[];
  fallback: boolean;
}

export async function getStaticPaths(): Promise<getStaticPathsOutput> {
  const files = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: IParams }): Promise<{
  props: BlogListProps;
}> {
  console.log(params);
  const page = parseInt((params && params.page_index) || "1");
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];
  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
