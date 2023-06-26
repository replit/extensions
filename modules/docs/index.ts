/** 
 * Runs on build, creates a file with all the markdown files so the Search can index it.
 */

import fs from 'fs';
import { globSync } from 'glob';

function getRouterPath(rawPath: string): string {
  const routerPath = rawPath.replace(/^docs/, '').replace(/\.mdx?$/, '');
  if (routerPath.endsWith('/index')) {
    return routerPath.slice(0, -6);
  }
  return routerPath;
}

function getFileExtension(rawPath: string): string {
  return rawPath.split('.').pop() || '';
}

const globFiles = globSync("**/*.{md,mdx}");
const files = globFiles.map((rawPath) => {
  const fileName = getRouterPath(rawPath);
  const extension = getFileExtension(rawPath);
  return [rawPath, fileName, extension];
});

interface Section {
  header: string;
  id: string;
  level: number;
  content: string;
  path: string;
}

function generateID(header: string): string {
  return header
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

function splitMarkdownIntoSections(markdown: string, path: string): Section[] {
  const lines = markdown.split('\n');
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const line of lines) {
    if (line.startsWith('#')) {
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }

      const level = line.match(/#+/)?.[0].length || 1;
      const header = line.replace(/#+\s*/, '');
      const id = generateID(header);
      currentSection = { header, id, level, content: '', path };
    } else if (currentSection) {
      currentSection.content += line + '\n';
    }
  }

  if (currentSection) {
    currentSection.content = currentSection.content.trim();
    sections.push(currentSection);
  }

  return sections;
}

const output: Array<Section> = [];

for (const [rawPath, path, ext] of files) {
  console.log(rawPath, path, ext)
  if (files.filter(x => x[0] !== rawPath).some(f => f[1] === path)) {
    throw new Error("Conflicting path found: " + path);
  }

  const content = fs.readFileSync(rawPath, 'utf8');
  const sections = splitMarkdownIntoSections(content, path);

  for (const section of sections) {
    output.push(section);
  }
}

fs.writeFileSync("build/index.json", JSON.stringify(output, null, 2));
