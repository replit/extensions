import { Check, X, Loader, Circle } from "react-feather";

export const UnitTest = ({
  state,
  text,
  time,
}: {
  state: "idle" | "loading" | "passed" | "failed";
  text: string;
  time: string;
}) => {
  return (
    <div className="test">
      <div className={"test-icon " + state}>
        {state === "idle" ? <Circle size={16} /> : null}
        {state === "loading" ? <Loader size={16} /> : null}
        {state === "passed" ? <Check size={16} /> : null}
        {state === "failed" ? <X size={16} /> : null}
      </div>

      <span className="test-text">{text}</span>

      <span className="test-time">{time}</span>
    </div>
  );
};
