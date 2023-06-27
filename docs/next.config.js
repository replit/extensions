const nextMdx = require('@next/mdx');

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
 
// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)