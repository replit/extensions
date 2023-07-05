import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

function getHighlightedMatch(text: string, query: string, maxLength = 20) {
  const index = text.toLowerCase().indexOf(query);
  const start = Math.max(0, index - Math.floor((maxLength - query.length) / 2));
  const end = Math.min(text.length, start + maxLength);

  return (
    (start > 0 ? "..." : "") +
    text.slice(start, index) +
    "**" +
    text.slice(index, index + query.length) +
    "**" +
    text.slice(index + query.length, end) +
    (end < text.length ? "..." : "")
  );
}

interface Section {
  header: string;
  id: string;
  level: number;
  content: string;
  path: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q ? String(req.query.q).toLowerCase() : "";
  const indexPath = path.join("build", "index.json");
  const sections = JSON.parse(fs.readFileSync(indexPath, "utf-8"));

  let matchedSections: (Section & {
    match: "header" | "content";
    query: string;
    score: number;
  })[] = [];
  let closestSection:
    | (Section & {
        match: "header" | "content";
        query: string;
      })
    | null = null;
  let closestSectionScore: number | null = null;

  sections.forEach((section: Section) => {
    const headerIndex = section.header.toLowerCase().indexOf(query);
    const contentIndex = section.content.toLowerCase().indexOf(query);

    if (headerIndex > -1 || contentIndex > -1) {
      let score = 0;
      let match = "";
      let highlightedQuery = "";

      if (headerIndex > -1) {
        score += 1000; // prioritize header matches
        match = "header";
        highlightedQuery = getHighlightedMatch(section.header, query, 20);
      } else {
        match = "content";
        highlightedQuery = getHighlightedMatch(section.content, query, 20);
      }

      matchedSections.push({
        ...section,
        match: match as "header" | "content",
        query: highlightedQuery,
        score: score,
      });

      if (closestSection === null || score > (closestSectionScore || 0)) {
        closestSection = {
          ...section,
          match: match as "header" | "content",
          query: highlightedQuery,
        };
        closestSectionScore = score;
      }
    }
  });

  if (matchedSections.length > 0) {
    res.json(matchedSections.sort((a, b) => b.score - a.score).slice(0, 5));
  } else {
    res.json([]);
  }
}
