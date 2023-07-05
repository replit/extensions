const fs = require("fs");
const { globSync } = require("glob");

function getRouterPath(rawPath) {
  const routerPath = rawPath.replace(/^docs/, "").replace(/\.mdx?$/, "");
  if (routerPath.endsWith("/index")) {
    return routerPath.slice(0, -6);
  }
  return routerPath;
}

function getFileExtension(rawPath) {
  return rawPath.split(".").pop() || "";
}

const globFiles = globSync("docs/**/*.{md,mdx}");
const files = globFiles.map((rawPath) => {
  const fileName = getRouterPath(rawPath);
  const extension = getFileExtension(rawPath);
  return [rawPath, fileName, extension];
});

function generateID(header) {
  return header
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function splitMarkdownIntoSections(markdown, path) {
  const lines = markdown.split("\n");
  const sections = [];
  let currentSection = null;

  for (const line of lines) {
    if (line.startsWith("#")) {
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }

      const level = (line.match(/#+/) || [])[0].length || 1;
      const header = line.replace(/#+\s*/, "");
      const id = generateID(header);
      currentSection = { header, id, level, content: "", path };
    } else if (currentSection) {
      currentSection.content += line + "\n";
    }
  }

  if (currentSection) {
    currentSection.content = currentSection.content.trim();
    sections.push(currentSection);
  }

  return sections;
}

const output = [];

for (const [rawPath, path, ext] of files) {
  console.log(rawPath);
  if (files.filter((x) => x[0] !== rawPath).some((f) => f[1] === path)) {
    throw new Error("Conflicting path found: " + path);
  }

  const content = fs.readFileSync(rawPath, "utf8");
  const sections = splitMarkdownIntoSections(content, path);

  for (const section of sections) {
    output.push(section);
  }
}

if (fs.existsSync("build/index.json")) {
  fs.writeFileSync("build/index.json", JSON.stringify(output, null, 2));
} else {
  fs.mkdirSync("build");
  fs.writeFileSync("build/index.json", JSON.stringify(output, null, 2));
}
