import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "../utils";
import { PostProps } from "@/components/Post";

const files = fs.readdirSync(path.join("posts"));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data }: { data: any } = matter(markdownWithMeta);

    const frontmatter: PostProps["frontmatter"] = data;

    return { slug, frontmatter };
  });

  return posts.sort(sortByDate);
}
