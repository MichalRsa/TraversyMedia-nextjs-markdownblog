import Link from "next/Link";
import Image from "next/Image";
import CategoryLabel from "./CategoryLabel";
import { LabelChildren } from "./CategoryLabel";

export interface PostProps {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
  };
  compact?: boolean;
}

const Post = ({
  post,
  compact = false,
}: {
  post: PostProps;
  compact?: PostProps["compact"];
}) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=""
          height={420}
          width={600}
          className="mb-4 rounded"
        />
      )}

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>
          {post.frontmatter.category as LabelChildren}
        </CategoryLabel>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>
      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-600">Read More</a>
          </Link>
          <div className="flex items-center">
            <img
              src={post.frontmatter.author_image}
              className="mx-4 w-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="text-fray-700 font-bold">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
