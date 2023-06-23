/** 
 * Runs on build, creates a file with all the markdown files so the Search can index it.
 */

import fs from 'fs';
import { globSync } from 'glob';

const files = globSync("**/*.{md,mdx}");

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
  const cleanedPath = path.replace(/^docs\//, '').replace(/\.mdx?$/, '');

  for (const line of lines) {
    if (line.startsWith('#')) {
      if (currentSection) {
        currentSection.content = currentSection.content.trim();
        sections.push(currentSection);
      }

      const level = line.match(/#+/)?.[0].length || 1;
      const header = line.replace(/#+\s*/, '');
      const id = generateID(header);
      currentSection = { header, id, level, content: '', path: cleanedPath };
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

for(const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const sections = splitMarkdownIntoSections(content, file);

  console.log("Indexed", file, "Successfully")

  for(const section of sections) {
    output.push(section)
  }
}

fs.writeFileSync("build/index.json", JSON.stringify(output, null, 2));