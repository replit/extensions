import { useEffect, useState } from "react";
import { Check, X, Loader, Circle } from "react-feather";
import { Module, Test } from "../types";
import { useAppState } from "./StateContext";
import UnitTests from "../tests";

export const UnitTest = ({
  k: key,
  module,
}: {
  k: keyof (typeof UnitTests)[Module];
  module: Module;
}) => {
  const { tests, testQueue, setTestQueue, logs, setLogs } = useAppState();
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState<
    "passed" | "failed" | "loading" | "idle"
  >("idle");

  const test = tests.find((t) => t.key === key && t.module === module);

  const finishTest = (t: number) => {
    setTestQueue((q) =>
      q.filter((t) => !(t.key === key && t.module === module))
    );
    setTime(Date.now() - t);
  };

  const addLog = (log: string) => {
    setLogs((l) => [...l, log]);
  };

  useEffect(() => {
    if (
      test &&
      testQueue[0]?.key === test.key &&
      testQueue[0]?.module === test.module
    ) {
      setStatus("loading");
      let t = Date.now();

      const testFn = UnitTests[module].tests[key];
      if (testFn) {
        try {
          Promise.race([
            testFn(addLog),
            new Promise((_resolve, reject) =>
              setTimeout(() => reject(new Error("Test timed out")), 10000)
            ),
          ])
            .then(() => {
              addLog(`${key}: ✅`);
              setStatus("passed");
              finishTest(t);
            })
            .catch((err) => {
              addLog(`${key}: ❌ ${err.message}`);
              setStatus("failed");
              finishTest(t);
            });
        } catch (err) {
          addLog(`${key}: ❌ ${String(err)}`);
          setStatus("failed");
          finishTest(t);
        }
      } else {
        addLog(`${key}: ❌ No test function found`);
        setStatus("failed");
        finishTest(t);
      }
    } else if (testQueue.some((t) => t.key === key && t.module === module)) {
      setStatus("idle");
    }
  }, [test, testQueue]);

  return test ? (
    <div className="test">
      <div className={"test-icon " + status}>
        {status === "idle" ? <Circle size={16} /> : null}
        {status === "loading" ? <Loader size={16} /> : null}
        {status === "passed" ? <Check size={16} /> : null}
        {status === "failed" ? <X size={16} /> : null}
      </div>

      <span className="test-text">{key}</span>

      <span className="test-time">{time ? `${time}ms` : "--"}</span>
    </div>
  ) : null;
};
