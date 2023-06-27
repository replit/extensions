import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import * as components from "../components";
import Layout from "../components/Layout";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

interface DocProps {
  source: MDXRemoteSerializeResult;
}

export default function Doc({ source }: DocProps) {
  return (
    <Layout>
      <MDXRemote {...source} components={components} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<DocProps> = async (
  context
) => {
  const doc = context.params?.doc;
  const docPath = Array.isArray(doc) ? doc.join("/") : doc || "";
  const docFullPath = path.join("docs", docPath);

  const mdPath = `${docFullPath}.md`;
  const mdxPath = `${docFullPath}.mdx`;
  const indexMdPath = path.join(docFullPath, "index.md");
  const indexMdxPath = path.join(docFullPath, "index.mdx");

  let finalPath: string;

  if (fs.existsSync(mdPath)) {
    finalPath = mdPath;
  } else if (fs.existsSync(mdxPath)) {
    finalPath = mdxPath;
  } else if (fs.existsSync(indexMdPath)) {
    finalPath = indexMdPath;
  } else if (fs.existsSync(indexMdxPath)) {
    finalPath = indexMdxPath;
  } else {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(fs.readFileSync(finalPath, "utf-8"));

  return {
    props: {
      source: mdxSource,
    },
  };
};
