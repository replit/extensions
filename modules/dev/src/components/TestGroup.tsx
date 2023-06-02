import { useState } from "react";
import { ChevronDown, ChevronRight } from "react-feather";
import { UnitTest } from "./Test";
import { Module } from "../types";
import { useAppState } from "./StateContext";

export default function TestGroup({ module }: { module: Module }) {
  const [open, setOpen] = useState(true);
  const { tests, setTestQueue, setFailedTests, setPassedTests, setTotalTests } =
    useAppState();

  const moduleTests = tests.filter((t) => t.module === module);

  const runModuleTests = () => {
    setFailedTests(0);
    setPassedTests(0);
    setTotalTests(moduleTests.length);
    setTestQueue(
      moduleTests.map((t) => ({
        key: t.key,
        module: t.module,
      }))
    );
  };

  return (
    <div className="testGroup">
      <div className="testGroup-header">
        <span className="testGroup-title">
          {module} ({moduleTests.length})
        </span>

        <button className="button" onClick={runModuleTests}>
          Run Tests
        </button>
        <button
          className="button dropdown-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {open ? (
        <div className="testGroupTests">
          {moduleTests.map((t) => (
            <UnitTest key={t.key} k={t.key} module={t.module} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
