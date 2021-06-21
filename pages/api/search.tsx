import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  let posts;
  if (process.env.NODE_ENV === "production") {
  } else {
    const files = fs.readdirSync(path.join("posts"), "utf-8");
    console.log(files);
    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(path.join("posts", filename));

      const { data: frontmatter } = matter(markdownWithMeta);
      return { slug, frontmatter };
    });
  }

  const results = posts?.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );
  res.status(200).json(JSON.stringify({ results }));
};
