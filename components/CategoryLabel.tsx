import Link from "next/Link";

export type LabelChildren = "JavaScript" | "CSS" | "Python" | "PHP" | "Ruby";

export default function CategoryLabel({
  children,
}: {
  children: LabelChildren;
}) {
  const colorKey = {
    JavaScript: "yellow",
    CSS: "blue",
    Python: "green",
    PHP: "purple",
    Ruby: "red",
  } as const;

  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
