import { useAppState } from "./StateContext";

export default function Header() {
  const { setTestQueue, tests } = useAppState();

  return (
    <div className="header">
      <h2>Extension Tester</h2>

      <button
        className="button"
        onClick={() =>
          setTestQueue(
            tests.map((test) => ({ key: test.key, module: test.module }))
          )
        }
      >
        Run All Tests
      </button>
    </div>
  );
}
