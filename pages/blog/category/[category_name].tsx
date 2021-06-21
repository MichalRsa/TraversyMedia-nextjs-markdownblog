import fs from "fs";
import path from "path";
import Post, { PostProps } from "@/components/Post";
import Layout from "@/components/Layout";
import CategoryList, { ICategoryList } from "@/components/CategoryList";
import { getPosts } from "@/lib/posts";
import matter from "gray-matter";
import { PaginationProps } from "@/components/Pagination";

interface HomeProps extends PaginationProps, ICategoryList {
  posts: PostProps[];
  categoryName: string;
}

export default function CategoryBlogPage({
  posts,
  categoryName,
  categories,
}: HomeProps) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

interface CategoryNameParams {
  params: {
    category_name: string;
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  console.log(files);
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });
  console.log(categories);
  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { category_name },
}: CategoryNameParams): Promise<{
  props: {
    posts: HomeProps["posts"];
    categoryName: String;
  };
}> {
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts();
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );
  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
}
