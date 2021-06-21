import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

export interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

export default function Layout({
  title = "Welcome to DevSpace",
  description = "The best info and news in development",
  keywords = "development, coding, programming",
  children,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="desciption" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />
      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
}
