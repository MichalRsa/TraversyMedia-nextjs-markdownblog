import { PostProps } from "../components/Post";

export const sortByDate = (a: PostProps, b: PostProps) => {
  return (
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
  );
};
