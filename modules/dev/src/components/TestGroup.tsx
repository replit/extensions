import { useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { UnitTest } from "./Test";

export default function TestGroup({
  title,
  tests,
}: {
  title: string;
  tests: Array<{
    state: "passed" | "idle" | "loading" | "failed";
    text: string;
    time: string;
  }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="testGroup">
      <div className="testGroup-header">
        <span className="testGroup-title">
          {title} ({tests.length})
        </span>

        <button className="button">Run Tests</button>
        <button
          className="button dropdown-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {open ? <div className="testGroupTests">
        {tests.map((t, i) => (
          <UnitTest key={i} {...t} />
        ))}
      </div> : null}
    </div>
  );
}
