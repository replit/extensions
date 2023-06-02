import { useAppState } from "./StateContext";

export default function Header() {
  const {
    setTestQueue,
    tests,
    setFailedTests,
    setPassedTests,
    setTotalTests,
    totalTests,
    passedTests,
    failedTests,
  } = useAppState();

  return (
    <div className="header">
      <h2>Extension Tester</h2>

      <div className="test-stats">
        <span>
          {`Passed: `}
          <span id="passed">{passedTests}</span>
          {`, Failed: `}
          <span id="failed">{failedTests}</span>
          {`, Total: `}
          <span id="total">{totalTests}</span>
        </span>
      </div>

      <button
        className="button"
        onClick={() => {
          setTestQueue(
            tests.map((test) => ({ key: test.key, module: test.module }))
          );
          setFailedTests(0);
          setPassedTests(0);
          setTotalTests(tests.length);
        }}
      >
        Run All Tests
      </button>
    </div>
  );
}
